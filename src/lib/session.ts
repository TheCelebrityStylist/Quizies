import { nanoid } from "nanoid";
import type { Quiz } from "./quiz";

export type SessionState = {
  code: string;
  hostToken: string;
  quiz: Quiz;
  createdAt: number;

  status: "lobby" | "live" | "finished";
  questionIndex: number;
  scores: Record<string, number>;
  answered: Record<string, string>;
};

export function newSession(quiz: Quiz): SessionState {
  const code = nanoid(6).toUpperCase();
  const hostToken = nanoid(24);
  return {
    code,
    hostToken,
    quiz,
    createdAt: Date.now(),
    status: "lobby",
    questionIndex: -1,
    scores: {},
    answered: {},
  };
}

export function publicState(s: SessionState) {
  const current =
    s.questionIndex >= 0 && s.questionIndex < s.quiz.questions.length
      ? s.quiz.questions[s.questionIndex]
      : null;

  return {
    code: s.code,
    status: s.status,
    title: s.quiz.title,
    subtitle: s.quiz.subtitle,
    questionIndex: s.questionIndex,
    questionCount: s.quiz.questions.length,
    currentQuestion: current
      ? {
          id: current.id,
          prompt: current.prompt,
          options: current.options,
        }
      : null,
    scores: s.scores,
  };
}
