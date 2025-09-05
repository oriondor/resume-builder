<script setup lang="ts">
  interface Props {
    title?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    title: "New section",
  });

  const collapsed = ref(true);
</script>

<template>
  <div class="section">
    <div class="section-header">
      <view-text type="title" class="header-title">
        <slot name="title">
          {{ title }}
        </slot>
      </view-text>
      <Icon
        class="icon"
        :name="collapsed ? 'line-md:chevron-down' : 'line-md:chevron-up'"
        @click="collapsed = !collapsed"
      />
    </div>
    <Transition name="animate-fade-slide" mode="out-in">
      <div v-if="!collapsed" key="expanded" class="content">
        <slot name="content" />
      </div>
      <div v-else key="collapsed" class="content-collapsed">
        <slot name="content-collapsed" />
      </div>
    </Transition>

    <div class="section-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .section {
    padding: 1rem;
    background-color: var(--color-surface);
    border-radius: 4px;

    .section-header {
      display: flex;
      justify-content: space-between;

      .icon {
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>
