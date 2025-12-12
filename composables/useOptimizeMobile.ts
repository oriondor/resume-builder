export function useOptimizeMobile() {
  // On mobile we have situation when user double taps the screen and screen gets zoomed in
  // To prevent this we can stop this behaviour by preventing default, but also dispatching a double click
  // Enable dblclick events on mobile by converting double-tap to dblclick
  // Also prevent zoom on double-tap
  onMounted(() => {
    let lastTap = 0;
    let lastTapTarget: EventTarget | null = null;

    document.addEventListener(
      "touchend",
      (event) => {
        const now = Date.now();
        const timeSinceLastTap = now - lastTap;
        const target = event.target;

        // If two taps within 300ms on the same element
        if (timeSinceLastTap < 300 && timeSinceLastTap > 0 && target === lastTapTarget) {
          // Prevent default zoom behavior
          event.preventDefault();

          // Dispatch a dblclick event
          const dblClickEvent = new MouseEvent("dblclick", {
            bubbles: true,
            cancelable: true,
            view: window,
            detail: 2,
            clientX: event.changedTouches[0].clientX,
            clientY: event.changedTouches[0].clientY,
          });
          target?.dispatchEvent(dblClickEvent);

          // Reset to prevent triple-tap from triggering another dblclick
          lastTap = 0;
          lastTapTarget = null;
        } else {
          lastTap = now;
          lastTapTarget = target;
        }
      },
      { passive: false }
    );
  });
}
