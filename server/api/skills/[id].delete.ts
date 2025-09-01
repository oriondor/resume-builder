export default defineEventHandler(async (event) => {
  const client = event.context.pg;
  const id = getRouterParam(event, "id");
  const { rowCount } = await client.query("DELETE FROM skills WHERE id = $1", [id]);
  if (rowCount === 0) {
    throw createError({ statusCode: 404, statusMessage: "Skill not found" });
  }
  return { success: true };
});
