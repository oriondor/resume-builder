export interface AIResume {
  fullName: string;
  title: string;
  shortSentence?: string;
  summary: string;
  contact: ContactItem;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  personalProjects: PersonalProjectsItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  interests: string[];
}

export interface Resume {
  fullName: string;
  title: string;
  shortSentence?: string;
  summary: string;
  contact: ContactItem;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  personalProjects: PersonalProjectsItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  interests: InterestItem[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  companyDescription?: string;
  startDate: string;
  endDate: string | null;
  description: string;
  index: number;
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  dateFinished: string;
  description: string;
  index: number;
}

export interface PersonalProjectsItem {
  title: string;
  startDate: string;
  endDate: string | null;
  index: number;
}
export interface CertificationItem {
  title: string;
  startDate: string;
  endDate: string | null;
  index: number;
}

export interface LanguageItem {
  name: string;
  level:
    | "Conversational"
    | "Working proficiency"
    | "Full Professional Proficiency"
    | "Native or Bilingual Proficiency";
  index: number;
}

export interface ContactItem {
  email: string;
  phones: string[];
  address: string;
}

export interface SkillItem {
  id?: string;
  name: string;
  created_at: string;
}

export interface InterestItem {
  id?: string;
  name: string;
  created_at: string;
}

export type TagCategory = "skills" | "interests";
