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

  function isTagItem(item: unknown): item is { id: string; name: string; identifier: string } {
    return (
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      "name" in item &&
      "identifier" in item
    );
  }
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
      <template v-if="isTagItem(content.items[0])">
        <side-bar-field
          v-model="content.items"
          :collapsed
          :field-config="Object.values(config.fields)[0]"
        />
      </template>
      <template v-else>
        <side-bar-items v-model:options="content.items" v-slot="{ collapsed, item, index }">
          <div>
            <side-bar-field
              v-for="[name, _] in Object.entries(item)"
              :key="name"
              v-model="content.items[index][name]"
              :collapsed
              :field-config="config.fields[name]"
            />
          </div>
        </side-bar-items>
      </template>
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
        width: 1.5rem;
        height: 1.5rem;
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>
