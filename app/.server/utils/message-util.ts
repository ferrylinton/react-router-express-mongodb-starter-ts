import { redirect } from "react-router";
import { commitSession, getUserSession } from "./sessions";

export async function toast(request: Request, message: string, redirectTo: string, type: "success" | "error" = "success") {
    const session = await getUserSession(request);
    session.flash("toastData", { message, type } as ToastData);

    return redirect(redirectTo, {
        headers: { "Set-Cookie": await commitSession(session) },
    });
}