export default defineEventHandler(async (event) => {
  const client = event.context.pg;
  const body = await readBody<{ name: string }>(event);

  if (!body?.name) {
    throw createError({ statusCode: 400, statusMessage: "Missing name" });
  }

  const { rows } = await client.query("INSERT INTO skills (name) VALUES ($1) RETURNING *", [
    body.name,
  ]);
  return rows[0];
});
