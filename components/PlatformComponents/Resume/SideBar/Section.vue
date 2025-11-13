<script setup lang="ts">
  import type { SectionItem } from "~/types/resume";
  import type { SectionConfig } from "~/types/templates";

  interface Props {
    title?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    title: "New section",
  });

  const content = defineModel<SectionItem<any>>("content", { required: true });
  const config = defineModel<SectionConfig>("config", { required: true });

  const collapsed = ref(true);

  function isTagItem(config: SectionConfig) {
    return Object.values(config.fields)[0]?.component === "multiselect";
  }

  const firstFieldPayload = computed(() => {
    const [name, fieldConfig] = Object.entries(config.value?.fields ?? {})[0] ?? [];
    return name ? { name, fieldConfig } : null;
  });
</script>

<template>
  <div class="section" @dblclick="collapsed = false">
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
    <template v-if="isTagItem(config)">
      <side-bar-field v-model="content.items" :collapsed v-bind="firstFieldPayload" />
    </template>
    <template v-else>
      <side-bar-items
        v-model:options="content.items"
        v-slot="{ collapsed: itemCollapsed, item, index }"
        :section-collapsed="collapsed"
      >
        <transition-group name="animate-fade-slide" appear mode="out-in">
          <side-bar-field
            v-for="[name, _] in Object.entries(item)"
            :key="name"
            :name
            v-model="content.items[index][name]"
            :collapsed="itemCollapsed"
            :field-config="config.fields[name]"
          />
        </transition-group>
      </side-bar-items>
    </template>

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
    user-select: none;

    .section-header {
      display: flex;
      justify-content: space-between;

      .icon {
        width: 1.5rem;
        height: 1.5rem;
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>
