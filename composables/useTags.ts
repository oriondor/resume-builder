import type { Tag, TagStyle } from "~/types/tags";

export function useTags(identifier: string) {
  const {
    data: tags,
    pending,
    error,
    refresh,
  } = useAsyncData<Tag[]>(
    `tags:${unref(identifier)}`,
    () =>
      useApi<Tag[]>("/api/tags", {
        query: { identifier: unref(identifier) },
      }),
    {
      default: () => [],
      server: false,
    }
  );

  async function createTag(name: string) {
    return await useApi("/api/tags", {
      method: "POST",
      body: { identifier: unref(identifier), name },
    });
  }

  async function renameTag(id: string, name: string) {
    return await useApi(`/api/tags/${id}`, {
      method: "PUT",
      body: { name },
    });
  }

  async function removeTag(id: string) {
    return await useApi(`/api/tags/${id}`, {
      method: "DELETE",
    });
  }

  const tagStyles: TagStyle[] = ["neutral", "accent"];

  return { tags, pending, error, refresh, createTag, renameTag, removeTag, tagStyles };
}
