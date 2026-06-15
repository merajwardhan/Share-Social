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
        <BackgroundLines>
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

          {/* REST OF THE PAGE CONTENT HERE  */}
          {/* Inside BackgroundLines, below your Navbar */}
          <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center pt-36 lg:pt-0 gap-12 relative z-10">
            {/* LEFT SIDE: Copy & CTA */}
            <div className="flex-1 text-center lg:text-left flex flex-col gap-6">
              <h1 className="text-5xl sm:text-7xl font-black text-foreground leading-tight">
                Organize your <br />
                <span className="text-muted-foreground italic font-light">
                  web universe.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Stop losing your favorite links. Save, organize, and share your
                personal corners of the internet in beautiful, Pinterest-style
                boards.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-4">
                <div className="flex w-full max-w-sm items-center space-x-2 bg-background border border-border rounded-lg p-1 shadow-sm">
                  <span className="text-muted-foreground pl-3 hidden sm:inline">
                    linklist.me/
                  </span>
                  <input
                    type="text"
                    placeholder="username"
                    className="flex-1 bg-transparent border-none outline-none px-2 py-2 text-foreground"
                  />
                  <NavbarButton variant="dark" className="whitespace-nowrap">
                    Claim
                  </NavbarButton>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: The Visual Proof */}
            <div className="flex-1 w-full max-w-lg hidden lg:block">
              <div className="aspect-[4/3] bg-card border border-border rounded-xl shadow-2xl p-4 flex flex-col gap-4 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* Fake UI Header */}
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
                {/* Fake UI Masonry Grid Placeholder */}
                <div className="flex-1 grid grid-cols-2 gap-2 opacity-50">
                  <div className="bg-secondary rounded-md h-full"></div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-secondary rounded-md h-1/2"></div>
                    <div className="bg-secondary rounded-md h-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BackgroundLines>
      </Patterns>
    </>
  );
}

export default App;
