import type { AIResume, Resume } from "~/types/resume";
import type { TemplateConfig } from "~/types/templates";
import type { Tag } from "~/types/tags";

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
    const tagFields = getTagCategories(config); // e.g. ["skills", "tools", "technologies", ...]

    for (const fieldName of tagFields) {
      // Fetch existing tags for this field using useApi directly
      const tags = await useApi<Tag[]>("/api/tags", {
        query: { identifier: fieldName },
      });
      const existingTagNames = tags.map((t) => t.name);

      // Helper to create a new tag
      const createTag = async (name: string) => {
        return await useApi("/api/tags", {
          method: "POST",
          body: { identifier: fieldName, name },
        });
      };

      // Iterate over each section of resume (experience, education, skills, ...)
      for (const sectionKey of Object.keys(resumeData)) {
        const section = resumeData[sectionKey];
        if (!section?.items || !Array.isArray(section.items)) continue;

        const items = section.items;

        //
        // --------------------------
        // CASE A — items = string[]
        // --------------------------
        //
        if (Array.isArray(items) && items.every((i) => typeof i === "string")) {
          if (sectionKey === fieldName) {
            const uniqueTags = [...new Set(items as string[])];

            section.items = await Promise.all(
              uniqueTags.map(async (tag) => {
                const index = existingTagNames.indexOf(tag);
                return index === -1 ? await createTag(tag) : tags[index];
              })
            );
          }

          continue;
        }

        //
        // ------------------------------
        // CASE B — items = object[]
        // ------------------------------
        //
        for (const item of items) {
          // Skip if item is not an object
          if (typeof item !== "object" || item === null) continue;

          // Look for *any* key that matches the tag field name
          if (
            Array.isArray(item[fieldName]) &&
            item[fieldName].every((i) => typeof i === "string")
          ) {
            const arr = item[fieldName] as string[];
            const uniqueTags = [...new Set(arr)];

            item[fieldName] = await Promise.all(
              uniqueTags.map(async (tag) => {
                const index = existingTagNames.indexOf(tag);
                return index === -1 ? await createTag(tag) : tags[index];
              })
            );
          }
        }
      }
    }

    return { config, resume: resumeData };
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
