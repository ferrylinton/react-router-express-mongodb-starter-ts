import * as cookie from 'cookie';
import { redirect } from "react-router";
import logger from '../config/winston';


export const TOAST_DATA = "TOAST_DATA";

export const getToastData = (request: Request) => {
    try {
        const cookies = cookie.parse(request.headers.get("Cookie") || "");
        const toastData = cookies[TOAST_DATA];

        if (toastData) {
            return JSON.parse(toastData) as ToastData;
        }

    } catch (error) {
        logger.error(error);
        return null
    }

    return null;
}

export const setToastData = (toastData: ToastData) => {
    return cookie.serialize(TOAST_DATA, JSON.stringify(toastData), {
        maxAge: 20,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    })
}

export const removeToastData = () => {
    return cookie.serialize(TOAST_DATA, "", {
        maxAge: 0,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    })
}

export async function toast(message: string, redirectTo: string, type: ToastType = "success") {
    return redirect(redirectTo, {
        headers: [
            ["Set-Cookie", setToastData({ message, type } as ToastData)],
        ],
    });
}