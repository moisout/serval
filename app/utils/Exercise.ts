export interface Exercise {
  id: string
  name: string
  author: string
  topic: string
  questionCount?: number
  questions: Question[]
}
