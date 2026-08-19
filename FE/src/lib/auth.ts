import { type UserSigninFormData } from "./zodSchema";

export const SignupUser = async (data: UserSigninFormData) => {
  //TODO: Write return types for the function , response , resposneData

  try {
    const response = await fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error:
          responseData.message ||
          "Failed to create your account (Manual Error)",
      };
    }

    return {
      success: true,
      userData: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error:
        `Something went wrong!, \nError: ${error}` ||
        "Something went wrong! (Manual Error)",
    };
  }
};
