import type { Tag } from "~/types/tags";

export function useTags(identifier: string) {
  const key = computed(() => `tags:${unref(identifier)}`);

  const {
    data: tags,
    pending,
    error,
    refresh,
  } = useFetch<Tag[]>("/api/tags", {
    key,
    query: computed(() => ({ identifier: unref(identifier) })),
    default: () => [],
    server: false,
  });

  async function createTag(name: string) {
    return await $fetch("/api/tags", { method: "POST", body: { identifier, name } });
  }

  async function renameTag(id: string, name: string) {
    return await $fetch(`/api/tags/${id}`, { method: "PUT", body: { name } });
  }

  async function removeTag(id: string) {
    return await $fetch(`/api/tags/${id}`, { method: "DELETE" });
  }

  return { tags, refresh, createTag, renameTag, removeTag };
}
