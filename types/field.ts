import type { Tag, TagStyle } from "./tags";
import type { CustomSectionFieldType } from "./templates";

export interface FieldProps {
  name: string;
  collapsed: Boolean;
  type?: CustomSectionFieldType;
  label?: String;
  placeholder?: String;
}

export interface SelectFieldProps extends FieldProps {
  modelValue: Tag | Tag[];
  variant?: TagStyle;
}
