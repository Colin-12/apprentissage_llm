// Module 4 — Le Finetuning
window.MODULES = window.MODULES || [];
window.MODULES.push({
  id: 'finetuning',
  number: 'Module 4',
  title: "Le Finetuning",
  status: 'completed',
  questions: [
    {
      q: "Pourquoi le pretraining seul ne suffit pas ?",
      a: `<p>Un modèle pré-entraîné ne fait que <strong>continuer du texte</strong> — il n'obéit pas à des instructions. GPT ou Claude ont subi <strong>plusieurs phases d'ajustement</strong> pour devenir des assistants.</p>`
    },
    {
      q: "Qu'est-ce que le finetuning concrètement ?",
      a: `<p>Continuer l'entraînement sur un dataset <strong>plus petit et ciblé</strong>, souvent annoté par des humains. Les poids sont ajustés pour : suivre des instructions, refuser les demandes dangereuses, répondre utilement.</p>
          <p><strong>Exemples :</strong> résumé, génération de code, traduction, réponses médicales…</p>`
    }
  ]
});
