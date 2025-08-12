<script setup lang="ts">
  const attrs = useAttrs();
  defineEmits<{
    (e: "click"): void;
  }>();
</script>

<template>
  <helper-control-element>
    <button v-bind="attrs" @click="$emit('click')">
      <slot />
    </button>
  </helper-control-element>
</template>

<style lang="scss" scoped>
  button {
    background-color: blue;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: darken(blue, 10%);
    }
  }
</style>
