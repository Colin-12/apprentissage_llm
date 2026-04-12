"""
🤖 Agent LLM — Démonstration interactive
Streamlit app qui démontre : tools, mémoire, boucle d'agent, planification.
"""

import streamlit as st
from agent import run_agent

# ═══════════════════════════════════════
#  Page config
# ═══════════════════════════════════════

st.set_page_config(
    page_title="Agent LLM — Démo",
    page_icon="🤖",
    layout="centered",
)

# ═══════════════════════════════════════
#  Custom CSS
# ═══════════════════════════════════════

st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

.block-container { max-width: 720px !important; }

.tool-call {
    background: #1e293b;
    border-left: 3px solid #f59e0b;
    border-radius: 8px;
    padding: 12px 16px;
    margin: 8px 0;
    font-size: 0.85rem;
    color: #e2e8f0;
}
.tool-call .label {
    color: #f59e0b;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
}

.tool-result {
    background: #0f2a1d;
    border-left: 3px solid #22c55e;
    border-radius: 8px;
    padding: 12px 16px;
    margin: 8px 0;
    font-size: 0.85rem;
    color: #d1fae5;
}
.tool-result .label {
    color: #22c55e;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
}

.thinking {
    background: #1e1b2e;
    border-left: 3px solid #8b5cf6;
    border-radius: 8px;
    padding: 12px 16px;
    margin: 8px 0;
    font-size: 0.85rem;
    color: #c4b5fd;
    font-style: italic;
}
.thinking .label {
    color: #8b5cf6;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
}

.memory-box {
    background: #1a1a2e;
    border: 1px solid #2d2d44;
    border-radius: 10px;
    padding: 16px;
    margin-top: 8px;
}
.memory-item {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid #2d2d44;
    font-size: 0.85rem;
}
.memory-item:last-child { border-bottom: none; }

.badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 100px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}
.badge-green { background: #052e16; color: #4ade80; }
.badge-yellow { background: #2d1f00; color: #fbbf24; }
.badge-purple { background: #1e1b2e; color: #a78bfa; }
.badge-blue { background: #0c1929; color: #60a5fa; }
</style>
""", unsafe_allow_html=True)

# ═══════════════════════════════════════
#  Session state init
# ═══════════════════════════════════════

if "messages" not in st.session_state:
    st.session_state.messages = []

if "conversation_history" not in st.session_state:
    st.session_state.conversation_history = []

if "memory_store" not in st.session_state:
    st.session_state.memory_store = {}

if "agent_traces" not in st.session_state:
    st.session_state.agent_traces = {}

# ═══════════════════════════════════════
#  Sidebar
# ═══════════════════════════════════════

with st.sidebar:
    st.markdown("## 🤖 Agent LLM")
    st.markdown("Démonstration interactive")
    st.divider()

    api_key = st.text_input(
        "Clé API Anthropic",
        type="password",
        placeholder="sk-ant-...",
        help="Ta clé reste dans ton navigateur, elle n'est pas stockée."
    )

    st.divider()

    st.markdown("### 🧪 Essaie ces prompts")

    examples = {
        "🔧 Outils": "Combien font 1547 * 38 + sqrt(144) ?",
        "🧠 Mémoire": "Je m'appelle Thomas, je vis à Brest et j'apprends le machine learning.",
        "🔄 Boucle": "Analyse ce texte et calcule le ratio mots/phrases : 'L'intelligence artificielle transforme notre monde. Les modèles de langage sont au cœur de cette révolution. Ils apprennent à partir de données textuelles massives.'",
        "📋 Planification": "Je veux créer une startup d'IA en 6 mois avec un budget de 5000€. Fais-moi un plan.",
        "🧠 Rappel": "Comment je m'appelle et où est-ce que j'habite ?",
    }

    for label, prompt in examples.items():
        if st.button(label, use_container_width=True):
            st.session_state.pending_prompt = prompt

    st.divider()

    # Mémoire sidebar
    st.markdown("### 💾 Mémoire de l'agent")
    if st.session_state.memory_store:
        for k, v in st.session_state.memory_store.items():
            st.markdown(f"**{k}** → {v}")
    else:
        st.caption("Vide — dis quelque chose à l'agent pour qu'il mémorise.")

    st.divider()
    if st.button("🗑️ Réinitialiser tout", use_container_width=True):
        st.session_state.messages = []
        st.session_state.conversation_history = []
        st.session_state.memory_store = {}
        st.session_state.agent_traces = {}
        st.rerun()

# ═══════════════════════════════════════
#  Header
# ═══════════════════════════════════════

st.markdown("""
# 🤖 Agent LLM — Démo

Cet agent utilise **Claude** comme cerveau et possède des **outils** qu'il peut appeler de façon autonome.
Chaque étape de sa réflexion est visible ci-dessous.

<span class="badge badge-green">Outils</span>
<span class="badge badge-yellow">Mémoire</span>
<span class="badge badge-purple">Boucle ReAct</span>
<span class="badge badge-blue">Planification</span>
""", unsafe_allow_html=True)

st.divider()

# ═══════════════════════════════════════
#  Chat display
# ═══════════════════════════════════════

for i, msg in enumerate(st.session_state.messages):
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

        # Afficher les traces de l'agent pour ce message
        if msg["role"] == "assistant" and i in st.session_state.agent_traces:
            with st.expander("🔍 Voir le raisonnement de l'agent", expanded=False):
                for trace in st.session_state.agent_traces[i]:
                    if trace["type"] == "thinking":
                        st.markdown(f"""<div class="thinking"><div class="label">💭 Réflexion</div>{trace['text']}</div>""", unsafe_allow_html=True)
                    elif trace["type"] == "tool_call":
                        inputs_str = ", ".join(f"{k}={v}" for k, v in trace["inputs"].items())
                        st.markdown(f"""<div class="tool-call"><div class="label">🔧 Appel d'outil → {trace['name']}</div>{inputs_str}</div>""", unsafe_allow_html=True)
                    elif trace["type"] == "tool_result":
                        st.markdown(f"""<div class="tool-result"><div class="label">✅ Résultat ← {trace['name']}</div>{trace['result']}</div>""", unsafe_allow_html=True)

# ═══════════════════════════════════════
#  Chat input
# ═══════════════════════════════════════

# Handle pending prompt from sidebar buttons
prompt = None
if "pending_prompt" in st.session_state:
    prompt = st.session_state.pending_prompt
    del st.session_state.pending_prompt

chat_input = st.chat_input("Pose une question à l'agent…")
if chat_input:
    prompt = chat_input

if prompt:
    if not api_key:
        st.error("⚠️ Entre ta clé API Anthropic dans la barre latérale.")
        st.stop()

    # Afficher le message utilisateur
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Exécuter l'agent
    with st.chat_message("assistant"):
        traces = []
        trace_container = st.container()
        answer_placeholder = st.empty()

        answer_text = ""
        error_text = ""

        with st.spinner("L'agent réfléchit…"):
            for event in run_agent(
                user_message=prompt,
                conversation_history=st.session_state.conversation_history,
                memory_store=st.session_state.memory_store,
                api_key=api_key,
            ):
                if event["type"] == "thinking":
                    traces.append(event)
                    with trace_container:
                        st.markdown(f"""<div class="thinking"><div class="label">💭 Réflexion</div>{event['text']}</div>""", unsafe_allow_html=True)

                elif event["type"] == "tool_call":
                    traces.append(event)
                    inputs_str = ", ".join(f"{k}={v}" for k, v in event["inputs"].items())
                    with trace_container:
                        st.markdown(f"""<div class="tool-call"><div class="label">🔧 Appel → {event['name']}</div>{inputs_str}</div>""", unsafe_allow_html=True)

                elif event["type"] == "tool_result":
                    traces.append(event)
                    with trace_container:
                        st.markdown(f"""<div class="tool-result"><div class="label">✅ Résultat ← {event['name']}</div>{event['result']}</div>""", unsafe_allow_html=True)

                elif event["type"] == "answer":
                    answer_text = event["text"]
                    answer_placeholder.markdown(answer_text)

                elif event["type"] == "error":
                    error_text = event["text"]
                    answer_placeholder.error(error_text)

        if answer_text:
            msg_index = len(st.session_state.messages)
            st.session_state.messages.append({"role": "assistant", "content": answer_text})
            st.session_state.agent_traces[msg_index] = traces
            st.session_state.conversation_history.append({"role": "user", "content": prompt})
            st.session_state.conversation_history.append({"role": "assistant", "content": answer_text})
            # Garder l'historique raisonnable (derniers 20 messages)
            if len(st.session_state.conversation_history) > 20:
                st.session_state.conversation_history = st.session_state.conversation_history[-20:]

        elif error_text:
            st.session_state.messages.append({"role": "assistant", "content": error_text})
