export type Question = QuestionYesNo

interface QuestionYesNo {
  id: string
  type: 'yes-no'
  question: string
  additionalText?: string
  correctAnswer: 'yes' | 'no'
}
