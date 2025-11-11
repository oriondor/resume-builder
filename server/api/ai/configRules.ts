export const configRules = `
Generate a "config" object (TemplateConfig) that describes how each section of the resume should be represented using editable UI components.

Schema:
{
  "<sectionName>": {
    "title": "string",
    "width": "number | number/number | number%",
    "fields": {
      "<fieldName>": {
        "component": "text" | "date" | "date-range" | "checkbox" | "select" | "multiselect" | "textarea",
        "attrs": {
          "label": "string",
          "placeholder": "string"
        },
        "type": "title" | "subtitle" | "italics" | string,
        "order": number
      }
    }
  }
}

Rules:

1. Each resume section (experience, education, skills, interests, personalProjects, languages, certifications, softSkills, etc.) must appear in the config with a matching key, there's no way config can have differently named fields compared to resume.

2. Default widths:
   - Major sections (experience, education): "1"
   - Medium sections (skills, interests, languages, softSkills): "1/2"
   - Smaller or auxiliary sections (certifications, personalProjects, achievements, references): "1/3"
   Adjust logically if a section has long text or fewer fields.

3. Each section’s "fields" must be an **object**, where keys correspond to logical field names from the section’s data.

4. It can be that you will see phones as array in personal information, preferably use text type for it

---

### Component mapping rules

- **Arrays of short strings** (e.g. ["Vue.js", "TypeScript"]) → one field using **multiselect**
  Example: skills, interests, tools, technologies, or list-style softSkills (!please note - only list styled softSkills, not when it is given as plain text).
  Label: Capitalized field name.  
  Placeholder: "Add or select <fieldName>".

- **Objects containing { "startDate": "", "endDate": "" }** → one field using **date-range**
  Key should be the parent field name (e.g. "period").
  Label: "Period".  
  Placeholder: "Select start and end dates".

- **Single date fields** (e.g. dateFinished, dateAwarded) → component: **date**
  Label: Capitalized field name.  
  Placeholder: "YYYY-MM-DD".

- **Boolean fields** (starting with "is", "has", "was") → component: **checkbox**

- **Short text fields** → component: **text**
  Label: Capitalized field name.  
  Placeholder: a relevant short example (e.g. "Frontend Developer").

- **Long text fields or descriptions** → component: **textarea**
  Label: Capitalized field name.  
  Placeholder: "Write a short description...".

- **Two related text fields (e.g. name + level)** →  
  "name" → component: text, type: title  
  "level" → component: text, type: italics
  !you can notice that type is most of the time applicable to text components, so if there's more than 1 component == text in the section - please add type to each!

- **URLs or links** (keys containing "link", "url", "website") → component: text  
  Placeholder: "https://...".

- **Unknown or complex nested fields** → fallback component: textarea.

---

### Examples

Example 1 – Languages
{
  "languages": {
    "title": "Languages",
    "width": "1/2",
    "fields": {
      "name": {
        "component": "text",
        "type": "title",
        "attrs": { "label": "Language", "placeholder": "English" },
        "order": 0
      },
      "level": {
        "component": "text",
        "type": "italics",
        "attrs": { "label": "Level", "placeholder": "Fluent" },
        "order": 1
      }
    }
  }
}

Example 2 – Skills
{
  "skills": {
    "title": "Skills",
    "width": "1/2",
    "fields": {
      "skills": {
        "component": "multiselect",
        "attrs": { "label": "Skills", "placeholder": "Add or select skills" },
        "order": 0
      }
    }
  }
}

Example 3 – Experience
{
  "experience": {
    "title": "Experience",
    "width": "1",
    "fields": {
      "company": {
        "component": "text",
        "type": "title",
        "attrs": { "label": "Company", "placeholder": "Company name" },
        "order": 0
      },
      "role": {
        "component": "text",
        "type": "subtitle",
        "attrs": { "label": "Role", "placeholder": "Frontend Developer" },
        "order": 1
      },
      "location": {
        "component": "text",
        "type": "italics",
        "attrs": { "label": "Location", "placeholder": "Amsterdam" },
        "order": 2
      },
      "period": {
        "component": "date-range",
        "attrs": { "label": "Employment period", "placeholder": "Select start and end dates" },
        "order": 3
      },
      "description": {
        "component": "textarea",
        "type": "subtitle",
        "attrs": { "label": "Description", "placeholder": "Describe your responsibilities..." },
        "order": 4
      }
    }
  }
}

---
`;
