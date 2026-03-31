export type FaqItem = {
  question: string;
  answer: string;
};

export const contactFaqs: FaqItem[] = [
  {
    question: "Sous combien de temps puis-je avoir un retour ?",
    answer:
      "Je reviens generalement vers vous sous 24 a 48 heures ouvrees avec un premier retour clair sur votre demande et la suite la plus pertinente.",
  },
  {
    question: "Le premier echange est-il engageant ?",
    answer:
      "Non. Le premier echange permet de comprendre votre contexte, vos objectifs et vos points de friction afin de verifier si un accompagnement est pertinent.",
  },
  {
    question: "Travaillez-vous a distance ou sur site ?",
    answer:
      "Les accompagnements peuvent se faire a distance. Des interventions sur site sont aussi possibles selon vos besoins et votre localisation.",
  },
  {
    question: "Quels types d'entreprises accompagnez-vous ?",
    answer:
      "J'accompagne des entreprises qui veulent renforcer leur experience client, mieux fideliser et structurer une croissance plus durable, quel que soit leur niveau de maturite.",
  },
];
