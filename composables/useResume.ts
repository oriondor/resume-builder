export interface Resume {
  fullName: string;
  title: string;
  shortSentence?: string;
  summary: string;
  contact: ContactItem;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
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
  year: string;
  index: number;
}

export interface ContactItem {
  email: string;
  phones: string[];
  address: string;
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
    skills: [],
  });

  const defaultExperience = {
    company: "",
    role: "",
    companyDescription: undefined,
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const defaultEducation = {
    institution: "",
    degree: "",
    year: "",
  };

  function addExperience() {
    resume.value.experience.push({ ...defaultExperience, index: resume.value.experience.length });
  }

  function addEducation() {
    resume.value.education.push({ ...defaultEducation, index: resume.value.education.length });
  }

  return {
    resume,
    defaultExperience,
    defaultEducation,
    addExperience,
    addEducation,
  };
}
