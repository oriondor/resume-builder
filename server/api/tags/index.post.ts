// server/api/tags/index.post.ts
export default defineEventHandler(async (event) => {
  const client = event.context.pg;
  const body = await readBody<{ name?: string; identifier?: string }>(event);

  if (!body?.name || !body?.identifier) {
    throw createError({ statusCode: 400, statusMessage: "Missing name or identifier" });
  }

  const { rows } = await client.query(
    `INSERT INTO tags (identifier, name) VALUES ($1, $2) RETURNING *`,
    [body.identifier, body.name]
  );
  return rows[0];
});
