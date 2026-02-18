import { nanoid } from "nanoid";
import type { Quiz } from "./quiz";
import { flattenQuestions } from "./quiz";

export type SessionPhase = "question" | "reveal" | "sponsor";

export type SessionState = {
  code: string;
  hostToken: string;
  quiz: Quiz;
  createdAt: number;
  status: "lobby" | "live" | "finished";
  questionIndex: number;
  phase: SessionPhase;
  tieBreakerActive: boolean;
  scores: Record<string, number>;
  teamMode: boolean;
  playerTeams: Record<string, string>;
  answered: Record<string, string>;
};

export function newSession(quiz: Quiz): SessionState {
  return {
    code: nanoid(6).toUpperCase(),
    hostToken: nanoid(24),
    quiz,
    createdAt: Date.now(),
    status: "lobby",
    questionIndex: -1,
    phase: "question",
    tieBreakerActive: false,
    scores: {},
    teamMode: false,
    playerTeams: {},
    answered: {},
  };
}

export function getCurrentQuestion(s: SessionState) {
  if (s.tieBreakerActive) {
    return s.quiz.tieBreaker ?? null;
  }
  const list = flattenQuestions(s.quiz);
  if (s.questionIndex < 0 || s.questionIndex >= list.length) return null;
  return list[s.questionIndex];
}

export function getScoreKey(s: SessionState, playerName: string, teamName?: string) {
  if (!s.teamMode) return playerName;
  const normalizedTeam = (teamName ?? s.playerTeams[playerName] ?? "").trim();
  if (!normalizedTeam) return playerName;
  s.playerTeams[playerName] = normalizedTeam;
  return `Team: ${normalizedTeam}`;
}

export function publicState(s: SessionState) {
  const current = getCurrentQuestion(s);
  return {
    code: s.code,
    status: s.status,
    phase: s.phase,
    tieBreakerActive: s.tieBreakerActive,
    teamMode: s.teamMode,
    title: s.quiz.title,
    subtitle: s.quiz.subtitle,
    questionIndex: s.questionIndex,
    questionCount: flattenQuestions(s.quiz).length,
    currentQuestion: current
      ? {
          id: current.id,
          prompt: current.prompt,
          options: current.options,
          sponsorSlide: current.sponsorSlide ?? null,
          correctIndex: s.phase === "reveal" ? current.correctIndex : null,
        }
      : null,
    scores: s.scores,
  };
}
