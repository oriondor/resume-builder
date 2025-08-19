<script setup lang="ts">
  const attrs = useAttrs();
</script>

<template>
  <helper-control-element>
    <span v-bind="attrs">
      <slot />
    </span>
  </helper-control-element>
</template>

<style lang="scss" scoped>
  span {
    font-size: 1rem;
    color: #333;
  }
</style>
