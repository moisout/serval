import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

type Role = 'teacher' | 'student'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull(),
  role: text('role').$type<Role>().notNull(),
  password: text('password').notNull(),
  authToken: text('auth_token').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
})

export const exercises = sqliteTable('exercises', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  authorId: text('author_id').notNull(),
  topic: text('topic').notNull()
})

export const exercisesRelations = relations(exercises, ({ one }) => ({
  author: one(users, {
    fields: [exercises.authorId],
    references: [users.id]
  })
}))

export const questions = sqliteTable('questions', {
  id: text('id').primaryKey(),
  order: integer('order').notNull(),
  exerciseId: text('exercise_id').notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull()
})

export const questionsRelations = relations(questions, ({ one }) => ({
  exercise: one(exercises, {
    fields: [questions.exerciseId],
    references: [exercises.id]
  })
}))
