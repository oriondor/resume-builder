// server/api/tags/[id].put.ts
export default defineEventHandler(async (event) => {
  const client = event.context.pg;
  const id = getRouterParam(event, "id");
  const body = await readBody<{ name?: string; identifier?: string }>(event);

  if (!body?.name && !body?.identifier) {
    throw createError({ statusCode: 400, statusMessage: "Nothing to update" });
  }

  const updates: string[] = [];
  const values: any[] = [];
  if (body.identifier) {
    updates.push(`identifier = $${updates.length + 1}`);
    values.push(body.identifier);
  }
  if (body.name) {
    updates.push(`name = $${updates.length + 1}`);
    values.push(body.name);
  }
  values.push(id);

  const { rows } = await client.query(
    `UPDATE tags SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING *`,
    values
  );
  if (rows.length === 0) {
    throw createError({ statusCode: 404, statusMessage: "Tag not found" });
  }
  return rows[0];
});
