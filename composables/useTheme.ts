export function useTheme() {
  const theme = useSessionStorage<string>("theme", "navy");
  const mode = useSessionStorage<string>("mode", "dark");

  function setTheme(name: string) {
    theme.value = name;
    document.documentElement.setAttribute("data-theme", name);
  }
  function setMode(name: string) {
    mode.value = name;
    document.documentElement.setAttribute("data-mode", name);
  }

  onMounted(() => {
    setTheme(theme.value);
    setMode(mode.value);
  });

  return { theme, setTheme, mode, setMode };
}
