export default defineEventHandler(async (event) => {
  const client = event.context.pg;
  const id = getRouterParam(event, "id");
  const { rows } = await client.query("SELECT * FROM skills WHERE id = $1", [id]);
  if (rows.length === 0) {
    throw createError({ statusCode: 404, statusMessage: "Skill not found" });
  }
  return rows[0];
});
