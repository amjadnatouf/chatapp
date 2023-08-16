import jwtDecode from "jwt-decode";

type checkAuthProps = () => { isAuthenticated: boolean; id: string };

export const checkAuth: checkAuthProps = () => {
  const token: string | null = localStorage.getItem("token");

  if (!token) {
    return { isAuthenticated: false, id: "" };
  }

  try {
    const { exp, id } = jwtDecode<{ exp: number; id: string }>(token);

    if (exp < new Date().getTime() / 1000) {
      console.log("Token has expired");
      return { isAuthenticated: false, id: "" };
    }

    return { isAuthenticated: true, id };
  } catch (err) {
    console.log("Something went wrong when decoding the token");
    return { isAuthenticated: false, id: "" };
  }
};

export const logOut = () => {
  console.log("Logging out...");
  localStorage.removeItem("token");
  sessionStorage.clear();
  window.location.replace("/");
};

export const getAuthenticatedUser = () => {
  const token: string | null = localStorage.getItem("token");
  const { id } = jwtDecode<{ id: string }>(token as string);

  const user = {
    id,
    token,
  };
  const headers = {
    Authorization: `Bearer ${user.token}`,
  };
  if (!checkAuth()) {
    return window.location.replace("/");
  }
  return { data: user, options: headers };
};
