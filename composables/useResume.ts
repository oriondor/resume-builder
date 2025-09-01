export interface Resume {
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

export function useResume() {
  const resume = useSessionStorage<Resume>("resume", {
    fullName: "",
    title: "",
    shortSentence: "",
    contact: { email: "", phones: [], address: "" },
    summary: "",
    experience: [],
    education: [],
    personalProjects: [],
    languages: [],
    skills: [],
    certifications: [],
    interests: [],
  });

  function sortedListByDate(object: any[]) {
    return computed<any[]>(() => {
      return object.sort(
        ({ startDate: a }, { startDate: b }) => new Date(b).getTime() - new Date(a).getTime()
      );
    });
  }

  const defaultExperience = {
    company: "",
    role: "",
    companyDescription: undefined,
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    index: 0,
  };

  const defaultEducation = {
    institution: "",
    degree: "",
    year: "",
    dateFinished: "",
    location: "",
    description: "",
    index: 0,
  };

  const defaultProject = {
    title: "",
    startDate: "",
    endDate: "",
    index: 0,
  };

  const defaultLanguage = {
    name: "English",
    level: "Conversational" as LanguageItem["level"],
    index: 0,
  };

  function addExperience() {
    resume.value.experience.push({ ...defaultExperience, index: resume.value.experience.length });
  }

  function addEducation() {
    resume.value.education.push({ ...defaultEducation, index: resume.value.education.length });
  }

  function removeItem(object: any[], index: number) {
    const objectIndex = object.findIndex((item) => item.index === index);
    object.splice(objectIndex, 1);
  }

  function addProject() {
    resume.value.personalProjects.push({
      ...defaultProject,
      index: resume.value.personalProjects.length,
    });
  }

  function addLanguage() {
    resume.value.languages.push({
      ...defaultLanguage,
      index: resume.value.languages.length,
    });
  }

  return {
    resume,
    sortedListByDate,
    removeItem,
    defaultExperience,
    defaultEducation,
    addExperience,
    addEducation,
    addProject,
    addLanguage,
  };
}
