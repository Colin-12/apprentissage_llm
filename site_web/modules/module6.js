// Module 6 — Qu'est-ce qu'un Agent LLM ?
window.MODULES = window.MODULES || [];
window.MODULES.push({
  id: 'agents-intro',
  number: 'Module 6',
  title: "Qu'est-ce qu'un Agent LLM ?",
  status: 'completed',
  questions: [
    {
      q: "C'est quoi un agent ? Pourquoi un LLM brut n'est pas un agent ?",
      a: `<p>Un <strong>agent</strong> est un système autonome capable de <strong>percevoir</strong> son environnement, <strong>décider</strong> d'actions à effectuer, et <strong>agir</strong> pour atteindre un objectif — le tout en boucle.</p>
          <p>Un LLM brut n'est <strong>pas</strong> un agent car :</p>
          <table class="compare-table">
            <tr><th>Agent</th><th>LLM brut</th></tr>
            <tr><td>Perçoit son environnement (fichiers, APIs, web…)</td><td>Ne voit que le texte qu'on lui envoie</td></tr>
            <tr><td>Peut agir sur le monde (appeler une API, écrire un fichier…)</td><td>Ne peut que générer du texte</td></tr>
            <tr><td>Décide seul des prochaines étapes</td><td>Répond une seule fois puis s'arrête</td></tr>
            <tr><td>Boucle jusqu'à résoudre le problème</td><td>Pas de boucle — une entrée, une sortie</td></tr>
            <tr><td>Peut mémoriser entre les étapes</td><td>Pas de mémoire au-delà du contexte</td></tr>
          </table>
          <p>En résumé : un LLM brut est un <span class="concept">cerveau sans corps</span>. Il pense, mais ne peut ni voir ni agir. Un agent, c'est ce cerveau <strong>connecté à des yeux, des mains et une mémoire</strong>.</p>`
    },
    {
      q: "Définir ce qu'est un agent LLM",
      a: `<p>Un <strong>agent LLM</strong> est un système qui utilise un LLM comme « moteur de raisonnement » au centre d'une boucle autonome :</p>
          <p><span class="tag">Observer</span> → <span class="tag">Réfléchir</span> → <span class="tag">Agir</span> → <span class="tag">Observer le résultat</span> → boucler.</p>
          <p>Concrètement, un agent LLM c'est :</p>
          <p><strong>1. Un LLM</strong> qui raisonne et décide</p>
          <p><strong>2. Des outils</strong> (tools) qu'il peut appeler : recherche web, calculatrice, APIs, base de données…</p>
          <p><strong>3. De la mémoire</strong> pour retenir le contexte entre les étapes</p>
          <p><strong>4. Une boucle</strong> qui orchestre le tout jusqu'à atteindre l'objectif</p>
          <p>Exemples concrets : <strong>ChatGPT avec plugins</strong> (peut chercher sur le web, exécuter du code), <strong>Claude avec tools</strong> (peut lire des fichiers, chercher), <strong>Devin</strong> (agent développeur qui code en autonomie).</p>`
    }
  ]
});
