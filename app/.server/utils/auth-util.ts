import * as cookie from 'cookie';
import { redirect } from "react-router";
import { LOGGED_USER_COOKIE, RETURN_TO } from '~/utils/constant';
import { decrypt, encrypt } from './encrypt-util';
import logger from '../config/winston';
import { COOKIE_MAX_AGE } from '../config/constant';

export const setReturnTo = (returnTo = "/") => {
    return cookie.serialize(RETURN_TO, returnTo, {
        httpOnly: true,
        maxAge: 20
    })
}

export const removeReturnTo = () => {
    return cookie.serialize(RETURN_TO, "", {
        httpOnly: true,
        maxAge: 0
    })
}

export const getReturnTo = (request: Request) => {
    const cookies = cookie.parse(request.headers.get("Cookie") || "");
    return cookies[RETURN_TO] || "/";
}

export const setLoggedUser = async (loggedUser: LoggedUser) => {
    const value = await encrypt(JSON.stringify(loggedUser));
    return cookie.serialize(LOGGED_USER_COOKIE, value, {
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE
    })
}

export const removeLoggedUser = () => {
    return cookie.serialize(LOGGED_USER_COOKIE, "", {
        httpOnly: true,
        maxAge: 0
    })
}

export const getLoggedUser = async (request: Request) => {
    const cookies = cookie.parse(request.headers.get("Cookie") || "");
    const encrypted = cookies[LOGGED_USER_COOKIE];

    if (encrypted) {
        try {
            const plainText = await decrypt(encrypted);
            if (plainText) {
                const loggedUser = JSON.parse(plainText) as LoggedUser;

                if (loggedUser.role && loggedUser.username) {
                    return loggedUser
                }
            }
        } catch (error) {
            logger.error(error);
        }
    }

    return null;
}

export async function isAuthenticated(request: Request, returnTo?: string) {
    const loggedUser = await getLoggedUser(request);

    if (loggedUser && loggedUser.id && loggedUser.username) return loggedUser;

    throw redirect("/login", {
        headers: [
            ["Set-Cookie", removeLoggedUser()],
            ["Set-Cookie", setReturnTo(returnTo)]
        ],
    });
}

export async function logout() {
    return redirect("/login", {
        headers: [
            ["Set-Cookie", removeLoggedUser()],
            ["Set-Cookie", removeReturnTo()]
        ],
    });
}