import type { ReactElement } from "react";
import { NavbarButton } from "./resizable-navbar";

export default function HeroSection(): ReactElement {
  return (
    <>
      <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-start pt-36 lg:pt-0 gap-12 relative z-10">
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
                linksocial.me/
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
          <div className="aspect-[4/3] bg-card border border-border rounded-xl shadow-2xl p-4 flex flex-col gap-4 transform rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden">
            {/* Fake UI Header */}
            <div className="flex items-center gap-2 border-b border-border pb-2">
              <div className="w-3 h-3 rounded-full bg-destructive/50"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
              <div className="ml-4 h-4 w-32 bg-secondary rounded-full opacity-50"></div>
            </div>

            {/* The Realistic Masonry Grid */}
            <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
              {/* Left Column (One Tall Post) */}
              <div className="flex flex-col gap-4 h-full">
                <div className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:-translate-y-1 transition-transform cursor-pointer h-full flex flex-col">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                    alt="Abstract art"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3 flex flex-col gap-1">
                    <h3 className="font-bold text-sm text-foreground">
                      Design Inspiration
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      A collection of beautiful liquid gradients for the new
                      landing page.
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="px-2 py-0.5 bg-secondary text-[10px] rounded-md text-secondary-foreground">
                        ui/ux
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Two Shorter Posts) */}
              <div className="flex flex-col gap-4">
                {/* Post 1 */}
                <div className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop"
                    alt="Code snippet"
                    className="w-full h-20 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-foreground">
                      React Patterns
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      github.com/react-hooks
                    </p>
                  </div>
                </div>

                {/* Post 2 */}
                <div className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2000&auto=format&fit=crop"
                    alt="Finance"
                    className="w-full h-16 object-cover grayscale opacity-80"
                  />
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-foreground">
                      Q3 Tech Earnings
                    </h3>
                    <div className="mt-2 flex gap-2">
                      <span className="px-2 py-0.5 bg-secondary text-[10px] rounded-md text-secondary-foreground">
                        finance
                      </span>
                      <span className="px-2 py-0.5 bg-secondary text-[10px] rounded-md text-secondary-foreground">
                        tech
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
