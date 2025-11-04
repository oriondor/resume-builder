import type { Resume } from "~/types/resume";

export function useResume() {
  const resume = useSessionStorage<Resume>("resume", {
    personalInformation: {
      title: "Persona information",
      items: [],
    },
    experience: { title: "Experience", items: [] },
    education: { title: "Education", items: [] },
    personalProjects: { title: "Projects", items: [] },
    languages: { title: "Languages", items: [] },
    skills: { title: "Skills", items: [] },
    certifications: { title: "Certifications", items: [] },
    interests: { title: "Interests", items: [] },
  });

  return {
    resume,
  };
}
