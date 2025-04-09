export interface AccessCode {
  id: string
  code: string
  role: 'teacher' | 'student'
  createdAt: string
}
