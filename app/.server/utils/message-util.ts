import { redirect } from "react-router";
import { commitSession, getUserSession } from "./sessions";

export async function successMessage(request: Request, message: string, redirectTo: string) {
    const session = await getUserSession(request);
    session.flash("toastMessage", { message, type: "success" } as ToastMessage);

    return redirect(redirectTo, {
        headers: { "Set-Cookie": await commitSession(session) },
    });
}