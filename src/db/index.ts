import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// for migrations
const migrationClient = postgres("postgresql://root:root@localhost:5432/postgres", { max: 1 });
// I still don't understand what the spread operator is doing here
// migrate(drizzle(migrationClient), ...

// for query purposes
const queryClient = postgres("postgresql://root:root@localhost:5432/postgres");

// await db.select().from(...)...

const db = drizzle(queryClient);

export default db;
