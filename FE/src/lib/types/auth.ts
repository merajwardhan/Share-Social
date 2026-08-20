//Types for auth.ts
import { type UserSignUpFormData } from "../zodSchema";

interface SignupSuccess {
  success: true;
  userData: UserSignUpFormData;
}

interface SignupFailure {
  success: false;
  error: string[];
  //TODO: Check error type , string[] or Record<string || string[]> something like that
}

export type SignupReturn = SignupSuccess | SignupFailure;
