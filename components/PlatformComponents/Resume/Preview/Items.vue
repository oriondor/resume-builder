<script setup lang="ts">
  import { type PaginableBlockExposeProps } from "./PaginableBlock.vue";

  interface Props {
    itemsToShow?: number[];
    measureMode?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    itemsToShow: () => [],
    measureMode: false,
  });

  const items = useTemplateRef<PaginableBlockExposeProps[]>("item");

  const options = defineModel<any[]>("options", { default: [] });

  const itemsHeights = computed(() =>
    items.value?.map((item) => {
      if (!item.el) return item.height;

      const itemStyle = window.getComputedStyle(item.el);
      return item.height + parseFloat(itemStyle.marginBlockEnd);
    })
  );

  defineExpose({ itemsHeights });
</script>

<template>
  <div class="items">
    <template v-for="(item, index) in options" :key="item.index">
      <preview-paginable-block
        v-if="measureMode || itemsToShow.includes(index)"
        class="item"
        ref="item"
        @dblclick=""
      >
        <slot :item :index />
      </preview-paginable-block>
    </template>
  </div>
</template>

<style scoped lang="scss">
  .items {
    display: flex;
    flex-direction: column;
  }
  .item {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    &:not(:last-child) {
      margin-block-end: 0.5rem;
    }
  }

  @media print {
    .item {
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
</style>
