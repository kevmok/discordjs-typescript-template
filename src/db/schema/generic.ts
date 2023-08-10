import { text, pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const generic = pgTable('generic', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});

// Schema for selecting the prefix - can be used to validate API responses
export const SelectPrefixSchema = createSelectSchema(generic);

// Schema for updatinga prefix - can be used to validate API requests
export const updatePrefixSchema = createInsertSchema(generic);
