import { DarkIcon } from "@/assets/icons/DarkIcon";
import { LightIcon } from "@/assets/icons/LightIcon";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 bg-secondary text-secondary-foreground rounded-xl border border-border cursor-pointer relative z-20"
    >
      {theme === "dark" ? <LightIcon /> : <DarkIcon />}
    </button>
  );
}
