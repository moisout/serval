export interface ExerciseResult {
  userId: string
  username: string
  questions: {
    questionId: string
    question: string
    additionalText: string
    correctAnswer: string
    result: {
      id: string
      answer: string
      isCorrect: boolean
      answeredOn: Date
    } | null
  }[]
}
