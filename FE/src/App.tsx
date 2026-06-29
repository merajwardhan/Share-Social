import { ThemeToggle } from "./components/themeButton";
import { BackgroundLines } from "./components/ui/background-lines";
import { useTheme } from "next-themes";
import { Patterns } from "./components/ui/patterns";
import { useState, useEffect } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./components/ui/resizable-navbar";
import { ValueProposition } from "./components/ui/ValuePreposition";
import HeroSection from "./components/ui/HeroSection";
import { Footer } from "./components/ui/footer";

function App() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { name: "Home", link: "#" },
    { name: "Explore", link: "#" },
    { name: "Features", link: "#" },
  ];

  return (
    <>
      <Patterns varient={resolvedTheme === "dark" ? "dark" : "light"}>
        <Navbar>
          {/* Desktop Layout */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navLinks} />

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <NavbarButton variant="dark">Sign Up</NavbarButton>
            </div>
          </NavBody>

          {/* Mobile Layout */}
          <MobileNav>
            <MobileNavHeader>
              <div className="flex items-center gap-2">
                <NavbarLogo />
              </div>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </MobileNavHeader>
          </MobileNav>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex flex-col gap-4 w-full">
              {navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="text-lg font-medium text-foreground"
                >
                  {item.name}
                </a>
              ))}
              <NavbarButton variant="dark" className="w-full mt-4">
                Sign Up
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </Navbar>
        <BackgroundLines>
          {/* REST OF THE PAGE CONTENT HERE  */}
          {/* Inside BackgroundLines, below your Navbar */}
          <HeroSection></HeroSection>
          {/* :TODO Add a video of how the website works below the CTA and grid*/}
        </BackgroundLines>
        <ValueProposition></ValueProposition>
        <Footer></Footer>
      </Patterns>
    </>
  );
}

export default App;
