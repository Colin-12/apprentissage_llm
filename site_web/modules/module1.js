// Module 1 — Qu'est-ce qu'un LLM ?
window.MODULES = window.MODULES || [];
window.MODULES.push({
  id: 'intro',
  number: 'Module 1',
  title: "Qu'est-ce qu'un LLM ?",
  status: 'completed',
  questions: [
    {
      q: "Qu'est-ce qu'un LLM et qu'est-ce qui le distingue des autres modèles d'IA ?",
      a: `<p>Un <strong>LLM (Large Language Model)</strong> est un modèle d'IA qui traite du langage naturel — compréhension et génération.</p>
          <p>Ce qui le distingue : il comprend le <strong>contexte</strong> grâce au <span class="tag">mécanisme d'attention</span>. Son corpus d'entraînement le rend versatile et il demande des <strong>milliards de paramètres</strong>.</p>`
    },
    {
      q: "Quelle est la définition précise d'un LLM ?",
      a: `<p>Un réseau de neurones entraîné sur des quantités massives de texte. C'est une <strong>fonction mathématique</strong> qui, étant donné une séquence de tokens, <strong>prédit ce qui vient ensuite</strong>.</p>
          <p>Pour bien prédire, il apprend implicitement la grammaire, les faits, le raisonnement et la cohérence narrative.</p>`
    }
  ]
});
