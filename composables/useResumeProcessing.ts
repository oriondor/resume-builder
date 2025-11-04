import type { AIResume, Resume } from "~/types/resume";
import type { TemplateConfig } from "~/types/templates";

/**
 * This composable is used for preprocessing resume that arrived from LLM
 *
 * Case 1:
 * Sometimes it can be that LLM found some tags that are still not in the global DB
 * LLM will return any tag object as plain array;
 * in this case before showing CV we need to add these tags to DB
 * Additionally, LLM can find already existing tags, in this case, to prevent duplicates
 * it should return existing objects
 */
export function useResumeProcessing() {
  /**
   * Converts ExpectedPayload into ModifiedPayload
   */
  function modifyPayload(payload: ExpectedPayload): ModifiedPayload | undefined {
    const resumeData = payload.resume;
    if (!resumeData) throw new Error(payload.resume.error);
    return {
      resume: resumeData,
      config: payload.config,
    };
  }

  /**
   * Processes tags: ensures tags from the resume exist in DB.
   * Adds missing tags via `createTag`, reuses existing ones otherwise.
   *
   * @param payload Resume + Config from LLM
   * @returns Config + Resume with tags normalized against DB
   */
  async function processTags({
    resume,
    config,
  }: ModifiedPayload): Promise<ModifiedPayload | undefined> {
    const resumeData = { ...resume };
    const tagCategories = getTagCategories(config);

    for (const category of tagCategories) {
      const { tags, refresh, createTag } = useTags(category);
      await refresh();
      const existingTagNames = tags.value.map(({ name }) => name);

      if (!resumeData[category]?.items?.length) continue;

      const uniqueTags = [...new Set(resumeData[category].items as string[])];

      // Ensure all tags are in DB
      resumeData[category].items = await Promise.all(
        uniqueTags.map(async (tag) => {
          const index = existingTagNames.findIndex((existingTag) => existingTag === tag);
          return index === -1 ? await createTag(tag) : tags.value[index];
        })
      );
    }
    return { config, resume: resumeData } as unknown as ModifiedPayload;
  }

  /**
   * Function goes through every config section and returns
   * list of section names that need to use tag component
   */
  function getTagCategories(config: TemplateConfig): (keyof AIResume)[] {
    return Object.values(config).flatMap((section) =>
      Object.entries(section.fields)
        .filter(([_, field]) => field.component === "multiselect")
        .map(([name, _]) => name as keyof AIResume)
    );
  }

  /**
   * In the future any other check should be added here as well
   * @param resume Resume coming after LLM analyse
   * @returns Resume
   */
  async function processResume(
    initialPayload: ExpectedPayload
  ): Promise<ModifiedPayload | undefined> {
    let current = modifyPayload(initialPayload);

    // Add process funtions into the array below to process different sections of resume
    for (const fn of [processTags]) {
      try {
        const result = await fn(current as ModifiedPayload);

        if (result) {
          // merge in case function returns only partial update
          current = { ...current, ...result };
        }
      } catch (error) {
        console.warn(`[processResume] Skipped processor ${fn.name}:`, error);
        // optionally: continue anyway
      }
    }

    return current;
  }

  return { processResume };
}
