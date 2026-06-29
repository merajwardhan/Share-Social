import {
  IconBrandTwitter,
  IconBrandGithub,
  IconBrandDiscord,
} from "@tabler/icons-react";

export function Footer() {
  const currentYear = new Date().getFullYear(); // Automatically updates the copyright year!

  return (
    <footer className="w-full border-t border-border/50 bg-background pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Top Section: Brand and Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand (Takes up 2 columns on desktop) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="https://assets.aceternity.com/logo-dark.png"
                alt="LinkList logo"
                width={24}
                height={24}
                className="dark:invert-0 invert"
              />
              <span className="font-bold text-lg text-foreground">
                LinkList
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Organize your web universe. Save, curate, and share your favorite
              corners of the internet with beautiful, Pinterest-style boards.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Integrations
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Changelog
              </a>
            </div>
          </div>

          {/* Column 3: Resources Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Help Center
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Browser Extension
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Community
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Blog
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal and Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 gap-4">
          {/* Copyright & Legal */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-muted-foreground">
            <span>© {currentYear} LinkList. All rights reserved.</span>
            <div className="hidden sm:block h-3 w-px bg-border"></div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              <IconBrandTwitter size={20} stroke={1.5} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              <IconBrandGithub size={20} stroke={1.5} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              <IconBrandDiscord size={20} stroke={1.5} />
              <span className="sr-only">Discord</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
