import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// create the connection
const connection = postgres(process.env.DATABASE_URL as string, { max: 1 });

export const db = drizzle(connection, { logger: true });
