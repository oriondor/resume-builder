export interface Tag {
  id: string;
  identifier: string; // used to select based on category: 'skill', 'interest', etc
  name: string;
  created_at: string;
}

export type TagStyle = "neutral" | "accent";
