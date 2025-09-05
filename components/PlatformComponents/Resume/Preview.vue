<script setup lang="ts">
  import type { Resume } from "~/types/resume";

  export interface Templates {
    name: string;
    description: string;
  }

  const templates = ref<Templates[]>([]);

  const resume = defineModel<Resume>("resume", { required: true });
</script>

<template>
  <div class="container">
    <div class="page">
      <div class="content">
        <div class="section main-info">
          <view-text v-model="resume.fullName" type="subtitle" size="extra-large" />
          <view-text v-model="resume.title" type="subtitle" />
          <view-text v-if="resume.shortSentence" v-model="resume.shortSentence" type="text" />
        </div>
        <div class="section contact">
          <a v-if="resume?.contact?.email" :href="`mailto:${resume.contact.email}`">
            <view-text v-model="resume.contact.email" type="text" icon="ic:baseline-email" />
          </a>
          <a v-for="(phone, index) in resume.contact.phones" :key="phone" :href="`tel:${phone}`">
            <view-text
              v-model="resume.contact.phones[index]"
              type="text"
              icon="material-symbols:call-outline-sharp"
            />
          </a>
          <view-text
            v-model="resume.contact.address"
            type="text"
            icon="material-symbols:pin-drop"
          />
        </div>
        <div class="summary">
          <view-text v-model="resume.summary" type="italics" size="small" />
        </div>
        <div class="resume-container">
          <div class="left-side">
            <div v-if="resume.experience.length" class="section experience">
              <view-text type="title" size="large" uppercase class="title-section">
                Work Experience
              </view-text>
              <div
                v-for="(item, index) in resume.experience"
                :key="index"
                class="item experience-item"
              >
                <view-text v-model="item.company" type="title" />
                <view-text v-model="item.role" type="subtitle" size="large" />
                <view-text v-if="item.companyDescription" type="italics" size="small">
                  {{ item.companyDescription }}
                </view-text>
                <div class="date-location">
                  <view-dates :dates="[item.startDate, item.endDate]" month />
                  <view-text
                    v-if="item.location"
                    v-model="item.location"
                    type="italics"
                    size="small"
                  />
                </div>
                <view-text v-model="item.description" type="text" />
              </div>
            </div>
            <div v-if="resume.education.length" class="section education">
              <view-text type="title" size="large" uppercase class="title-section">
                Education
              </view-text>
              <div
                v-for="(item, index) in resume.education"
                :key="index"
                class="item education-item"
              >
                <view-text v-model="item.degree" type="title" />
                <view-text v-model="item.institution" type="subtitle" size="large" />
                <div class="date-location">
                  <view-dates :dates="[item.dateFinished, '']" month />
                  <view-text v-model="item.location" type="italics" size="small" />
                </div>
                <view-text v-model="item.description" type="text" />
              </div>
            </div>
          </div>
          <div class="right-side">
            <view-text type="title" size="large" uppercase class="title-section">
              Skills
            </view-text>
            <div class="skills-list">
              <helper-tag
                v-for="skill in resume.skills"
                :key="skill.id"
                :text="skill.name"
                variant="accent"
              />
            </div>
            <view-text type="title" size="large" uppercase class="title-section">
              Personal projects
            </view-text>
            <template v-for="project in resume.personalProjects" :key="project.index">
              <view-text type="subtitle" size="large">
                {{ project.title }}
              </view-text>
              <view-dates :dates="[project.startDate, project.endDate]" month />
            </template>
            <view-text type="title" size="large" uppercase class="title-section">
              Languages
            </view-text>
            <template v-for="language in resume.languages" :key="language.index">
              <view-text type="subtitle">
                {{ language.name }}
              </view-text>
              <view-text type="italics" size="small">
                {{ language.level }}
              </view-text>
            </template>
            <view-text type="title" size="large" uppercase class="title-section">
              Interests
            </view-text>
            <div class="skills-list">
              <helper-tag
                v-for="interest in resume.interests"
                :key="interest.id"
                :text="interest.name"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  a {
    text-decoration: none;
  }
  .container {
    overflow: auto;
    height: 100vh;
    max-height: 100vh;
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .page {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
    background: var(--color-bg);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
    color: #222;
    font: 10pt/1.35 var(--resume-font, "Inter", system-ui, sans-serif);
  }

  /* Avoid bad splits */
  .section,
  .card {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  p {
    orphans: 3;
    widows: 3;
    hyphens: auto;
  }
  .main-info {
    padding: 9mm;
    padding-block-end: 5mm;
  }
  .contact {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--color-accent);
  }
  .summary {
    padding: 4mm;
    padding-block-end: 0;
  }
  .resume-container {
    padding: 1rem;
    padding-block: 0;
    display: flex;

    [class$="-side"] {
      flex: 1;
    }

    .left-side {
      padding-inline-end: 3rem;
    }

    .right-side {
      padding-inline-start: 3rem;
    }
  }

  .title-section {
    margin-block-start: 0.75rem;
    margin-block-end: 0.5rem;
  }

  .item::before {
    content: "";
    display: block;
    position: relative;
    left: -1rem;
    height: 2px;
    width: 1rem;
    background: var(--color-border);
    margin: 0.5rem 0;
  }

  .date-location {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
