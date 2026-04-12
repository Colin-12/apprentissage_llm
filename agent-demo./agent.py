"""
agent.py — Boucle d'agent ReAct (Reasoning + Acting)
Utilise l'API Anthropic avec tool use.
"""

import anthropic
from tools import TOOL_DEFINITIONS, execute_tool, init_memory


SYSTEM_PROMPT = """Tu es un agent assistant intelligent. Tu as accès à plusieurs outils que tu peux utiliser pour aider l'utilisateur.

Comportement attendu :
- Si l'utilisateur te donne une information personnelle (nom, ville, préférences…), sauvegarde-la en mémoire avec l'outil memoire_sauvegarder.
- Si l'utilisateur te pose une question sur quelque chose qu'il t'a dit avant, cherche dans la mémoire avec memoire_chercher.
- Si l'utilisateur te demande un calcul, utilise la calculatrice.
- Si l'utilisateur a un objectif complexe, utilise le planificateur puis détaille le plan.
- Tu peux enchaîner plusieurs outils si nécessaire (boucle d'agent).

Réponds toujours en français. Sois concis et utile."""


def run_agent(user_message: str, conversation_history: list, memory_store: dict, api_key: str, max_loops: int = 6):
    """
    Exécute la boucle d'agent ReAct.

    Yields des événements (dict) pour l'interface :
      {"type": "thinking", "text": "..."}
      {"type": "tool_call", "name": "...", "inputs": {...}}
      {"type": "tool_result", "name": "...", "result": "..."}
      {"type": "answer", "text": "..."}
      {"type": "error", "text": "..."}
    """

    # Connecter la mémoire
    init_memory(memory_store)

    client = anthropic.Anthropic(api_key=api_key)

    # Ajouter le message utilisateur à l'historique
    messages = conversation_history + [{"role": "user", "content": user_message}]

    loop_count = 0

    while loop_count < max_loops:
        loop_count += 1

        yield {"type": "thinking", "text": f"Réflexion (tour {loop_count})…"}

        try:
            response = client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=2048,
                system=SYSTEM_PROMPT,
                tools=TOOL_DEFINITIONS,
                messages=messages,
            )
        except anthropic.AuthenticationError:
            yield {"type": "error", "text": "❌ Clé API invalide. Vérifie ta clé Anthropic."}
            return
        except Exception as e:
            yield {"type": "error", "text": f"❌ Erreur API : {e}"}
            return

        # Traiter la réponse
        assistant_content = response.content
        stop_reason = response.stop_reason

        # Si le modèle veut utiliser des outils
        if stop_reason == "tool_use":
            # Collecter les blocs texte et tool_use
            tool_results = []

            for block in assistant_content:
                if block.type == "text" and block.text.strip():
                    yield {"type": "thinking", "text": block.text}

                elif block.type == "tool_use":
                    tool_name = block.name
                    tool_inputs = block.input
                    tool_id = block.id

                    yield {"type": "tool_call", "name": tool_name, "inputs": tool_inputs}

                    # Exécuter l'outil
                    result = execute_tool(tool_name, tool_inputs)

                    yield {"type": "tool_result", "name": tool_name, "result": result}

                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": tool_id,
                        "content": result,
                    })

            # Ajouter la réponse de l'assistant + les résultats des outils
            messages.append({"role": "assistant", "content": assistant_content})
            messages.append({"role": "user", "content": tool_results})

            # Continuer la boucle → le LLM va revoir les résultats

        else:
            # stop_reason == "end_turn" → réponse finale
            final_text = ""
            for block in assistant_content:
                if hasattr(block, "text"):
                    final_text += block.text

            yield {"type": "answer", "text": final_text}

            # Mettre à jour l'historique pour la conversation
            messages_to_keep = [
                {"role": "user", "content": user_message},
                {"role": "assistant", "content": final_text},
            ]

            return messages_to_keep

    yield {"type": "error", "text": "⚠️ L'agent a atteint la limite de boucles."}
