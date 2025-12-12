<script lang="ts" setup>
  import type { Resume } from "~/types/resume";
  import type { TemplateConfig } from "~/types/templates";

  const resume = defineModel<Resume>("resume", { required: true });
  const config = defineModel<TemplateConfig>("config", { required: true });

  const { sectionNames } = useFetchSections(config);

  // Responsive sidebar logic
  const isOpen = ref(false);
  const { width } = useWindowSize();
  const MOBILE_BREAKPOINT = 1190;
  const isMobile = computed(() => width.value < MOBILE_BREAKPOINT);

  // Auto-close when switching to desktop
  watch(isMobile, (mobile) => {
    if (!mobile) closeSidebar();
  });

  function toggleSidebar() {
    isOpen.value = !isOpen.value;
  }

  function closeSidebar() {
    isOpen.value = false;
  }
</script>

<template>
  <client-only>
    <!-- Sidebar wrapper for mobile positioning -->
    <div class="sidebar-wrapper" :class="{ 'sidebar-mobile': isMobile, 'sidebar-open': isOpen }">
      <div class="sidebar">
        <div class="mode-selector">
          <select-theme />
          <select-mode />
        </div>
        <transition-group name="animate-fade-slide" appear>
          <side-bar-section
            v-for="(sectionName, index) in sectionNames"
            :key="sectionName"
            :title="resume[sectionName].title"
            v-model:content="resume[sectionName]"
            v-model:config="config[sectionName]"
          />
        </transition-group>
      </div>

      <!-- Close button for mobile -->
      <helper-button
        v-if="isMobile && isOpen"
        class="sidebar-close-btn"
        icon="material-symbols:close"
        @click="closeSidebar"
      />
    </div>

    <!-- Overlay backdrop for mobile -->
    <div v-if="isMobile && isOpen" class="sidebar-backdrop" @click="closeSidebar" />

    <!-- Floating toggle button for mobile -->
    <button v-if="isMobile && !isOpen" class="floating-toggle no-print" @click="toggleSidebar">
      <Icon name="material-symbols:edit-sharp" size="24" />
    </button>
  </client-only>
</template>

<style lang="css" scoped>
  .sidebar-wrapper {
    transition: transform 0.3s ease;
  }

  /* left column */
  .sidebar {
    height: 100%;
    overflow: auto;
    max-width: 30rem;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    overscroll-behavior: contain; /* stop wheel/trackpad bubbling to root */
    overflow-anchor: none; /* stop Chrome from root "anchoring" jumps */
    scrollbar-gutter: stable both-edges; /* avoid layout shift when bar appears */
  }

  .mode-selector {
    display: flex;
  }

  /* Mobile sidebar styles */
  @media (max-width: 1189px) {
    .sidebar-mobile {
      position: fixed;
      top: 0;
      left: 0;
      width: 90vw;
      max-width: 500px;
      height: 100vh;
      z-index: 1000;
      transform: translateX(-100%);
      box-shadow: 2px 0 12px rgba(0, 0, 0, 0.15);
      background: var(--color-bg, white);
      overflow: visible; /* Allow popovers to escape */
      pointer-events: none; /* Allow clicks to pass through wrapper */
    }

    .sidebar-mobile.sidebar-open {
      transform: translateX(0);
    }

    /* Inner sidebar handles scrolling with touch support */
    .sidebar-mobile .sidebar {
      height: 100vh;
      overflow-y: auto;
      overflow-x: visible;
      -webkit-overflow-scrolling: touch; /* iOS momentum scrolling */
      overscroll-behavior-y: contain; /* Prevent scroll chaining */
      touch-action: pan-y; /* Allow vertical scrolling only */
      pointer-events: auto; /* Re-enable pointer events on scrollable content */
      will-change: scroll-position; /* Hint browser for scroll optimization */
    }

    /* Re-enable pointer events on close button */
    .sidebar-mobile .sidebar-close-btn {
      pointer-events: auto;
    }
  }

  /* Backdrop */
  .sidebar-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Close button */
  .sidebar-close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
  }

  /* Floating toggle button */
  .floating-toggle {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--color-primary, #3b82f6);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    transition: all 0.3s ease;
  }

  .floating-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  .floating-toggle:active {
    transform: scale(0.95);
  }

  /* Desktop: hide mobile elements */
  @media (min-width: 1190px) {
    .floating-toggle,
    .sidebar-backdrop,
    .sidebar-close-btn {
      display: none !important;
    }
  }
</style>

<style>
  /* Global: Ensure popovers/dropdowns appear above sidebar and backdrop */
  @media (max-width: 1189px) {
    /* Common popover selectors - adjust based on your UI library */
    [role="dialog"],
    [role="menu"],
    [role="listbox"],
    .popover,
    .dropdown,
    [data-radix-popper-content-wrapper],
    [data-headlessui-portal] {
      z-index: 1100 !important; /* Higher than sidebar (1000) and backdrop (999) */
    }
  }
</style>
