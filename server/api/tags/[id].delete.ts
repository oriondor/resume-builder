export default defineEventHandler(async (event) => {
  const client = event.context.pg;
  const id = getRouterParam(event, "id");
  const { rowCount } = await client.query("DELETE FROM tags WHERE id = $1", [id]);
  if (rowCount === 0) {
    throw createError({ statusCode: 404, statusMessage: "Tag not found" });
  }
  return { success: true };
});
