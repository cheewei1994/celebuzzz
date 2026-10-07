import { Pool } from "pg";

const globalForDb = globalThis as unknown as {
  pgPool?: Pool;
};

export const db =
  globalForDb.pgPool ??
  new Pool({
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    port: Number(process.env.POSTGRES_PORT || 5433),
    database: process.env.POSTGRES_DATABASE || "celebuzzz",
    user: process.env.POSTGRES_USER || "celebuzzz_app",
    password: process.env.POSTGRES_PASSWORD,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgPool = db;
}
