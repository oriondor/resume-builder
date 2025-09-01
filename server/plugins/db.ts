import { Pool } from "pg";
import type { H3EventContext } from "h3";

// Extend event.context with pg pool
declare module "h3" {
  interface H3EventContext {
    pg: Pool;
  }
}

let pool: Pool;

export default defineNitroPlugin((nitroApp) => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.NUXT_DATABASE_URL,
      // ssl: { rejectUnauthorized: false }, // enable if provider requires
    });
  }

  nitroApp.hooks.hook("request", (event) => {
    event.context.pg = pool;
  });
});
