import { boolean, integer, pgEnum, pgTable, serial, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const guestbookEntries = pgTable('guestbook_entries', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  imageUrl: varchar('image_url', { length: 256 }).notNull(),
  message: varchar('message', { length: 5000 }).notNull(),
  createdOn: timestamp('created_on').notNull().defaultNow(),
  isApproved: boolean('is_approved').notNull().default(false),
  notifiedOn: timestamp('notified_on'),
});