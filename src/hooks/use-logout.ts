import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import { useSubmit } from "react-router-dom";

export const useLogout = () => {
  const submit = useSubmit();

  const logout = useCallback(async () => {
    // try {
    //   await axios.post(
    //     `${import.meta.env.VITE_CINEMA_API}/logout`,
    //     {},
    //     {
    //       withCredentials: true,
    //     }
    //   );

    //   localStorage.removeItem("permissions");
    //   localStorage.removeItem("sessionTimeout");
    //   return { success: true };
    // } catch (error) {
    //   if (error instanceof AxiosError) {
    //     if (error.response) {
    //       throw new Error(error.response.data.message);
    //     }
    //   } else {
    //     throw new Error("Failed to logout");
    //   }
    // }
    submit(null, { method: "post", action: "/" });
  }, [submit]);

  return logout;
};
