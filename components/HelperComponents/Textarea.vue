<script setup lang="ts">
  const attrs = useAttrs();
  defineEmits<{
    (e: "input", value: string): void;
  }>();

  const text = defineModel<string>({ default: "" });
</script>
<template>
  <helper-control-element>
    <textarea v-bind="attrs" v-model="text" rows="4" />
  </helper-control-element>
</template>
<style lang="scss" scoped>
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }
  textarea:focus {
    border-color: #007bff;
    outline: none;
  }
</style>
