import type { ShallowRef } from "vue";

export function useResumeScaling(
  page: Readonly<ShallowRef<HTMLDivElement | null>>,
  pageWrapper: Readonly<ShallowRef<HTMLDivElement | null>>
) {
  const { width, height } = useWindowSize();

  // Formula that calculates factor that is used to scale the preview according to different widths
  function getScaleFactorFromWidth(width: number): number {
    const MIN_W = 350;
    const MAX_W = 600;
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 0.95;
    const GAMMA = 0.7; // shape exponent

    // clamp width to [MIN_W, MAX_W]
    const clamped = Math.min(Math.max(width, MIN_W), MAX_W);

    // normalize to [0, 1]
    const t = (clamped - MIN_W) / (MAX_W - MIN_W);

    // smooth curve so mid widths get closer to your desired values
    const curved = Math.pow(t, GAMMA);

    return MIN_SCALE + (MAX_SCALE - MIN_SCALE) * curved;
  }

  // Calculate scale to fit page in viewport while maintaining A4 aspect ratio
  const scale = ref(1);

  function updateScale() {
    if (!pageWrapper.value || !page.value) return;

    const wrapperHeight = pageWrapper.value.clientHeight;
    const wrapperWidth = pageWrapper.value.clientWidth;

    // Get the actual rendered size of the page element (210mm x 297mm in pixels)
    const pageWidth = page.value.offsetWidth;
    const pageHeight = page.value.offsetHeight;

    // Calculate scale to fit both dimensions
    const scaleX = wrapperWidth / pageWidth;
    const scaleY = wrapperHeight / pageHeight;

    // Use the smaller scale to ensure it fits
    scale.value = Math.min(scaleX, scaleY, 1) * getScaleFactorFromWidth(width.value);
  }

  watch([width, height], updateScale);
  onMounted(() => {
    nextTick(updateScale);
  });

  return { scale };
}
