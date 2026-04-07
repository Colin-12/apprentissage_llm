// Module 5 — Les méthodes de finetuning
window.MODULES = window.MODULES || [];
window.MODULES.push({
  id: 'methods',
  number: 'Module 5',
  title: "Les méthodes de finetuning",
  status: 'completed',
  questions: [
    {
      q: "Quelles sont les 4 grandes méthodes de finetuning ?",
      a: `<div class="methods">
            <div class="method">
              <div class="m-tag">SFT</div>
              <h4>Supervised Fine-Tuning</h4>
              <p>Dataset de paires question → réponse idéale. La méthode la plus directe.</p>
            </div>
            <div class="method">
              <div class="m-tag">LoRA</div>
              <h4>Low-Rank Adaptation</h4>
              <p>On gèle tout, on ajoute de minuscules matrices entraînables. Léger et efficace.</p>
            </div>
            <div class="method">
              <div class="m-tag">RLHF</div>
              <h4>RL from Human Feedback</h4>
              <p>Un humain compare deux réponses. Un reward model apprend ces préférences.</p>
            </div>
            <div class="method">
              <div class="m-tag">DPO</div>
              <h4>Direct Preference Optimization</h4>
              <p>On indique directement bonne/mauvaise réponse, sans étape intermédiaire.</p>
            </div>
          </div>`
    }
  ]
});
