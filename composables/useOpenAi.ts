import type { AIResume, Resume } from "~/types/resume";
import type { TemplateConfig } from "~/types/templates";

export interface ExpectedResume extends AIResume {
  error?: string;
}

export interface ExpectedPayload {
  resume: ExpectedResume;
  config: TemplateConfig;
}

export interface ModifiedPayload {
  resume: Resume | AIResume;
  config: TemplateConfig;
}

export function useOpenAi() {
  async function uploadResume(file: File) {
    const form = new FormData();
    form.append("file", file); // name must match server route

    return await $fetch<{ data: ExpectedPayload }>("/api/ai/resume", {
      method: "POST",
      body: form,
    });
  }

  return { uploadResume };
}
