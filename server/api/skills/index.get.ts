import { buildQuery } from "~/server/utils/queryBuilder";

export default defineEventHandler(async (event) => {
  const client = event.context.pg;

  const { whereSql, orderSql, values } = buildQuery(event, {
    searchableCols: ["name"],
    sortableCols: ["name", "created_at"],
  });

  const sql = `SELECT * FROM skills ${whereSql} ${orderSql}`;
  const { rows } = await client.query(sql, values);
  return rows;
});
