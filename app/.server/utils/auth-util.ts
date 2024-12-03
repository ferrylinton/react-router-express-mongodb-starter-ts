import { redirect } from "react-router";
import { commitSession, destroySession, getUserSession } from "./sessions";

export async function authenticate(request: Request, returnTo?: string) {
    const session = await getUserSession(request);
    const loggedUser = session.get("loggedUser");

    if (loggedUser) return loggedUser;
    if (returnTo) session.set("returnTo", returnTo);

    throw redirect("/login", {
        headers: { "Set-Cookie": await commitSession(session) },
    });
}

export async function logout(request: Request) {
    const session = await getUserSession(request);

    return redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session)
        },
    });
}