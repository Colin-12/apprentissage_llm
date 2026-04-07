// Module 8 — Agent avancé : mémoire, boucle, planification
window.MODULES = window.MODULES || [];
window.MODULES.push({
  id: 'agents-advanced',
  number: 'Module 8',
  title: "Agent avancé : mémoire, boucle, planification",
  status: 'completed',
  questions: [
    {
      q: "Comment ajouter de la mémoire à un agent ?",
      a: `<p>Un LLM est <strong>sans état</strong> — il oublie tout entre chaque appel. Pour qu'un agent se souvienne, on gère la mémoire dans le code autour du LLM.</p>
          <p><strong>Mémoire court terme</strong> (conversation) : on stocke l'historique des messages et on le renvoie à chaque appel. Problème : la fenêtre de contexte est limitée, donc on résume ou on tronque.</p>
          <p><strong>Mémoire long terme</strong> : on stocke les informations importantes dans une <span class="tag">base vectorielle</span> (ex : Pinecone, ChromaDB). À chaque nouvelle question, on cherche les souvenirs pertinents par similarité sémantique et on les injecte dans le prompt.</p>
          <div class="code"><div class="code-top"><span class="code-lang">Pseudo-code</span></div>
          <pre><span class="cm"># À chaque tour de l'agent :</span>
relevant_memories = vector_db.<span class="fn">search</span>(query, top_k=<span class="fn">5</span>)
prompt = system_prompt + relevant_memories + conversation_history
response = llm.<span class="fn">chat</span>(prompt)

<span class="cm"># Après la réponse, on sauvegarde :</span>
vector_db.<span class="fn">store</span>(response)</pre></div>`
    },
    {
      q: "Comment implémenter une boucle d'agent ?",
      a: `<p>La boucle d'agent est le cœur du système. C'est un <span class="concept">while</span> qui tourne jusqu'à ce que l'agent ait terminé sa tâche :</p>
          <div class="code"><div class="code-top"><span class="code-lang">Python — Boucle d'agent</span></div>
          <pre><span class="kw">while</span> <span class="kw">not</span> done:
    <span class="cm"># 1. Le LLM réfléchit et choisit une action</span>
    action = llm.<span class="fn">decide</span>(history, tools)

    <span class="kw">if</span> action.type == <span class="str">"final_answer"</span>:
        <span class="cm"># L'agent a fini</span>
        done = <span class="kw">True</span>
        result = action.content
    <span class="kw">else</span>:
        <span class="cm"># 2. On exécute l'outil choisi</span>
        observation = <span class="fn">execute_tool</span>(action)
        <span class="cm"># 3. On ajoute le résultat à l'historique</span>
        history.<span class="fn">append</span>(observation)
        <span class="cm"># 4. On reboucle → le LLM revoit tout</span></pre></div>
          <p>Le pattern le plus connu s'appelle <span class="tag">ReAct</span> (Reasoning + Acting) : le LLM alterne entre <strong>réflexion</strong> (« je dois chercher X ») et <strong>action</strong> (appel d'outil), jusqu'à pouvoir donner une réponse finale.</p>`
    },
    {
      q: "Comment faire planifier un agent ?",
      a: `<p>Un agent basique agit étape par étape sans vision d'ensemble. Un agent <strong>planificateur</strong> décompose d'abord le problème en sous-tâches avant d'agir.</p>
          <p><strong>Approche simple :</strong> on demande au LLM de générer un plan avant d'exécuter.</p>
          <div class="code"><div class="code-top"><span class="code-lang">Prompt de planification</span></div>
          <pre><span class="str">"""
Tu es un agent planificateur.
Objectif : {objectif_utilisateur}

Avant d'agir, génère un plan étape par étape.
Format :
1. [action] description
2. [action] description
...

Ensuite, exécute chaque étape une par une.
Après chaque étape, évalue si le plan doit être ajusté.
"""</span></pre></div>
          <p><strong>Techniques avancées :</strong></p>
          <div class="methods">
            <div class="method">
              <div class="m-tag">Plan-and-Execute</div>
              <h4>Planifier puis exécuter</h4>
              <p>Un premier LLM crée le plan. Un second exécute chaque étape. Le premier re-planifie si nécessaire.</p>
            </div>
            <div class="method">
              <div class="m-tag">Tree of Thoughts</div>
              <h4>Arbre de réflexion</h4>
              <p>Le LLM explore plusieurs chemins possibles en parallèle et choisit le meilleur. Utile pour les problèmes complexes.</p>
            </div>
          </div>`
    }
  ]
});
