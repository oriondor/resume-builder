import { pascalCase } from "change-case";
import type { CustomSectionFieldConfig } from "~/types/templates";

/**
 * Composable for fetching a field tag
 * Expected to be used widely on a side-bar and a resume preview
 *
 * @param fieldConfig reactive config
 * @returns correct component tag to use in <component>
 */
export function useFetchFields(fieldConfig: Ref<CustomSectionFieldConfig>) {
  const fields = import.meta.glob(
    "~/components/PlatformComponents/Resume/Fields/*.vue",
    { eager: true } // load all at once
  );

  // Normalize keys like "date-range" from "DateRange.vue"
  const componentTag = computed(() => {
    const componentName = fieldConfig.value?.component;
    if (!componentName) return null;

    const pascalName = pascalCase(componentName);

    const entry = Object.entries(fields).find(([path]) => path.endsWith(`${pascalName}.vue`));

    return entry ? (entry[1] as any).default : null;
  });

  return { fields, componentTag };
}
