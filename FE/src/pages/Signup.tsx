import { SignupForm } from "../components/signup-form";
import { LogoProvider } from "@/assets/public/logoProvider";

export function SignUp() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      {/* Optional: A logo at the top makes it look super premium */}
      <div className="mb-8 flex items-center gap-2">
        <LogoProvider width="30px" height="30px" />
        <span className="text-xl text-foreground">linkSocial</span>
      </div>

      {/* The Wrapper that restricts the Card size */}
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
