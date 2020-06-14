import { QuizzResultModel, QuizzResult } from "./quizz-result"

test("can be created", () => {
  const instance: QuizzResult = QuizzResultModel.create({})

  expect(instance).toBeTruthy()
})