!pip install transformers
from transformers import pipeline
modele = pipeline('text-generation', model='gpt2')
resultat = modele('Quels sont les avantages de l\'intelligence artificielle ?', max_length=50)
print(resultat)
