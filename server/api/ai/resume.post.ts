import OpenAI, { toFile } from "openai";
import { resumeTemplate } from "./resumeTemplate";
import { configRules } from "./configRules";

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
        If it is, return valid JSON like this:

        ${resumeTemplate}

        ---

        and it also should generate a proper config

        ${configRules}

        ---

        If you think some categories are missing, or you see additional relevant information, add it in a logical way.
        Please, for dates, use ISO date format; also if you see 'present' - put null into a date value
        
        You can see the title key for every section. Ideally, it should correspond to the section name from old resume

        ---
        Output requirements:

        - Return only valid, minified JSON (no Markdown, no code fences, no explanations).
        - Do not wrap the JSON in quotes.
        - Do not include escape characters such as "\\n" or "\\t".
        - The top-level structure must be:
          {
            "resume": { ... },
            "config": { ... }
          }
        - Do not return text before or after the JSON.
    `;

  const resp = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_file", file_id: uploaded.id },
          { type: "input_text", text: prompt },
        ],
      },
    ],
    text: { format: { type: "json_object" } },
  });

  // 3) Return JSON back to the client
  let data: unknown = resp.output_text;
  try {
    data = JSON.parse(resp.output_text ?? "{}");
    console.log(data);
  } catch {}
  return { data, fileId: uploaded.id };
});
