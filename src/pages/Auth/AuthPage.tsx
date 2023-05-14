import axios, { AxiosError } from "axios";
import { Link, json, redirect } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import PageLayout from "../PageLayout";
import { getPermissions } from "../../utils/auth";

const AuthPage = ({ isSignup }: { isSignup: boolean }) => {
  const pageTitle = isSignup ? "Create New User" : "Login";
  const pageSubTitle = isSignup
    ? "First, SiteAdmin needs to create the user"
    : undefined;
  return (
    <PageLayout
      pageTitle={pageTitle}
      pageSubTitle={pageSubTitle}
      className="flex-col"
    >
      <AuthForm isSignup={isSignup} />
      {!isSignup && (
        <Link className="underline text-blue-600 font-semibold" to="/signup">
          Create New User
        </Link>
      )}
    </PageLayout>
  );
};

export default AuthPage;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const authData = {
    userName: data.get("userName"),
    password: data.get("password"),
    isSignup: data.get("isSignup"),
  };
  const { userName, password, isSignup } = authData;

  const mode = isSignup === "true" ? "signup" : "login";

  try {
    const response = await axios(`${import.meta.env.VITE_CINEMA_API}/${mode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ userName, password }),
      withCredentials: true,
    });

    if (isSignup === "true") return redirect("/login");

    const { permissions, sessionTimeout } = response.data;

    localStorage.setItem("permissions", permissions);
    localStorage.setItem("sessionTimeout", sessionTimeout);

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 422 || error.response.status === 401) {
        return error.response.data;
      }
    } else
      throw json({ message: "Could not authenticate user." }, { status: 500 });
  }
}

export function loader() {
  const permissions = getPermissions();
  if (permissions) {
    return redirect("/");
  }

  return {};
}
   