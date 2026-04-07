// Module 2 — Code & Fournisseurs
window.MODULES = window.MODULES || [];
window.MODULES.push({
  id: 'code',
  number: 'Module 2',
  title: "Code & Fournisseurs",
  status: 'completed',
  questions: [
    {
      q: "Comment appeler un LLM en Python (Hugging Face) ?",
      a: `<p>Appel direct via la librairie <strong>Transformers</strong> :</p>
          <div class="code"><div class="code-top"><span class="code-lang">Python</span></div>
          <pre><span class="kw">from</span> transformers <span class="kw">import</span> pipeline

modele = pipeline(<span class="str">'text-generation'</span>, model=<span class="str">'gpt2'</span>)
resultat = modele(
    <span class="str">'Quels sont les avantages de l\\'IA ?'</span>,
    max_length=<span class="fn">50</span>
)
<span class="fn">print</span>(resultat)</pre></div>`
    },
    {
      q: "Comment appeler un LLM via API (JavaScript) ?",
      a: `<p>Via le SDK OpenAI :</p>
          <div class="code"><div class="code-top"><span class="code-lang">JavaScript</span></div>
          <pre><span class="kw">import</span> OpenAI <span class="kw">from</span> <span class="str">"openai"</span>;

<span class="kw">const</span> openai = <span class="kw">new</span> <span class="fn">OpenAI</span>({ apiKey: <span class="str">'VOTRE_CLE'</span> });
<span class="kw">const</span> completion = <span class="kw">await</span> openai.chat.completions.<span class="fn">create</span>({
  model: <span class="str">"gpt-4o"</span>,
  messages: [{ role: <span class="str">"user"</span>, content: <span class="str">"Bonjour !"</span> }],
});
console.<span class="fn">log</span>(completion.choices[0].message.content);</pre></div>`
    },
    {
      q: "Quels sont les principaux fournisseurs de LLM ?",
      a: `<p><strong>Google</strong> (Gemini), <strong>Meta</strong> (Llama), <strong>OpenAI</strong> (GPT), <strong>Anthropic</strong> (Claude).</p>
          <p>Aujourd'hui les LLM sont partout : recherche, apprentissage, génération de textes variées.</p>`
    }
  ]
});
