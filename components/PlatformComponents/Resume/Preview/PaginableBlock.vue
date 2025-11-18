<script setup lang="ts">
  import type { BlockWidth } from "~/types/templates";

  interface Props {
    width?: BlockWidth;
  }

  export interface PaginableBlockExposeProps {
    el: Ref<HTMLElement | null>;
    children: ComputedRef<
      {
        child: Element;
        rect: DOMRect;
      }[]
    >;
    height: ComputedRef<number>;
  }

  const props = withDefaults(defineProps<Props>(), {
    width: "1",
  });
  const { width } = toRefs(props);

  const computedWidth = computed(() => {
    const defaultReturn = "100%";

    if (!width.value) return defaultReturn;

    if (width.value.includes("/")) {
      const [num, den] = width.value.split("/").map(Number);
      if (!num || !den) return defaultReturn;
      return `${(num / den) * 100}%`;
    }

    return width.value;
  });

  const el = ref<HTMLElement | null>(null);

  const children = computed(() => {
    if (!el.value) return [];
    const filteredChildren = [];
    for (const child of el.value.children) {
      if (!child.classList.value.includes("title-section")) {
        filteredChildren.push({
          child,
          rect: child.getBoundingClientRect(),
        });
      }
    }
    return filteredChildren;
  });

  const height = computed(() =>
    children.value.reduce((acc, child) => {
      acc += child.rect.height;
      return acc;
    }, 0)
  );

  defineExpose<PaginableBlockExposeProps>({ el, children, height });
</script>

<template>
  <div class="paginable-block" ref="el" v-bind="$attrs">
    <slot />
  </div>
</template>

<style scoped>
  .paginable-block {
    width: v-bind(computedWidth);
  }

  .paginable-block div {
    /* make each block a measuring unit for pagination */
    break-inside: avoid;
  }
</style>
