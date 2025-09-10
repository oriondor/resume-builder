import type { Resume } from "~/types/resume";

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

  function removeItem(object: any[], index: number) {
    const objectIndex = object.findIndex((item) => item.index === index);
    object.splice(objectIndex, 1);
    object.forEach((item, index) => ({ ...item, index }));
  }

  return {
    resume,
    removeItem,
  };
}
