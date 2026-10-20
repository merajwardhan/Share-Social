//Types for auth.ts

type userSignupData = {
  name: string;
  username: string;
  email: string;
};

interface SignupSuccess {
  success: true;
  message: string;
  token: string;
  userData: userSignupData;
}

interface SignupFailure {
  success: false;
  message: string;
  FieldErrors?: Record<string, string[] | undefined>;
}

export type SignupReturn = SignupSuccess | SignupFailure;
