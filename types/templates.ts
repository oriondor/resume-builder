/**
 * For now it's super simple, but the idea is that template config
 * has section name and section config
 * SectionConfig at the same time is set of rules for each specific section
 *
 * for example, Template could look like:
 * {
 *    name: 'Example template',
 *    description: 'Very simple template',
 *    config: {
 *      experience: {
 *        width: '1',
 *      },
 *      education: {
 *        width: '1',
 *      },
 *      skills: {
 *        width: '1/2',
 *      },
 *      softSkills: {
 *        width: '1/2',
 *      },
 *    },
 * }
 * in this case there are going to be 2 full width sections and 2 sections in the same row
 *
 * Another example
 *  * {
 *    name: 'Example template',
 *    description: 'Very simple template',
 *    config: {
 *      experience: {
 *        width: '1',
 *      },
 *      education: {
 *        width: '1',
 *      },
 *      skills: {
 *        width: '1/3',
 *      },
 *      softSkills: {
 *        width: '2/3',
 *        customType: 'text',
 *      },
 *    },
 * }
 * should also produce 2 sections in the same row in the end, but softSkills(custom-text) could be a text section
 * and (custom-text) will mean that user selected it to be custom text section
 *
 * TODO: Think what other custom sections there could be and how to determine fields in these sections
 * */

export type TemplateConfig = Record<SectionName, SectionConfig>;
export interface SectionConfig {
  width: BlockWidth;
  customType?: CustomSectionType;
  fields?: CustomSectionField[];
}

export interface Template {
  id?: string;
  name: string;
  description: string;
  config: TemplateConfig;
}

export type SectionName =
  | "experience"
  | "education"
  | "skills"
  | "interests"
  | "personal-projects"
  | string;
export type BlockWidth = `${number}/${number}` | `${number}` | `${number}%`;
export type CustomSectionType = "text" | "image" | "tag";
export interface CustomSectionField {
  type: CustomSectionFieldType;
  order: number;
}
export type CustomSectionFieldType = "text" | "subtext" | "date" | "date-range" | "checkbox";
