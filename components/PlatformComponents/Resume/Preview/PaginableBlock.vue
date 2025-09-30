<script setup lang="ts">
  import type { BlockWidth } from "~/types/templates";

  interface Props {
    width: BlockWidth;
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
  defineExpose({ el });
</script>

<template>
  <div class="paginable-block" ref="el">
    <slot />
  </div>
</template>

<style scoped>
  .paginable-block {
    /* make each block a measuring unit for pagination */
    break-inside: avoid;
    width: v-bind(computedWidth);
  }
</style>
