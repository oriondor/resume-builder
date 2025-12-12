import type { ShallowRef } from "vue";

export function useResumePagination(sections: Readonly<ShallowRef<any[] | null, any[] | null>>) {
  const currentPage = ref(0);

  const MM_TO_PX = 96 / 25.4; // Standard conversion for 96 DPI

  const pageHeightPx = computed(() => 297 * MM_TO_PX);

  // Calculate which items belong to which page, respecting item boundaries
  const itemPageAssignments = computed(() => {
    if (!sections.value) {
      return { assignments: [], totalPages: 1 };
    }

    const assignments: number[][][] = []; // [page][section][itemIndices]
    let currentPageNum = 0;
    let currentPageHeight = 0;

    // Initialize first page
    assignments[currentPageNum] = [];

    sections.value.forEach((section, sectionIndex) => {
      if (!assignments[currentPageNum][sectionIndex]) {
        assignments[currentPageNum][sectionIndex] = [];
      }

      // Skip sections with no itemsHeights
      if (!section.itemsHeights || section.itemsHeights.length === 0) {
        return;
      }

      section.itemsHeights.forEach((itemHeight: number, itemIndex: number) => {
        // Check if this item fits on the current page
        if (currentPageHeight + itemHeight <= pageHeightPx.value) {
          // Item fits on current page
          assignments[currentPageNum][sectionIndex].push(itemIndex);
          currentPageHeight += itemHeight;
        } else {
          // Item doesn't fit, move to next page
          currentPageNum++;
          currentPageHeight = itemHeight;

          if (!assignments[currentPageNum]) {
            assignments[currentPageNum] = [];
          }
          if (!assignments[currentPageNum][sectionIndex]) {
            assignments[currentPageNum][sectionIndex] = [];
          }

          assignments[currentPageNum][sectionIndex].push(itemIndex);
        }
      });
    });

    return {
      assignments,
      totalPages: assignments.length,
    };
  });

  const totalPages = computed(() => itemPageAssignments.value.totalPages);

  // Get all page assignments (for rendering multiple pages in print)
  const allPageAssignments = computed(() => {
    if (!sections.value) return [];

    return itemPageAssignments.value.assignments.map((pageAssignment) => {
      return sections.value.map((_, sectionIndex) => {
        return pageAssignment[sectionIndex] || [];
      });
    });
  });

  // Get visible items for current page only
  const visibleIndices = computed(() => {
    return allPageAssignments.value[currentPage.value] || [];
  });

  const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 0) {
      currentPage.value--;
    }
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages.value) {
      currentPage.value = page;
    }
  };

  return {
    currentPage: readonly(currentPage),
    totalPages,
    visibleIndices,
    allPageAssignments,
    nextPage,
    prevPage,
    goToPage,
  };
}
