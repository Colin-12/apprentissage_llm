import OpenAI from "openai";
const openai = new OpenAI({ apiKey: 'VOTRE_CLE' });
const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Bonjour !" }],
});
console.log(completion.choices[0].message.content);
