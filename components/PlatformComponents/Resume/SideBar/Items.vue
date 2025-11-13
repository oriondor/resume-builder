<script setup lang="ts">
  interface Props {
    sectionCollapsed: Boolean;
  }
  defineProps<Props>();

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

  function firstFieldContent(item: any) {
    return Object.values(item)[0] || "";
  }
</script>

<template>
  <div class="items">
    <template v-for="(item, index) in options" :key="item.index">
      <transition name="animate-fade" mode="out-in">
        <div v-if="!sectionCollapsed" class="item" @dblclick="expand(index)">
          <Icon
            :name="expandedIndex === index ? 'line-md:chevron-up' : 'line-md:chevron-down'"
            class="icon"
            @click="expand(index)"
          />
          <div>
            <slot :collapsed="expandedIndex !== index" :item :index />
            <helper-button
              v-if="expandedIndex === index"
              icon="material-symbols:delete-rounded"
              @click="removeItem(item.index)"
            >
              Remove item
            </helper-button>
          </div>
        </div>
        <div v-else>
          <view-text>{{ firstFieldContent(item) }}</view-text>
        </div>
      </transition>
      <view-separator margin="0.5" />
    </template>
  </div>
</template>

<style scoped lang="scss">
  .item {
    display: flex;
    justify-content: flex-start;

    > div {
      flex-direction: column;
    }
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
