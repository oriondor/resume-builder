export function useTheme() {
  const theme = useState<string>("theme", () => "navy");

  function setTheme(name: string) {
    theme.value = name;
    document.documentElement.setAttribute("data-theme", name);
  }

  return { theme, setTheme };
}
