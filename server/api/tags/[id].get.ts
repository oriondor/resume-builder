// server/api/tags/[id].get.ts
export default defineEventHandler(async (event) => {
  const client = event.context.pg;
  const id = getRouterParam(event, "id");
  const { rows } = await client.query("SELECT * FROM tags WHERE id = $1", [id]);
  if (rows.length === 0) {
    throw createError({ statusCode: 404, statusMessage: "Tag not found" });
  }
  return rows[0];
});
