import { integer, text, pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = pgTable('users', {
  user_id: text('user_id').primaryKey(),
  balance: integer('balance').notNull().default(0),
});

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users).required({
  user_id: true,
});
// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(users);

// const t = insertUserSchema.safeParse({ data: 'd' });
// if (t.success) {
//   t.data;
// }
