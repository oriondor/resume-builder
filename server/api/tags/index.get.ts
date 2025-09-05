// server/api/tags/index.get.ts
import { buildQuery } from "~/server/utils/queryBuilder";

export default defineEventHandler(async (event) => {
  const client = event.context.pg;
  const { identifier } = getQuery(event) as { identifier?: string };

  const { whereSql, orderSql, values } = buildQuery(event, {
    searchableCols: ["name"],
    sortableCols: ["name", "created_at"],
  });

  // Add identifier filter if provided (you can make it required by throwing when missing)
  let sql = `SELECT * FROM tags`;
  const params = [...values];
  let where = whereSql;

  if (identifier) {
    params.push(identifier);
    where += where
      ? ` AND identifier = $${params.length}`
      : ` WHERE identifier = $${params.length}`;
  }

  sql += ` ${where} ${orderSql}`;
  const { rows } = await client.query(sql, params);
  return rows;
});
