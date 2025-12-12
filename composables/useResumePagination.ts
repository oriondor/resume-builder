import type { ShallowRef } from "vue";

export function useResumePagination(sections: Readonly<ShallowRef<any[] | null, any[] | null>>) {
  const currentPage = ref(0);

  const MM_TO_PX = 96 / 25.4; // TODO: Improve depending on dpi or maybe that will be unnecessary because it will be limited inside the block

  const pageHeightPx = computed(() => 297 * MM_TO_PX);

  const visibleIndices = computed(() => {
    let cummulativeHeight = 0;
    // Array of amounts of items per section
    return sections.value?.reduce((acc, section) => {
      const indicesPerSection: number[] = [];
      section.itemsHeights?.forEach((item: number, index: number) => {
        cummulativeHeight += item;
        if (
          cummulativeHeight > pageHeightPx.value * currentPage.value &&
          cummulativeHeight < pageHeightPx.value * (currentPage.value + 1)
        ) {
          indicesPerSection.push(index);
        }
      });
      acc.push(indicesPerSection);

      return acc;
    }, []);
  });

  return { visibleIndices };
}
