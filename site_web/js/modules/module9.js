// Module 9 — Quête secondaire : Démo Agent
window.MODULES = window.MODULES || [];
window.MODULES.push({
  id: 'demo-agent',
  number: 'Quête secondaire',
  title: "Démo : un agent LLM que tu peux tester",
  status: 'completed',
  questions: [
    {
      q: "Que fais cette démo ?",
      a: `<p>Ceci un <strong>agent LLM interactif</strong> déployé en ligne qui démontre 4 compétences :</p>
          <div class="methods">
            <div class="method">
              <div class="m-tag">🔧 Outils</div>
              <h4>Connexion à des tools</h4>
              <p>L'agent utilise une calculatrice, un analyseur de texte et une horloge via le function calling.</p>
            </div>
            <div class="method">
              <div class="m-tag">🧠 Mémoire</div>
              <h4>Mémoire persistante</h4>
              <p>L'agent sauvegarde et rappelle des infos entre les échanges. Dis-lui ton nom, il s'en souviendra.</p>
            </div>
            <div class="method">
              <div class="m-tag">🔄 Boucle</div>
              <h4>Boucle ReAct</h4>
              <p>L'agent réfléchit, agit, observe le résultat, puis reboucle jusqu'à résoudre le problème.</p>
            </div>
            <div class="method">
              <div class="m-tag">📋 Plan</div>
              <h4>Planification</h4>
              <p>Donne-lui un objectif complexe, il le décompose en étapes structurées avant d'agir.</p>
            </div>
          </div>
          <p style="margin-top:16px"><strong>👉 <a href="https://TON-LIEN-STREAMLIT.streamlit.app" target="_blank" style="color:#2d6a4f">Tester l'agent en ligne</a></strong> (remplace le lien après déploiement)</p>`
    },
    {
      q: "Comment l'agent fonctionne-t-il techniquement ?",
      a: `<p>L'agent est construit en <strong>Python</strong> avec 3 fichiers :</p>
          <p><span class="tag">tools.py</span> définit les outils (calculatrice, mémoire, analyseur…) et les décrit au LLM sous forme de schéma JSON.</p>
          <p><span class="tag">agent.py</span> implémente la <strong>boucle ReAct</strong> : il envoie le message + les outils à Claude, exécute les outils demandés, renvoie les résultats, et reboucle jusqu'à obtenir une réponse finale.</p>
          <p><span class="tag">app.py</span> est l'interface Streamlit qui affiche le chat et rend <strong>visible chaque étape</strong> de la boucle (réflexion, appel d'outil, résultat).</p>
          <div class="code"><div class="code-top"><span class="code-lang">Boucle simplifiée</span></div>
          <pre><span class="kw">while</span> <span class="kw">not</span> done:
    response = claude.<span class="fn">chat</span>(messages, tools)

    <span class="kw">if</span> response.wants_tool:
        result = <span class="fn">execute_tool</span>(response.tool)
        messages.<span class="fn">append</span>(result)
        <span class="cm"># → reboucle</span>
    <span class="kw">else</span>:
        done = <span class="kw">True</span>
        <span class="cm"># → réponse finale</span></pre></div>`
    }
  ]
});
