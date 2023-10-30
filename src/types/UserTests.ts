import { PassedTest } from "./PassedTest"
import { Test } from "./Test"

export type UserTests = {
  assignedTests: Test[],
  completedTests: PassedTest[]
}