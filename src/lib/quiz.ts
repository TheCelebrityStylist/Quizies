export type QuizQuestion = {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  sponsorSlide?: {
    title: string;
    cta: string;
  };
};

export type QuizRound = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

export type Quiz = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  oneOffPriceEur: number;
  rounds: QuizRound[];
  tieBreaker?: QuizQuestion;
};

export const quizCatalog: Quiz[] = [
  {
    id: "weekly-001",
    slug: "weekly-pubquiz-energetic",
    title: "Weekly Pubquiz: Energetic Edition",
    subtitle: "4 rondes, live reveal, sponsor moments",
    description: "Perfect for bars and team nights with a smooth host flow.",
    oneOffPriceEur: 19,
    rounds: [
      {
        id: "r1",
        title: "General Knowledge",
        questions: [
          {
            id: "q1",
            prompt: "Welke stad staat bekend als de ‘Stad van 1000 bruggen’?",
            options: ["Hamburg", "Amsterdam", "Venetië", "Sint-Petersburg"],
            correctIndex: 0,
            sponsorSlide: { title: "Sponsormoment", cta: "Proef vanavond het huisbier 2 voor €9" },
          },
          {
            id: "q2",
            prompt: "Welke planeet heeft de meeste manen?",
            options: ["Jupiter", "Saturnus", "Uranus", "Neptunus"],
            correctIndex: 1,
          },
        ],
      },
      {
        id: "r2",
        title: "Culture & Pop",
        questions: [
          {
            id: "q3",
            prompt: "Wat is de bestverkopende gameconsole aller tijden?",
            options: ["PS2", "Nintendo Switch", "PS4", "Wii"],
            correctIndex: 0,
          },
          {
            id: "q4",
            prompt: "Welke van deze is géén schilderij van Van Gogh?",
            options: ["De Aardappeleters", "Sterrennacht", "Meisje met de parel", "Zonnebloemen"],
            correctIndex: 2,
          },
        ],
      },
      {
        id: "r3",
        title: "World Facts",
        questions: [
          {
            id: "q5",
            prompt: "Welk land heeft de meeste tijdzones (incl. overzeese gebieden)?",
            options: ["Rusland", "Verenigde Staten", "Frankrijk", "Australië"],
            correctIndex: 2,
          },
        ],
      },
    ],
    tieBreaker: {
      id: "tb1",
      prompt: "Hoeveel kilometer is de omtrek van de aarde ongeveer?",
      options: ["20.000", "30.000", "40.000", "50.000"],
      correctIndex: 2,
    },
  },
];

export const defaultQuiz = quizCatalog[0];

export function getQuizBySlug(slug: string) {
  return quizCatalog.find((quiz) => quiz.slug === slug);
}

export function flattenQuestions(quiz: Quiz) {
  return quiz.rounds.flatMap((round) => round.questions);
}
