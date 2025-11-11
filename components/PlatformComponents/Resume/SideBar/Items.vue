<script setup lang="ts">
  const options = defineModel<any[]>("options", { default: [] });

  const emit = defineEmits<{
    (event: "remove"): void;
  }>();

  const expandedIndex = ref<number | null>(null);

  function expand(index: number) {
    if (expandedIndex.value === index) {
      expandedIndex.value = null;
      return;
    }
    expandedIndex.value = index;
  }

  function removeItem(index: number) {
    // Just to make sure the index is the same
    const objectIndex = options.value.findIndex((item) => item.index === index);
    options.value.splice(objectIndex, 1);
    options.value.forEach((item, index) => ({ ...item, index }));
  }
</script>

<template>
  <div class="items">
    <template v-for="(item, index) in options" :key="item.index">
      <div class="item">
        <Icon
          :name="expandedIndex === index ? 'line-md:chevron-up' : 'line-md:chevron-down'"
          class="icon"
          @click="expand(index)"
        />
        <Transition name="animate-fade-slide" mode="out-in">
          <slot :collapsed="expandedIndex !== index" :item :index />
        </Transition>
        <Icon name="material-symbols:delete-rounded" class="icon" @click="removeItem(item.index)" />
      </div>
      <view-separator margin="0.5" />
    </template>
  </div>
</template>

<style scoped lang="scss">
  .item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    user-select: none;
  }

  .content {
    flex-grow: 1;
  }
</style>
