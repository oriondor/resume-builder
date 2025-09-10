import type { AIResume, Resume, TagCategory } from "~/types/resume";

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
  const _tagCategories: TagCategory[] = ["skills", "interests"];

  /**
   * Processes tags: ensures tags from the resume exist in DB.
   * Adds missing tags via `createTag`, reuses existing ones otherwise.
   *
   * @param resume Resume from LLM
   * @returns Resume with tags normalized against DB
   */
  async function processTags(resume: AIResume): Promise<Resume> {
    for (const category of _tagCategories) {
      const { tags, refresh, createTag } = useTags(category);
      await refresh();
      const flatTags = tags.value.map(({ name }) => name);

      if (!resume[category]?.length) continue;

      const uniqueTags = [...new Set(resume[category])];
      // Ensure all tags are in DB
      resume[category] = await Promise.all(
        uniqueTags.map(async (tag) => {
          const index = flatTags.findIndex((existingTag) => existingTag === tag);
          console.log(flatTags, tag, index);

          return index === -1 ? await createTag(tag) : tags.value[index];
        })
      );
    }
    return resume as unknown as Resume;
  }

  /**
   * In the future any other check should be added here as well
   * @param resume Resume coming after LLM analyse
   * @returns Resume
   */
  async function processResume(resume: AIResume): Promise<Resume> {
    const processedResume = ref<Resume | null>(null);
    processedResume.value = await processTags(resume);
    // add additional checks here
    return processedResume.value as unknown as Resume;
  }

  return { processResume };
}
