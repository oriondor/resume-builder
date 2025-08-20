<script setup lang="ts">
  interface Props {
    icon?: string;
    text?: string;
    size?: "small" | "medium" | "large";
  }
  const props = withDefaults(defineProps<Props>(), {
    size: "medium",
  });
  defineEmits(["click"]);

  const iconSize = computed(() => {
    switch (props.size) {
      case "small":
        return "2rem";
      case "large":
        return "5rem";
      default:
        return "3rem";
    }
  });
</script>
<template>
  <div class="dashed-container gradient-hover" @click="$emit('click')">
    <!-- <slot name="content"> -->
    <Icon v-if="icon" :name="icon" class="icon-class" :size="iconSize" />
    <view-text v-if="text" class="text-class" :size>{{ text }}</view-text>
    <!-- </slot> -->
  </div>
</template>

<style scoped lang="scss">
  .dashed-container {
    cursor: pointer;
    border: 3px dashed var(--color-border);
    border-radius: 4px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .icon-class {
    color: var(--color-muted);
  }
  .text-class {
    color: var(--color-text);
  }
</style>
