<script setup lang="ts">
  import type { SectionItem } from "~/types/resume";
  import type { SectionConfig } from "~/types/templates";

  interface Props {
    title?: string;
    itemsToShow?: number[];
    measureMode?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    title: "Unnamed section",
    itemsToShow: () => [],
    measureMode: false,
  });

  const { itemsToShow, measureMode } = toRefs(props);

  const content = defineModel<SectionItem<any>>("content", { required: true });
  const config = defineModel<SectionConfig>("config", { required: true });

  const section = useTemplateRef("section");
  const header = useTemplateRef("header");
  const items = useTemplateRef("items");
  const item = useTemplateRef("item");

  function isTagItem(config: SectionConfig) {
    return Object.values(config.fields)[0]?.component === "multiselect";
  }

  const firstFieldPayload = computed(() => {
    const [name, fieldConfig] = Object.entries(config.value?.fields ?? {})[0] ?? [];
    return name ? { name, fieldConfig } : null;
  });

  const sectionMargins = computed(() => {
    if (!section.value) return null;
    const styles = window.getComputedStyle(section.value);
    return {
      top: parseFloat(styles.marginBlockStart) + parseFloat(styles.paddingBlockStart),
      bottom: parseFloat(styles.marginBlockEnd) + parseFloat(styles.paddingBlockEnd),
    };
  });

  const headerHeight = computed(() => header.value.height);

  const itemsHeights = computed(() => {
    const allItems = !isTagItem(config.value) ? items.value?.itemsHeights : [item.value?.height];

    // Merge header height into the first item
    if (allItems?.[0]) allItems[0] += headerHeight.value;
    // Add margins to first and second element of the section
    if (sectionMargins.value) {
      if (allItems?.[0]) allItems[0] += sectionMargins.value.top;
      if (allItems?.[-1]) allItems[-1] += sectionMargins.value.bottom;
    }

    return allItems;
  });
  defineExpose({ itemsHeights });
</script>

<template>
  <div ref="section" class="section" v-if="measureMode || itemsToShow.length > 0">
    <preview-paginable-block ref="header">
      <div v-if="itemsToShow?.includes(0)" class="section-header">
        <view-text type="title" size="large" class="header-title">
          <slot name="title">
            {{ title }}
          </slot>
        </view-text>
      </div>
    </preview-paginable-block>
    <template v-if="isTagItem(config) && (measureMode || itemsToShow.length > 0)">
      <preview-paginable-block class="item" ref="item" @dblclick="">
        <preview-field v-model="content.items" v-bind="firstFieldPayload" />
      </preview-paginable-block>
    </template>
    <template v-else>
      <preview-items
        v-model:options="content.items"
        v-slot="{ item, index }"
        ref="items"
        :items-to-show="itemsToShow"
        :measure-mode="measureMode"
      >
        <template v-for="[name, _] in Object.entries(item)" :key="name">
          <preview-field
            v-if="name !== 'index'"
            :name
            v-model="content.items[index][name]"
            :field-config="config.fields[name]"
          />
        </template>
      </preview-items>
    </template>
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
    }
  }

  @media print {
    .section {
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
</style>
