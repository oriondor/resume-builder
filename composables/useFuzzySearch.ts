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
  // If options are provided, treat as object array; otherwise string array
  const isObjectArray = !!options;

  if (!isObjectArray) {
    // String array handling
    const wrappedData = computed(() => {
      const data = unref(dataSource) as string[];
      return data.map((str) => ({ value: str }));
    });

    const { results } = useFuse(search, wrappedData, {
      fuseOptions: { keys: ["value"] },
      matchAllWhenSearchEmpty: true,
    });

    return computed(() => results.value.map(({ item }) => item.value));
  } else {
    // Object array handling
    const { results } = useFuse(search, dataSource as MaybeRef<T[]>, {
      fuseOptions: options,
      matchAllWhenSearchEmpty: true,
    });

    return computed(() => results.value.map(({ item }) => item));
  }
}
