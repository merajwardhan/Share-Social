import { ThemeToggle } from "./components/themeButton";
import { BackgroundLines } from "./components/ui/background-lines";
import { useTheme } from "next-themes";
import { Patterns } from "./components/ui/patterns";
import { useState, useEffect } from "react";

function App() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Patterns varient={resolvedTheme === "dark" ? "dark" : "light"}>
        <BackgroundLines>
          <ThemeToggle></ThemeToggle>
        </BackgroundLines>
      </Patterns>
    </>
  );
}

export default App;
