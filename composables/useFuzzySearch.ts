import { useFuse, type FuseOptions } from "@vueuse/integrations/useFuse";

/**
 * Search using useFuze
 * @param data
 * @param search
 * @param options i.e { keys: ['name'] }
 */
export function useFuzzySearch(
  dataSource: MaybeRef<string[]>,
  search: MaybeRef<string>
): ReturnType<typeof useFuse>;

export function useFuzzySearch<T extends object>(
  dataSource: MaybeRef<T[]>,
  search: MaybeRef<string>,
  options: FuseOptions<T>
): ReturnType<typeof useFuse>;

export function useFuzzySearch<T extends object>(
  dataSource: MaybeRef<string[] | T[]>,
  search: MaybeRef<string>,
  options?: FuseOptions<T>
) {
  const data = unref(dataSource);

  if (typeof data[0] === "string") {
    const wrapped = (data as string[]).map((str) => ({ value: str }));
    const { results } = useFuse(search, wrapped, {
      fuseOptions: { keys: ["value"] },
      matchAllWhenSearchEmpty: true,
    });
    const items = computed(() => results.value.map(({ item }) => item));
    return items;
  } else {
    const { results } = useFuse(search, data as T[], {
      fuseOptions: options,
      matchAllWhenSearchEmpty: true,
    });
    const items = computed(() => results.value.map(({ item }) => item));
    return items;
  }
}
