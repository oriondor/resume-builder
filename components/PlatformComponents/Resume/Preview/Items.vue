<script setup lang="ts">
  import { type PaginableBlockExposeProps } from "./PaginableBlock.vue";

  const items = useTemplateRef<PaginableBlockExposeProps[]>("item");

  const options = defineModel<any[]>("options", { default: [] });

  const totalHeight = computed(() =>
    items.value?.reduce((acc, item) => (acc += item.height.value), 0)
  );

  defineExpose({ totalHeight });
</script>

<template>
  <div class="items">
    <template v-for="(item, index) in options" :key="item.index">
      <preview-paginable-block class="item" ref="item" @dblclick="">
        <slot :item :index />
      </preview-paginable-block>
    </template>
  </div>
</template>

<style scoped lang="scss">
  .items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .item {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
</style>
