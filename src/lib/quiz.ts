export type QuizQuestion = {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
};

export type Quiz = {
  id: string;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
};

export const defaultQuiz: Quiz = {
  id: "weekly-001",
  title: "QuizOS Weekly — High Energy Pubquiz",
  subtitle: "40 vragen. 4 rondes. Live score. Geen Kahoot nodig.",
  questions: [
    {
      id: "q1",
      prompt: "Welke stad staat bekend als de ‘Stad van 1000 bruggen’?",
      options: ["Hamburg", "Amsterdam", "Venetië", "Sint-Petersburg"],
      correctIndex: 0,
    },
    {
      id: "q2",
      prompt: "Welke planeet heeft de meeste manen (bekendste recente tellingen)?",
      options: ["Jupiter", "Saturnus", "Uranus", "Neptunus"],
      correctIndex: 1,
    },
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
    {
      id: "q5",
      prompt: "Welk land heeft de meeste tijdzones (incl. overzeese gebieden)?",
      options: ["Rusland", "Verenigde Staten", "Frankrijk", "Australië"],
      correctIndex: 2,
    },
  ],
};
