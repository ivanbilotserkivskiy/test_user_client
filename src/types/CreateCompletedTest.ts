import { ScoreRecord } from "./ScoreRecord"

export type CreateCompletedTest = {
  data: TestData
}

type TestData = {
  userId: string,
  testId: string,
  record: ScoreRecord
}