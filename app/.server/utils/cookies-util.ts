import { createCookie } from "react-router";


export const localeCookie = createCookie("locale", {
  secrets:["secret"],
  httpOnly: false,
  secure: false,
  path: "/",
  maxAge: 365 * 24 * 60 * 60,
});