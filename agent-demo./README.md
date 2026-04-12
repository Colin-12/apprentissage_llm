# 🤖 Agent LLM — Démonstration interactive

Un agent LLM complet déployé sur Streamlit qui démontre 4 compétences clés.

## Ce que l'agent sait faire

| Compétence | Démo |
|---|---|
| **🔧 Outils** | Calculatrice, analyseur de texte, horloge |
| **🧠 Mémoire** | Sauvegarde et rappel d'informations entre les échanges |
| **🔄 Boucle ReAct** | Réfléchir → Agir → Observer → Reboucler |
| **📋 Planification** | Décomposer un objectif en étapes structurées |

## Lancer en local

```bash
pip install -r requirements.txt
streamlit run app.py
```

Tu auras besoin d'une **clé API Anthropic** (entrée dans la sidebar).

## Déployer sur Streamlit Cloud

1. Push ce repo sur GitHub
2. Va sur [share.streamlit.io](https://share.streamlit.io)
3. Connecte ton repo → fichier `app.py`
4. Déploie — c'est tout

Les utilisateurs entreront leur propre clé API dans la sidebar.

## Structure

```
├── app.py              ← Interface Streamlit
├── agent.py            ← Boucle d'agent ReAct
├── tools.py            ← Outils (calculatrice, mémoire, etc.)
├── requirements.txt
├── .streamlit/
│   └── config.toml     ← Thème sombre
└── README.md
```

## Prompts de test

- **Outils** : "Combien font 1547 * 38 + sqrt(144) ?"
- **Mémoire** : "Je m'appelle Thomas, je vis à Brest"
- **Rappel** : "Comment je m'appelle ?"
- **Boucle** : "Analyse ce texte et calcule le ratio mots/phrases : '...'"
- **Planification** : "Je veux créer une startup IA en 6 mois"
