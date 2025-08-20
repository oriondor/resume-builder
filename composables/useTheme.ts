export function useTheme() {
  const theme = useSessionStorage<string>("theme", "navy");

  function setTheme(name: string) {
    theme.value = name;
    document.documentElement.setAttribute("data-theme", name);
  }

  onMounted(() => setTheme(theme.value));

  return { theme, setTheme };
}
