export interface ExpectedResume {
  error?: string;
  data?: Resume;
}

export function useOpenAi() {
  async function uploadResume(file: File) {
    const form = new FormData();
    form.append("file", file); // name must match server route

    return await $fetch<ExpectedResume>("/api/ai/resume", {
      method: "POST",
      body: form,
    });
  }

  return { uploadResume };
}
