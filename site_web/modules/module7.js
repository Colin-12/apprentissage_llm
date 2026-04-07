// Module 7 — Connecter un LLM à des outils
window.MODULES = window.MODULES || [];
window.MODULES.push({
  id: 'agents-tools',
  number: 'Module 7',
  title: "Connecter un LLM à des outils",
  status: 'completed',
  questions: [
    {
      q: "Comment connecter un LLM à des outils externes ?",
      a: `<p>Le principe est le <span class="tag">function calling</span> (ou tool use). On décrit des outils au LLM dans le prompt, et il choisit lequel appeler quand c'est pertinent.</p>
          <p><strong>Étape 1 :</strong> on décrit les outils disponibles au LLM sous forme de schéma (nom, description, paramètres).</p>
          <p><strong>Étape 2 :</strong> quand l'utilisateur pose une question, le LLM décide s'il a besoin d'un outil. Si oui, il génère un appel structuré (JSON) au lieu de texte.</p>
          <p><strong>Étape 3 :</strong> notre code exécute l'outil et renvoie le résultat au LLM.</p>
          <p><strong>Étape 4 :</strong> le LLM formule sa réponse finale en intégrant le résultat.</p>
          <div class="code"><div class="code-top"><span class="code-lang">Python — Exemple simplifié</span></div>
          <pre><span class="cm"># 1. On décrit un outil "météo"</span>
tools = [{
    <span class="str">"name"</span>: <span class="str">"get_weather"</span>,
    <span class="str">"description"</span>: <span class="str">"Obtenir la météo d'une ville"</span>,
    <span class="str">"parameters"</span>: {
        <span class="str">"city"</span>: { <span class="str">"type"</span>: <span class="str">"string"</span> }
    }
}]

<span class="cm"># 2. Le LLM reçoit la question + la liste d'outils</span>
response = llm.chat(
    messages=[{<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: <span class="str">"Quel temps fait-il à Paris ?"</span>}],
    tools=tools
)

<span class="cm"># 3. Le LLM répond : "appelle get_weather(city='Paris')"</span>
<span class="cm"># 4. On exécute, on renvoie le résultat, il formule la réponse</span></pre></div>
          <p>Les principaux frameworks pour ça : <strong>OpenAI function calling</strong>, <strong>Anthropic tool use</strong>, <strong>LangChain</strong>, <strong>LlamaIndex</strong>.</p>`
    }
  ]
});
