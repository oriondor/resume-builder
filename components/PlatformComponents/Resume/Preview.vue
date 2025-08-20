<script setup lang="ts">
  export interface Templates {
    name: string;
    description: string;
  }

  const templates = ref<Templates[]>([]);

  const { resume } = useResume();

  const phones = computed({
    get: () => resume.value.contact.phones.join(", "),
    set(value: string) {
      resume.value.contact.phones = value.split(",").map((phone) => phone.trim());
    },
  });
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
        <div class="section contact bg-accent">
          <view-text v-model="resume.contact.email" type="text" icon="ic:baseline-email" />
          <view-text v-model="phones" type="text" icon="material-symbols:call-outline-sharp" />
          <view-text
            v-model="resume.contact.address"
            type="text"
            icon="material-symbols:pin-drop"
          />
        </div>
        <div class="resume-container">
          <div class="left-side">
            <div v-if="resume.experience.length" class="section experience">
              <view-text type="title" size="large" uppercase>Work Experience</view-text>
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
              <view-text type="title" size="large" uppercase>Education</view-text>
              <div
                v-for="(item, index) in resume.education"
                :key="index"
                class="item education-item"
              >
                <view-text v-model="item.degree" type="subtitle" />
                <view-text v-model="item.institution" type="text" />
                <view-text v-model="item.year" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container {
    overflow: auto;
    height: 100vh;
    max-height: 100vh;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    margin: 0;
    padding: 0;
    background: #fff;
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
  }
  .contact {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
  }
  .resume-container {
    padding: 1rem;
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
</style>
