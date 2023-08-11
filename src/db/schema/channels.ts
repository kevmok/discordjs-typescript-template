import { text, pgTable, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const channels = pgTable('channels', {
  channel_id: integer('channel_id').primaryKey(),
  channel_name: text('channel_name').notNull(),
  discord_role_id: text('user_role_id'),
  channel_type: text('channel_type', {
    enum: ['general', 'success', 'announcement'],
  }).default('general'),
});

// Schema for inserting a channel
export const insertChannelSchema = createInsertSchema(channels).required({
  channel_id: true,
  channel_name: true,
});

// Schema for selecting a channel
export const selectChannelSchema = createSelectSchema(channels).required({
  channel_id: true,
});

// Schema for updating a channel
export const updateChannelSchema = createInsertSchema(channels).required({
  channel_id: true,
});
