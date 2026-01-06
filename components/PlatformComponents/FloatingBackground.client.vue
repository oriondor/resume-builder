<template>
  <div class="floating-wrapper">
    <div ref="container" class="floating-background">
      <div
        v-for="(icon, i) in icons"
        :key="i"
        ref="iconRefs"
        class="float-item"
        :style="{ color: `var(--color-${icon.color})` }"
      >
        <Icon v-bind="icon" />
      </div>
    </div>
    <div class="floating-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, nextTick, toRefs } from "vue";
  import { gsap } from "gsap";
  import { Physics2DPlugin } from "gsap/Physics2DPlugin";
  gsap.registerPlugin(Physics2DPlugin);

  const AREA_SIZE = 200;

  const defaultPossibleColors = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "purple",
    "pink",
  ];

  type ColorType =
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "purple"
    | "pink"
    | string;

  interface Props {
    count?: number;
    pushPower?: number;
    opacity?: number;
    iconList?: string[];
    colors?: ColorType[];
    minSize?: number;
    maxSize?: number;
  }
  const props = withDefaults(defineProps<Props>(), {
    count: 20,
    pushPower: 260,
    opacity: 0.3,
    iconList: () => [
      "heroicons:document-text",
      "mdi:account",
      "mdi:briefcase-outline",
      "ph:target-duotone",
      "ph:brain-duotone",
    ],
    minSize: 35,
    maxSize: 65,
  });
  const { iconList, colors, count, opacity } = toRefs(props);

  function random(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min));
  }

  function pickRandomColor() {
    const colorArray = colors.value ?? defaultPossibleColors;
    return colorArray[random(0, colorArray.length)]!;
  }

  const container = ref<HTMLElement>();
  const iconRefs = ref<HTMLElement[]>([]);

  const { width, height } = useElementBounding(container);

  interface IconSpecs {
    name: string;
    size: number;
    color: ColorType;
    x: number;
    y: number;
  }

  const icons = ref<IconSpecs[]>([]);

  function createIcon() {
    const icon: IconSpecs = {
      name: iconList.value[random(0, iconList.value.length)] ?? "academicons:cv",
      size: random(props.minSize, props.maxSize),
      color: pickRandomColor(),
      x: random(0, width.value),
      y: random(0, height.value),
    };
    return icon;
  }

  /**
   * Adds or removes icons from the list
   * @param amount either positive or negative amount
   */
  function generateIcons(amount: number) {
    if (!amount) return;
    if (amount < 0) {
      icons.value.length -= amount * -1;
      return;
    }
    icons.value.push(...Array.from({ length: amount }).map(() => createIcon()));
    for (let i = icons.value.length - amount; i < icons.value.length; i++) animateIcon(i);
  }

  async function animateIcon(index: number) {
    await nextTick();
    const icon = icons.value[index];

    const coordinates = {
      left: icon!.x,
      top: icon!.y,
    };

    gsap.set(iconRefs.value[index] as gsap.TweenTarget, { ...coordinates, scale: icon!.size / 64 });

    const tween = gsap.to(iconRefs.value[index] as gsap.TweenTarget, {
      duration: random(10, 20),
      left: coordinates.left + random(-AREA_SIZE / 2, AREA_SIZE / 2),
      top: coordinates.top + random(-AREA_SIZE / 2, AREA_SIZE / 2),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  watch(count, (newCount, oldCount) => {
    generateIcons(newCount - oldCount);
  });

  onMounted(() => {
    useTimeoutFn(() => generateIcons(count.value), 5);
  });
</script>

<style scoped>
  .floating-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
  }

  .floating-background {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 30%, #0f172a, #020617);
    z-index: 0;
    overflow: hidden;
  }

  .float-item {
    position: absolute;
    mix-blend-mode: lighten;
    opacity: v-bind(opacity);
  }

  .floating-content {
    position: relative;
    z-index: 1;
  }
</style>
