import type { ReactElement, ReactNode } from "react";

interface PatternProps {
  varient: "light" | "dark";
  children?: ReactNode;
}
export function Patterns({ varient, children }: PatternProps): ReactElement {
  return (
    <>
      <div
        className={`min-h-screen w-full relative overflow-x-hidden ${varient === "dark" ? "bg-black" : "bg-[#f8fafc]"}`}
      >
        {/* Bottom Fade Grid Background */}
        {varient === "light" ? (
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
              backgroundSize: "20px 30px",
            }}
          />
        ) : (
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: `
        linear-gradient(to right, #262626 1px, transparent 1px),
        linear-gradient(to bottom, #262626 1px, transparent 1px)
          `,
              backgroundSize: "20px 30px",
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
}
