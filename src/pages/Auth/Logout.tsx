import axios, { AxiosError } from "axios";
import { json, redirect } from "react-router-dom";

export default function Logout() {
  return <></>;
}

export async function logoutAction() {
  console.log("logout");

  try {
    console.log("logout");
    await axios.post(
      `${import.meta.env.VITE_CINEMA_API}/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    localStorage.removeItem("permissions");
    localStorage.removeItem("sessionTimeout");
    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw json(error.response.data.message);
      }
    } else {
      throw json("Failed to logout");
    }
  }
}
