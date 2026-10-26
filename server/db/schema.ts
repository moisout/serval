import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

type Role = 'teacher' | 'student'

export const usersTable = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull(),
  role: text('role').$type<Role>().notNull(),
  password: text('password').notNull(),
  authToken: text('auth_token').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
})

export const accessCodesTable = sqliteTable('access_codes', {
  id: text('id').primaryKey(),
  code: text('code').notNull(),
  role: text('role').$type<Role>().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
})

export const exercisesTable = sqliteTable('exercises', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  authorId: text('author_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade'
    }),
  topic: text('topic').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
})

export const questionsTable = sqliteTable('questions', {
  id: text('id').primaryKey(),
  // order: integer('order').notNull(),
  exerciseId: text('exercise_id')
    .notNull()
    .references(() => exercisesTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  question: text('question').notNull(),
  additionalText: text('additional_text'),
  correctAnswer: text('correct_answer').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
})

export const resultsTable = sqliteTable('results', {
  id: text('id').primaryKey(),
  answer: text('answer').notNull(),
  exerciseId: text('exercise_id')
    .notNull()
    .references(() => exercisesTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  questionId: text('question_id')
    .notNull()
    .references(() => questionsTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
})
