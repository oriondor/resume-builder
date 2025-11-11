/**
 * A `Template` describes how a resume or document layout should be rendered.
 * It defines the structure of sections, their display width, and field configurations.
 *
 * ---
 * ## Overview
 * Each template includes:
 * - **name** – A human-readable name for the template.
 * - **description** – A short description for context.
 * - **config** – A mapping of section names to their individual `SectionConfig` objects.
 *
 * ---
 * ## Section Configuration
 * Each section within `config` specifies:
 * - **title** – The section title (e.g. “Experience”).
 * - **width** – A layout width (e.g. `"1"`, `"1/2"`, `"2/3"`, `"100%"`).
 * - **fields** – A mapping of field names to `CustomSectionFieldConfig` objects.
 *
 * ---
 * ## Field Configuration
 * Each field in `fields` includes:
 * - **component** – A field component type (e.g. `"text"`, `"multiselect"`, `"date-range"`).
 * - **attrs** – UI attributes like `label` and `placeholder`.
 * - **type** *(optional)* – A text-style variant such as `"title"`, `"subtitle"`, `"italics"`, or a custom string.
 * - **order** – Display order of the field within the section.
 *
 * ---
 * ## Example 1: Simple layout
 * {
 *   name: "Example Template",
 *   description: "Very simple template",
 *   config: {
 *     experience: {
 *       title: "Experience",
 *       width: "1",
 *       fields: {
 *         company: {
 *           component: "text",
 *           attrs: {
 *             label: "Company Name",
 *             placeholder: "Enter company name"
 *           },
 *           type: "title",
 *           order: 0
 *         },
 *         period: {
 *           component: "date-range",
 *           attrs: {
 *             label: "Period",
 *             placeholder: "Select range"
 *           },
 *           order: 1
 *         }
 *       }
 *     },
 *     skills: {
 *       title: "Skills",
 *       width: "1/2",
 *       fields: {
 *         skills: {
 *           component: "multiselect",
 *           attrs: {
 *             label: "Skills",
 *             placeholder: "Add or select skills"
 *           },
 *           order: 0
 *         }
 *       }
 *     },
 *     softSkills: {
 *       title: "Soft Skills",
 *       width: "1/2",
 *       fields: {
 *         softSkills: {
 *           component: "multiselect",
 *           attrs: {
 *             label: "Soft Skills",
 *             placeholder: "Add or select soft skills"
 *           },
 *           order: 0
 *         }
 *       }
 *     }
 *   }
 * }
 *
 * This produces two full-width sections (“Experience”) and a row with two half-width sections (“Skills” and “Soft Skills”).
 *
 * ---
 * ## Example 2: Mixed widths and custom field types
 * {
 *   name: "Advanced Template",
 *   description: "Example with mixed widths and custom text sections",
 *   config: {
 *     experience: { title: "Experience", width: "1", fields: { ... } },
 *     education: { title: "Education", width: "1", fields: { ... } },
 *     skills: { title: "Skills", width: "1/3", fields: { ... } },
 *     softSkills: {
 *       title: "Soft Skills",
 *       width: "2/3",
 *       fields: {
 *         softSkills: {
 *           component: "text",
 *           attrs: {
 *             label: "Custom Text Section",
 *             placeholder: "Write freely here"
 *           },
 *           type: "italics",
 *           order: 0
 *         }
 *       }
 *     }
 *   }
 * }
 *
 * This layout produces 2 full-width sections and one row with a 1/3 + 2/3 split.
 * The `softSkills` section behaves as a custom text area due to `component: "text"` and `type: "custom-text"`.
 */

// The name that LLM returns back and it should match the component name
export type SectionName =
  | "experience"
  | "education"
  | "skills"
  | "interests"
  | "languages"
  | string;
export type BlockWidth = `${number}/${number}` | `${number}` | `${number}%`;

export interface SectionConfig {
  title: string;
  width: BlockWidth;
  fields: Record<string, CustomSectionFieldConfig>;
}

export type TemplateConfig = Record<SectionName, SectionConfig>;

export interface Template {
  id?: string;
  name: string;
  description: string;
  config: TemplateConfig;
}

export interface ComponentAttributes {
  label: string;
  placeholder: string;
}

export type CustomSectionFieldType = "text" | "title" | "subtitle" | "italics" | string;

export interface CustomSectionFieldConfig {
  component: CustomSectionFieldComponent;
  attrs: ComponentAttributes;
  type?: CustomSectionFieldType;
  order: number;
}

export type CustomSectionFieldComponent =
  | "text"
  | "textarea"
  | "date"
  | "date-range"
  | "checkbox"
  | "select"
  | "multiselect";
