import type { Resume } from "~/types/resume";
import type { TemplateConfig } from "~/types/templates";

export function useFetchSections(config: Ref<TemplateConfig>) {
  // we exclude personal info here since we want to style it in many other ways
  const sectionNames = computed(
    () =>
      Object.keys(config.value).filter(
        (name) => name !== "personalInformation" && config.value[name]
      ) as (keyof Resume)[]
  );
  return { sectionNames };
}
