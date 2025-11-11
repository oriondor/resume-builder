export interface SectionItem<T> {
  title: string;
  items: T[];
}

export interface PersonalInformation {
  fullName: string;
  title: string;
  shortSentence?: string;
  summary: string;
  contact: ContactItem;
}

export interface AIResume {
  personalInformation: SectionItem<PersonalInformation>;
  experience: SectionItem<ExperienceItem>;
  education: SectionItem<EducationItem>;
  skills: SectionItem<string>;
  personalProjects: SectionItem<PersonalProjectsItem>;
  languages: SectionItem<LanguageItem>;
  certifications: SectionItem<CertificationItem>;
  interests: SectionItem<string>;
}

export interface Resume {
  personalInformation: SectionItem<PersonalInformation>;
  experience: SectionItem<ExperienceItem>;
  education: SectionItem<EducationItem>;
  skills: SectionItem<SkillItem>;
  personalProjects: SectionItem<PersonalProjectsItem>;
  languages: SectionItem<LanguageItem>;
  certifications: SectionItem<CertificationItem>;
  interests: SectionItem<InterestItem>;
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
