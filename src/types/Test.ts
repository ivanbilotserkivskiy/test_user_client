import { Question } from "./Question"

export type Test = {
  _id: string,
  title: string,
  questions: Question[],
}
