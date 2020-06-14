import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export interface QuizzQuestion {
  id: number
  name: string
}

export interface QuizzResponse {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetQuestionResult = { kind: "ok"; quizzQuestion: QuizzQuestion } | GeneralApiProblem

export type GetResponsesResult = { kind: "ok"; quizzResponses: QuizzResponse[] } | GeneralApiProblem
