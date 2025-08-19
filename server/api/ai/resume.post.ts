import OpenAI, { toFile } from "openai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (!config.openaiApiKey) {
    throw createError({ statusCode: 500, statusMessage: "OPENAI key missing" });
  }

  // accept multipart/form-data from the browser
  const form = await readMultipartFormData(event);
  const filePart = form?.find((p) => p.name === "file" && p.filename);
  if (!filePart) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
  }

  const client = new OpenAI({ apiKey: config.openaiApiKey });

  // 1) Upload file for direct model input (purpose: user_data)
  const uploaded = await client.files.create({
    file: await toFile(filePart.data, filePart.filename!, { type: filePart.type }),
    purpose: "user_data",
  });

  // 2) Ask the model, referencing the file as an input_file
  const prompt = `Determine if this is a resume. If not, reply exactly: {"error": "This file is not a resume"}.
        If it is, return strictly valid JSON:
        {
        "name": "",
        "contact": { "email": "", "phones": [], "address": "" },
        "summary": "",
        "experience": [
            { "company": "", "position": "", "startDate": "", "endDate": "", "description": "" }
        ],
        "education": [
            { "institution": "", "degree": "", "startDate": "", "endDate": "" }
        ],
        "skills": []
        }
    `;

  const resp = await client.responses.create({
    model: "gpt-5-nano",
    input: [
      {
        role: "user",
        content: [
          { type: "input_file", file_id: uploaded.id },
          { type: "input_text", text: prompt },
        ],
      },
    ],
    // text: { format: "json" }, // ← replaces old response_format
  });

  // 3) Return JSON back to the client
  let data: unknown = resp.output_text;
  try {
    data = JSON.parse(resp.output_text ?? "{}");
  } catch {}
  return { data, fileId: uploaded.id };
});
