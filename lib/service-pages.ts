export type ServiceSlug = "reactiver" | "captiver" | "fideliser" | "piloter";

type Item = {
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePageData = {
  slug: ServiceSlug;
  name: string;
  eyebrow: string;
  problem: string;
  intro: string;
  icon: string;
  color: string;
  symptoms: Item[];
  reasons: Item[];
  whoFor: string[];
  steps: Item[];
  formTitle: string;
  formNote: string;
  outcomeIntro: string;
  outcomes: string[];
  faq: FaqItem[];
};

export const servicePages: Record<ServiceSlug, ServicePageData> = {
  reactiver: {
    slug: "reactiver",
    name: "Reactiver",
    eyebrow: "Relancer le reachat",
    problem: "Vos clients connaissent votre entreprise, mais ne pensent plus a revenir.",
    intro:
      "Cette offre sert a remettre du mouvement dans votre base client avec des relances utiles, un meilleur timing et une logique de recurrence plus claire.",
    icon: "/reactiver-icon.svg",
    color: "var(--color-indigo)",
    symptoms: [
      {
        title: "Des clients qui dorment",
        description:
          "Votre base existe, mais une partie importante ne commande plus ou ne repasse plus en point de vente.",
      },
      {
        title: "Une frequence d'achat trop faible",
        description:
          "Vous manquez d'occasions de reachat et votre chiffre depend trop de nouvelles acquisitions.",
      },
      {
        title: "Aucun scenario de relance clair",
        description:
          "Les actions partent de facon ponctuelle sans segmentation ni priorite entre les profils clients.",
      },
    ],
    reasons: [
      {
        title: "Pour ne pas tomber dans le piège de la sur pression marketing",
        description:
          "Vous voulez que vos client réachètent - pas qu’ils fuient après 4 relances par mail non coordonnées et mal ciblées.",
      },
      {
        title: "Pour ne pas gaspiller votre temps et votre argent",
        description:
          "Être accompagné vous permet de passer d’actions isolées qui partent dans tous les sens à un véritable plan d’attaque coordonné.",
      },
      {
        title: "Pour éviter des erreurs dramatiques",
        description:
          "Si vous voulez augmenter le réachat vous devez frapper juste. La clé ? Un bon paramétrage et une segmentation fine basée sur VOS données.",
      },
    ],
    whoFor: [
      "Entreprises avec une base client inactive ou sous-exploitee",
      "Equipes qui veulent augmenter la frequence d'achat sans sursolliciter",
      "Structures qui ont besoin d'un plan de relance simple a executer",
    ],
    steps: [
      {
        title: "Diagnostic",
        description:
          "Lecture de la situation actuelle, des signaux d'inactivite et des segments a prioriser.",
      },
      {
        title: "Strategie de reactivation",
        description:
          "Definition des messages, offres et rythmes de relance selon votre activite.",
      },
      {
        title: "Plan de deploiement",
        description:
          "Priorisation des actions rapides, des indicateurs a suivre et du cadre de test.",
      },
    ],
    formTitle: "Ne laissez plus vos clients sortir du radar",
    formNote: "Les champs marques d'un * sont obligatoires.",
    outcomeIntro:
      "Vous obtenez une strategie de reactivation claire, avec des priorites simples et des actions directement exploitables.",
    outcomes: [
      "Une vision claire des clients a relancer en priorite",
      "Des scenarios de relance alignes sur votre cycle d'achat",
      "Un plan concret pour recreer du reachat et suivre les resultats",
    ],
    faq: [
      {
        question: "Est-ce adapte si je n'ai pas beaucoup de donnees clients ?",
        answer:
          "Oui. L'approche peut demarrer avec peu de donnees, tant qu'on peut observer quelques comportements et structurer des priorites realistes.",
      },
      {
        question: "Est-ce que vous gerez aussi l'operationnel ?",
        answer:
          "Selon le besoin, je peux cadrer la strategie, prioriser les actions et vous aider a organiser le deploiement avec vos equipes ou vos prestataires.",
      },
      {
        question: "En combien de temps voit-on les premiers effets ?",
        answer:
          "Les premiers enseignements arrivent souvent vite si la base est exploitable, mais l'objectif reste de construire une dynamique durable et pas un simple coup ponctuel.",
      },
    ],
  },
  captiver: {
    slug: "captiver",
    name: "Captiver",
    eyebrow: "Retenir l'attention",
    problem: "Vous attirez des clients, mais l'experience ne donne pas assez envie de rester, revenir ou recommander.",
    intro:
      "Cette offre permet de renforcer l'impact de votre experience client sur les moments decisifs, la ou se joue l'envie de poursuivre la relation.",
    icon: "/captiver-icon.svg",
    color: "var(--color-lila)",
    symptoms: [
      {
        title: "Une promesse peu memorisable",
        description:
          "Votre offre existe, mais elle ne se distingue pas assez dans la perception de vos clients.",
      },
      {
        title: "Des irritants dans le parcours",
        description:
          "Des details apparemment mineurs cassent l'envie d'aller plus loin ou de revenir.",
      },
      {
        title: "Une relation qui s'essouffle vite",
        description:
          "L'attention est la au debut, mais l'engagement retombe rapidement apres le premier contact.",
      },
    ],
    reasons: [
      {
        title: "Regarder les moments qui comptent",
        description:
          "L'accompagnement aide a cibler les interactions qui ont un vrai impact sur la retention et la perception.",
      },
      {
        title: "Clarifier la valeur percue",
        description:
          "Je travaille ce qui rend votre proposition plus lisible, plus desirable et plus convaincante.",
      },
      {
        title: "Rendre l'experience plus coherente",
        description:
          "L'objectif n'est pas d'en faire plus, mais de mieux aligner message, preuves et ressenti client.",
      },
    ],
    whoFor: [
      "Entreprises qui perdent des clients trop tot dans la relation",
      "Marques qui veulent renforcer l'engagement avant la fidelisation",
      "Equipes qui veulent retravailler les moments clefs du parcours client",
    ],
    steps: [
      {
        title: "Observation du parcours",
        description:
          "On repere les points de friction, les attentes non couvertes et les moments qui diluent la valeur percue.",
      },
      {
        title: "Recommandations prioritaires",
        description:
          "Je formule des actions claires pour mieux capter l'attention et rendre l'experience plus forte.",
      },
      {
        title: "Mise en musique",
        description:
          "Vous repartez avec un plan d'optimisation concret et une logique de priorisation realiste.",
      },
    ],
    formTitle: "Renforcez l'experience qui donne envie de rester",
    formNote: "Les champs marques d'un * sont obligatoires.",
    outcomeIntro:
      "Vous obtenez une experience plus lisible et plus engageante sur les moments qui influencent vraiment la retention.",
    outcomes: [
      "Une lecture claire des irritants qui freinent l'engagement",
      "Des recommandations precises pour vos points de contact prioritaires",
      "Un plan d'amelioration coherent avec votre promesse de marque",
    ],
    faq: [
      {
        question: "Cette offre concerne-t-elle seulement le digital ?",
        answer:
          "Non. Elle peut couvrir aussi bien le parcours en ligne que les interactions en point de vente, en service client ou dans vos prises de parole.",
      },
      {
        question: "Travaillez-vous sur le contenu et le message ?",
        answer:
          "Oui, si cela fait partie du probleme. Le message, la preuve et l'experience doivent se soutenir au lieu de se contredire.",
      },
      {
        question: "Faut-il tout refaire ?",
        answer:
          "Non. Le plus utile est souvent de corriger quelques moments clefs plutot que de repartir de zero.",
      },
    ],
  },
  fideliser: {
    slug: "fideliser",
    name: "Fideliser",
    eyebrow: "Structurer la relation",
    problem: "Vous avez deja des actions de fidelite, mais elles ne s'inscrivent pas dans une strategie durable et lisible.",
    intro:
      "Cette offre sert a passer d'initiatives dispersees a un dispositif de fidelisation coherent, adapte a vos clients et a votre realite terrain.",
    icon: "/fideliser-icon.svg",
    color: "var(--color-mauve)",
    symptoms: [
      {
        title: "Des actions isolees",
        description:
          "Carte de fidelite, promotions, emails ou avantages existent, mais rien ne relie vraiment l'ensemble.",
      },
      {
        title: "Peu de vision sur la retention",
        description:
          "Vous savez que la fidelisation est importante, mais vous manquez de structure pour la piloter.",
      },
      {
        title: "Une valeur client sous-exploitee",
        description:
          "La relation ne progresse pas assez dans le temps et les opportunites de recommandation restent faibles.",
      },
    ],
    reasons: [
      {
        title: "Sortir du bricolage",
        description:
          "Je vous aide a articuler les actions, les cibles et les benefices dans une logique d'ensemble.",
      },
      {
        title: "Concevoir une strategie a votre mesure",
        description:
          "La fidelisation ne se copie pas. Elle doit coller a votre activite, vos clients et vos moyens.",
      },
      {
        title: "Faire durer ce qui fonctionne",
        description:
          "On pose un cadre qui permet de deployer, ajuster et consolider la relation client dans le temps.",
      },
    ],
    whoFor: [
      "Entreprises avec une carte de fidelite ou des actions relationnelles peu structurees",
      "Equipes qui veulent clarifier leur strategie de retention",
      "Structures qui cherchent un plan de fidelisation sur mesure",
    ],
    steps: [
      {
        title: "Cadrage de la strategie",
        description:
          "Definition des objectifs, des profils clients et des leviers les plus pertinents.",
      },
      {
        title: "Conception du dispositif",
        description:
          "Construction des mecanismes, avantages, prises de parole et moments relationnels.",
      },
      {
        title: "Feuille de route",
        description:
          "Priorisation du deploiement, des indicateurs et des prochaines iterations.",
      },
    ],
    formTitle: "Construisez une fidelisation plus claire et plus utile",
    formNote: "Les champs marques d'un * sont obligatoires.",
    outcomeIntro:
      "Vous repartez avec une strategie de fidelisation structuree, actionnable et pensee pour durer.",
    outcomes: [
      "Une strategie alignee sur vos objectifs et vos typologies clients",
      "Un dispositif relationnel coherent plutot qu'une suite d'actions isolees",
      "Une feuille de route claire pour deployer et faire evoluer la fidelisation",
    ],
    faq: [
      {
        question: "Est-ce utile si j'ai deja une carte de fidelite ?",
        answer:
          "Oui. Une carte n'est qu'un outil. L'enjeu est de construire la strategie autour pour qu'elle cree vraiment de la valeur.",
      },
      {
        question: "Pouvez-vous intervenir sans logiciel specifique ?",
        answer:
          "Oui. Le travail commence par la logique strategique. Les outils viennent ensuite en soutien, pas l'inverse.",
      },
      {
        question: "L'accompagnement est-il reserve aux grosses structures ?",
        answer:
          "Non. Il est justement pense pour des TPE et PME qui veulent une strategie claire sans dispositif trop lourd.",
      },
    ],
  },
  piloter: {
    slug: "piloter",
    name: "Piloter",
    eyebrow: "Prendre la main",
    problem: "Vous voulez garder la maitrise de votre plan de fidelisation avec une methode de pilotage claire.",
    intro:
      "Cette offre vous aide a structurer vos decisions, choisir les bons indicateurs et faire avancer votre strategie de facon autonome.",
    icon: "/piloter-icon.svg",
    color: "var(--color-jaune)",
    symptoms: [
      {
        title: "Des decisions difficiles a arbitrer",
        description:
          "Vous avez plusieurs pistes, mais pas de cadre net pour choisir ce qu'il faut faire en premier.",
      },
      {
        title: "Des indicateurs peu utiles",
        description:
          "Vous suivez des chiffres, mais ils ne vous aident pas vraiment a piloter la relation client.",
      },
      {
        title: "Un plan qui avance par a-coups",
        description:
          "Les initiatives existent, mais manquent de rythme, de priorites et de logique de progression.",
      },
    ],
    reasons: [
      {
        title: "Prendre de meilleures decisions",
        description:
          "Je vous aide a distinguer les vrais arbitrages des faux sujets qui prennent du temps sans impact.",
      },
      {
        title: "Mettre en place un cadre lisible",
        description:
          "Vous avez besoin d'une methode pour suivre, corriger et faire avancer la strategie sans dependance excessive.",
      },
      {
        title: "Garder la maitrise en interne",
        description:
          "L'accompagnement renforce votre capacite a piloter vous-meme plutot qu'a empiler des actions sans gouvernance.",
      },
    ],
    whoFor: [
      "Dirigeants qui veulent piloter eux-memes la fidelisation",
      "Equipes marketing qui ont besoin d'un cadre de decision",
      "Entreprises qui cherchent un accompagnement plus strategique qu'operationnel",
    ],
    steps: [
      {
        title: "Alignement",
        description:
          "Clarification des objectifs business, des ressources disponibles et des enjeux prioritaires.",
      },
      {
        title: "Construction du pilotage",
        description:
          "Choix des indicateurs, des rituels de suivi et des points de decision utiles.",
      },
      {
        title: "Accompagnement dans la duree",
        description:
          "Sessions de travail pour faire progresser le plan, ajuster la trajectoire et accelerer les arbitrages.",
      },
    ],
    formTitle: "Mettez votre strategie sous pilotage",
    formNote: "Les champs marques d'un * sont obligatoires.",
    outcomeIntro:
      "Vous obtenez un cadre de pilotage simple, utile et durable pour faire avancer votre strategie sans perdre la main.",
    outcomes: [
      "Des priorites plus nettes pour orienter les actions",
      "Des indicateurs qui servent vraiment a decider",
      "Une methode de suivi pour faire progresser votre plan dans le temps",
    ],
    faq: [
      {
        question: "Est-ce une offre de conseil ou de coaching ?",
        answer:
          "C'est un accompagnement strategique tres operationnel dans la facon d'arbitrer, de suivre et d'avancer.",
      },
      {
        question: "Peut-on l'utiliser si un plan existe deja ?",
        answer:
          "Oui. L'offre est utile autant pour structurer un plan naissant que pour remettre en coherence un dispositif deja en place.",
      },
      {
        question: "Aidez-vous a choisir les indicateurs ?",
        answer:
          "Oui. C'est meme un point central pour eviter les suivis inutiles et concentrer l'effort sur ce qui aide vraiment a piloter.",
      },
    ],
  },
};

export const serviceSlugs = Object.keys(servicePages) as ServiceSlug[];
