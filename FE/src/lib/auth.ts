import { type UserSignUpFormData } from "./zodSchema";
import { type SignupReturn } from "./types/auth";

export const SignupUser = async (
  data: UserSignUpFormData,
): Promise<SignupReturn> => {
  //TODO: Write return types for the function , response , resposneData

  try {
    const response = await fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = (await response.json()) as SignupReturn;

    if (!response.ok || !responseData.success) {
      return {
        success: false,
        message: responseData.message || "Failed to create your account",
      };
    }

    return {
      success: true,
      message: responseData.message,
      token: responseData.token,
      userData: responseData.userData,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong!, Please check your connection and try again.",
    };
  }
};
