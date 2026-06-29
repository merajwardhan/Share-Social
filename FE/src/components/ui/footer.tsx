import {
  IconBrandTwitter,
  IconBrandGithub,
  IconBrandLinkedin,
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                className="text-black dark:text-white" // You can style with CSS
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355ZM9.5 8.75C7.70507 8.75 6.25 10.2051 6.25 12C6.25 13.7949 7.70507 15.25 9.5 15.25C11.2949 15.25 12.75 13.7949 12.75 12C12.75 11.5858 13.0858 11.25 13.5 11.25C13.9142 11.25 14.25 11.5858 14.25 12C14.25 14.6234 12.1234 16.75 9.5 16.75C6.87665 16.75 4.75 14.6234 4.75 12C4.75 9.37665 6.87665 7.25 9.5 7.25C9.91421 7.25 10.25 7.58579 10.25 8C10.25 8.41421 9.91421 8.75 9.5 8.75ZM17.75 12C17.75 13.7949 16.2949 15.25 14.5 15.25C14.0858 15.25 13.75 15.5858 13.75 16C13.75 16.4142 14.0858 16.75 14.5 16.75C17.1234 16.75 19.25 14.6234 19.25 12C19.25 9.37665 17.1234 7.25 14.5 7.25C11.8766 7.25 9.75 9.37665 9.75 12C9.75 12.4142 10.0858 12.75 10.5 12.75C10.9142 12.75 11.25 12.4142 11.25 12C11.25 10.2051 12.7051 8.75 14.5 8.75C16.2949 8.75 17.75 10.2051 17.75 12Z"
                  fill="currentColor" // This will inherit color from parent
                />
              </svg>
              <span className="font-bold text-lg text-foreground">
                linkSocial
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Organize your link universe. Save, curate, and share your favorite
              links of the internet with beautiful, Pinterest-style boards.
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
            <span>© {currentYear} linkSocial. All rights reserved.</span>
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
            <a
              href="https://x.com/merajwardhan"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
              <IconBrandTwitter size={20} stroke={1.5} />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://github.com/merajwardhan"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
              <IconBrandGithub size={20} stroke={1.5} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/imrajwardhan/"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
              <IconBrandLinkedin size={20} stroke={1.5} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
