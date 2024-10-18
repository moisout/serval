export interface DbUser {
  id: string
  username: string
  role: 'teacher' | 'student'
  password: string
  authToken: string
}
