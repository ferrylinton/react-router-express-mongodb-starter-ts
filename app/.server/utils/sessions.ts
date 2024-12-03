import { createCookieSessionStorage, redirect } from "react-router";
import { COOKIE_SECRET } from "../config/constant";

type SessionData = {
    loggedUser: LoggedUser
    returnTo?: string
};

type SessionFlashData = {
    error: string;
};

const sessionStorage =
    createCookieSessionStorage<SessionData, SessionFlashData>(
        {
            cookie: {
                name: "__session",
                httpOnly: true,
                path: "/",
                sameSite: "lax",
                secrets: [COOKIE_SECRET],
                secure: process.env.NODE_ENV === "production",
            },
        }
    );

export const { commitSession, destroySession } = sessionStorage;

export const getUserSession = async (request: Request) => {
    return await sessionStorage.getSession(request.headers.get("Cookie"));
};