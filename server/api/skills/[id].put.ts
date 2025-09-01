export default defineEventHandler(async (event) => {
  const client = event.context.pg;
  const id = getRouterParam(event, "id");
  const body = await readBody<{ name: string }>(event);

  const { rows } = await client.query("UPDATE skills SET name = $1 WHERE id = $2 RETURNING *", [
    body.name,
    id,
  ]);
  if (rows.length === 0) {
    throw createError({ statusCode: 404, statusMessage: "Skill not found" });
  }
  return rows[0];
});
