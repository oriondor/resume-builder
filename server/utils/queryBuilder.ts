import type { H3Event } from "h3";

/**
 * Build a SQL WHERE/ORDER BY clause from query parameters following the convention:
 *
 * - Search:  `?search-by-{column}=value`
 *   → Produces `WHERE column ILIKE $1`
 *
 * - Multiple search params are combined with `AND`:
 *   `?search-by-name=vue&search-by-description=frontend`
 *   → `WHERE name ILIKE $1 AND description ILIKE $2`
 *
 * - Order:   `?order-by-{column}`
 *   - Direction: `?order-direction-asc` or `?order-direction-desc`
 *   - If no direction is provided, defaults to `ASC`
 *
 * Example:
 *   `/skills?search-by-name=vue&order-by-created_at&order-direction-desc`
 *   → `WHERE name ILIKE $1 ORDER BY created_at DESC`
 *
 * @param event - H3Event from the request handler
 * @param opts  - Options to configure valid columns
 * @param opts.searchableCols - Whitelist of columns that can be used in `search-by-` filters
 * @param opts.sortableCols   - Whitelist of columns that can be used in `order-by-`
 * @returns An object containing:
 *          - `whereSql`: WHERE clause fragment (or empty string)
 *          - `orderSql`: ORDER BY clause fragment (or empty string)
 *          - `values`: parameter values for pg query
 */
export function buildQuery(
  event: H3Event,
  opts: {
    searchableCols?: string[];
    sortableCols?: string[];
  } = {}
): { whereSql: string; orderSql: string; values: any[] } {
  const query = getQuery(event);
  const values: any[] = [];
  const conditions: string[] = [];

  // Handle search params
  for (const key in query) {
    if (key.startsWith("search-by-")) {
      const col = key.replace("search-by-", "");
      if (opts.searchableCols?.includes(col) && query[key]) {
        values.push(`%${query[key]}%`);
        conditions.push(`${col} ILIKE $${values.length}`);
      }
    }
  }

  const whereSql = conditions.length ? "WHERE " + conditions.join(" AND ") : "";

  // Handle order params
  let orderSql = "";
  for (const key in query) {
    if (key.startsWith("order-by-")) {
      const col = key.replace("order-by-", "");
      if (opts.sortableCols?.includes(col)) {
        // Check direction
        const dirKey = Object.keys(query).find((k) => k.startsWith("order-direction-"));
        const dir = dirKey ? dirKey.replace("order-direction-", "").toUpperCase() : "ASC";
        const orderDir = dir === "DESC" ? "DESC" : "ASC";
        orderSql = `ORDER BY ${col} ${orderDir}`;
      }
    }
  }

  return { whereSql, orderSql, values };
}
