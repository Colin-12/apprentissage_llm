// Module 3 — Le Pretraining
window.MODULES = window.MODULES || [];
window.MODULES.push({
  id: 'pretraining',
  number: 'Module 3',
  title: "Le Pretraining",
  status: 'completed',
  questions: [
    {
      q: "Qu'est-ce que le pretraining ?",
      a: `<p>Entraîner un réseau de neurones de type <span class="tag">Transformer</span> sur un corpus gigantesque de texte brut.</p>
          <p>L'objectif : <strong>prédire le prochain token</strong>. Le modèle estime une distribution de probabilité sur tout le vocabulaire — le token réel doit avoir la probabilité la plus haute.</p>`
    },
    {
      q: "Pourquoi la prédiction du prochain token ? Quelles limites ?",
      a: `<p><strong>Avantage :</strong> aucune annotation humaine nécessaire. Tout texte est automatiquement un exercice — le contexte est la question, le mot suivant la réponse.</p>
          <p><strong>Limites :</strong> le modèle sait <em>compléter</em> du texte, rien de plus. Il pourrait répondre faux — il ne comprend même pas qu'on lui pose une question.</p>`
    }
  ]
});
