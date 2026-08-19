import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserSignUpFormData } from "@/lib/zodSchema";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    watch,
    trigger,
  } = useForm<UserSignUpFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });

  const passwordLive = watch("password");
  const confirmPasswordLive = watch("confirmPassword");

  const showMatchSuccess =
    touchedFields.confirmPassword &&
    confirmPasswordLive &&
    passwordLive === confirmPasswordLive;

  const passwordRequirementHints = (pwd: string) => {
    if (!pwd) return [];
    const requirements = [];
    if (pwd.length < 8)
      requirements.push("Password must contain 8 characters!");
    if (pwd.length > 20)
      requirements.push("Password should not be more than 20 characters!");
    if (!/[A-Z]/.test(pwd))
      requirements.push("Password must have atleast 1 uppercase letter!");
    if (!/[a-z]/.test(pwd))
      requirements.push("Password must have atleast 1 lowercase letter!");
    if (!/[0-9]/.test(pwd))
      requirements.push("Password must have atleast 1 number!");
    if (!/[^A-Za-z0-9]/.test(pwd))
      requirements.push("Password must have atleast 1 special character!");
    return requirements;
  };

  const requirements = passwordRequirementHints(passwordLive);

  const onSubmit = async (data: UserSignUpFormData) => {
    //TODO:Import the SignupUser function and route the user to dashboard after creating the account
    //TODO:Check if it's a industry standard to show a toast after signing up or just redirecting
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Rajwardhan Patil"
                required
                {...register("name")}
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="rajwardhan_patil"
                required
                {...register("username")}
              />
              {errors.username && (
                <FieldError>{errors.username.message}</FieldError>
              )}
              <FieldDescription>
                Username should be minimum 3 characters and maximum 10
                characters. It can include dots and underscores.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="raj@example.com"
                required
                {...register("email")}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
                onBlur={() => trigger("confirmPassword")} //Re-validate confirm password when password changes
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
              {passwordLive && requirements.length > 0 && (
                <div className="mt-1 text-sm text-gray-600">
                  <p className="font-medium">Password requirements:</p>
                  <ul className="list-disc pl-4">
                    {requirements.map((req, idx) => (
                      <li key={idx} className="text-yellow-600">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {passwordLive && requirements.length === 0 && (
                <FieldDescription className="text-green-600">
                  Password meets all requirements
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
              {showMatchSuccess ? (
                <FieldDescription className="text-green-600">
                  Passwords match.
                </FieldDescription>
              ) : (
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account" : "Create Account"}
                </Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
