<script setup lang="ts">
  export interface SelectProps {
    options: string[];
    multiple?: boolean;
  }

  const props = defineProps<SelectProps>();

  const modelValue = defineModel<string | string[] | null | undefined>({
    required: true,
  });

  function toggleOption(option: string, toggle: () => void) {
    if (props.multiple) {
      if (Array.isArray(modelValue.value)) {
        const index = modelValue.value.indexOf(option);
        if (index > -1) {
          modelValue.value.splice(index, 1);
        } else {
          modelValue.value.push(option);
        }
      } else {
        modelValue.value = [option];
      }
    } else {
      modelValue.value = option;
      toggle();
    }
  }

  function isOptionSelected(option: string): boolean {
    if (props.multiple) {
      return Array.isArray(modelValue.value) && modelValue.value.includes(option);
    }
    return modelValue.value === option;
  }
</script>

<template>
  <helper-control-element>
    <helper-popover position="bottom-right">
      <template #default="{ toggle }">
        <slot name="trigger" :toggle>
          <div class="selector-trigger">
            <slot name="trigger-content">
              <div class="trigger-content">
                <slot name="trigger-label">
                  <template v-if="!props.multiple">
                    {{ modelValue || "Select an option" }}
                  </template>
                  <template v-else>
                    <span> {{ modelValue!.length }} selected </span>
                  </template>
                </slot>
              </div>
              <Icon name="mdi-light:chevron-down" />
            </slot>
          </div>
        </slot>
      </template>

      <template #content="{ toggle }">
        <div class="selector-content">
          <ul>
            <li
              v-for="option in options"
              :key="option"
              :class="{ selected: isOptionSelected(option) }"
              @click="toggleOption(option, toggle)"
            >
              <slot name="option" :option :toggle :selected="isOptionSelected(option)">
                {{ option }}
              </slot>
            </li>
          </ul>
        </div>
      </template>
    </helper-popover>
  </helper-control-element>
</template>

<style lang="scss" scoped>
  .selector-trigger {
    min-height: 1.5rem;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    font-size: 0.95rem;
    color: var(--color-text);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      border-color: var(--color-accent);
    }
    &:focus-within {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 2px var(--color-accent-soft);
    }
  }

  .selector-content {
    max-height: 20rem;
    overflow: auto;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    margin-top: 0.25rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 0.5rem 0.75rem;
        cursor: pointer;
        transition: background-color 0.15s ease;

        &:hover {
          background-color: var(--color-accent-soft);
        }

        &.selected {
          background-color: var(--color-accent-soft);
          color: var(--color-accent);
          font-weight: 500;
        }
      }
    }
  }
  :deep(.popover) {
    width: 100%;
  }
</style>
