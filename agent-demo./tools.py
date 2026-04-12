"""
tools.py — Outils disponibles pour l'agent
Chaque outil est une fonction Python + sa description pour le LLM.
"""

import math
import json
from datetime import datetime

# ═══════════════════════════════════════
#  Registre d'outils
# ═══════════════════════════════════════

TOOL_DEFINITIONS = [
    {
        "name": "calculatrice",
        "description": "Effectue un calcul mathématique. Supporte : +, -, *, /, **, sqrt, sin, cos, tan, log, pi. Exemples : '2 + 2', 'sqrt(144)', '3.14 * 5**2'",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "L'expression mathématique à évaluer"
                }
            },
            "required": ["expression"]
        }
    },
    {
        "name": "memoire_sauvegarder",
        "description": "Sauvegarde une information importante dans la mémoire long terme. Utilise cet outil quand l'utilisateur te donne une info personnelle ou un fait à retenir.",
        "input_schema": {
            "type": "object",
            "properties": {
                "cle": {
                    "type": "string",
                    "description": "Un identifiant court pour cette info (ex: 'nom', 'ville', 'projet')"
                },
                "valeur": {
                    "type": "string",
                    "description": "L'information à mémoriser"
                }
            },
            "required": ["cle", "valeur"]
        }
    },
    {
        "name": "memoire_chercher",
        "description": "Cherche une information dans la mémoire long terme. Utilise cet outil pour retrouver un fait précédemment mémorisé.",
        "input_schema": {
            "type": "object",
            "properties": {
                "cle": {
                    "type": "string",
                    "description": "L'identifiant de l'info à retrouver (ex: 'nom', 'ville')"
                }
            },
            "required": ["cle"]
        }
    },
    {
        "name": "memoire_tout_lister",
        "description": "Liste toutes les informations stockées en mémoire long terme.",
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
    {
        "name": "planificateur",
        "description": "Décompose un objectif complexe en un plan structuré avec des étapes numérotées. Utilise cet outil quand l'utilisateur a un objectif ambitieux à organiser.",
        "input_schema": {
            "type": "object",
            "properties": {
                "objectif": {
                    "type": "string",
                    "description": "L'objectif à décomposer en étapes"
                },
                "contraintes": {
                    "type": "string",
                    "description": "Contraintes éventuelles (budget, temps, compétences…)"
                }
            },
            "required": ["objectif"]
        }
    },
    {
        "name": "horloge",
        "description": "Donne la date et l'heure actuelles.",
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
    {
        "name": "analyseur_texte",
        "description": "Analyse un texte et retourne des statistiques : nombre de mots, de phrases, de caractères, et les mots les plus fréquents.",
        "input_schema": {
            "type": "object",
            "properties": {
                "texte": {
                    "type": "string",
                    "description": "Le texte à analyser"
                }
            },
            "required": ["texte"]
        }
    }
]


# ═══════════════════════════════════════
#  Exécution des outils
# ═══════════════════════════════════════

# Mémoire persistante (dans la session Streamlit)
_memory_store = {}


def init_memory(store: dict):
    """Connecte le store de mémoire (depuis st.session_state)."""
    global _memory_store
    _memory_store = store


def execute_tool(name: str, inputs: dict) -> str:
    """Exécute un outil et retourne le résultat sous forme de texte."""

    if name == "calculatrice":
        return _calculatrice(inputs.get("expression", ""))

    elif name == "memoire_sauvegarder":
        return _memoire_sauvegarder(inputs.get("cle", ""), inputs.get("valeur", ""))

    elif name == "memoire_chercher":
        return _memoire_chercher(inputs.get("cle", ""))

    elif name == "memoire_tout_lister":
        return _memoire_tout_lister()

    elif name == "planificateur":
        return _planificateur(inputs.get("objectif", ""), inputs.get("contraintes", ""))

    elif name == "horloge":
        return _horloge()

    elif name == "analyseur_texte":
        return _analyseur_texte(inputs.get("texte", ""))

    else:
        return f"❌ Outil inconnu : {name}"


# ═══════════════════════════════════════
#  Implémentation de chaque outil
# ═══════════════════════════════════════

def _calculatrice(expression: str) -> str:
    """Évalue une expression mathématique de façon sécurisée."""
    try:
        allowed = {
            "sqrt": math.sqrt,
            "sin": math.sin,
            "cos": math.cos,
            "tan": math.tan,
            "log": math.log,
            "log10": math.log10,
            "abs": abs,
            "round": round,
            "pi": math.pi,
            "e": math.e,
        }
        result = eval(expression, {"__builtins__": {}}, allowed)
        return f"✅ {expression} = {result}"
    except Exception as e:
        return f"❌ Erreur de calcul : {e}"


def _memoire_sauvegarder(cle: str, valeur: str) -> str:
    _memory_store[cle] = valeur
    return f"✅ Mémorisé : {cle} → {valeur}"


def _memoire_chercher(cle: str) -> str:
    if cle in _memory_store:
        return f"✅ {cle} → {_memory_store[cle]}"
    # Recherche partielle
    matches = {k: v for k, v in _memory_store.items() if cle.lower() in k.lower()}
    if matches:
        results = ", ".join(f"{k} → {v}" for k, v in matches.items())
        return f"✅ Résultats proches : {results}"
    return f"❌ Rien trouvé pour '{cle}'. Mémoire actuelle : {list(_memory_store.keys()) or 'vide'}"


def _memoire_tout_lister() -> str:
    if not _memory_store:
        return "📭 La mémoire est vide."
    items = "\n".join(f"  • {k} → {v}" for k, v in _memory_store.items())
    return f"📋 Mémoire ({len(_memory_store)} entrées) :\n{items}"


def _planificateur(objectif: str, contraintes: str = "") -> str:
    ctx = f" (contraintes : {contraintes})" if contraintes else ""
    return f"🎯 Plan demandé pour : {objectif}{ctx}\n→ Le LLM va maintenant décomposer cet objectif en étapes."


def _horloge() -> str:
    now = datetime.now()
    return f"🕐 {now.strftime('%A %d %B %Y — %H:%M:%S')}"


def _analyseur_texte(texte: str) -> str:
    if not texte.strip():
        return "❌ Texte vide."
    mots = texte.split()
    phrases = [s.strip() for s in texte.replace("!", ".").replace("?", ".").split(".") if s.strip()]
    freq = {}
    for m in mots:
        w = m.lower().strip(".,!?;:\"'()[]")
        if len(w) > 3:
            freq[w] = freq.get(w, 0) + 1
    top = sorted(freq.items(), key=lambda x: -x[1])[:5]
    top_str = ", ".join(f"{w} ({c}×)" for w, c in top) if top else "—"
    return (
        f"📊 Analyse du texte :\n"
        f"  • Caractères : {len(texte)}\n"
        f"  • Mots : {len(mots)}\n"
        f"  • Phrases : {len(phrases)}\n"
        f"  • Mots fréquents : {top_str}"
    )
