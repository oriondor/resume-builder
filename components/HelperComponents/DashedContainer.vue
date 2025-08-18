<script setup lang="ts">
  interface Props {
    icon?: string;
    text?: string;
  }
  defineProps<Props>();
  defineEmits(["click"]);
</script>
<template>
  <div class="dashed-container gradient-hover" @click="$emit('click')">
    <slot>
      <Icon v-if="icon" :name="icon" class="icon-class" size="5rem" />
      <h3 v-if="text" class="text-class">{{ text }}</h3>
    </slot>
  </div>
</template>

<style scoped lang="scss">
  .dashed-container {
    cursor: pointer;
    border: 3px dashed var(--color-border);
    border-radius: 4px;
    padding: 0;
    text-align: center;
  }
  .icon-class {
    color: var(--color-muted);
  }
  .text-class {
    color: var(--color-text);
  }
</style>
