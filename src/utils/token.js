import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("genics-token") || "";
};

export const removeToken = () => {
  Cookies.remove("genics-token");
};

export const setToken = (token) => {
  Cookies.set("genics-token", token);
};
