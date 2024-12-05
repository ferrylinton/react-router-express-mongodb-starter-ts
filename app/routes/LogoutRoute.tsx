import { redirect } from "react-router";
import { logout } from "~/.server/utils/auth-util";
import { Route } from "../+types/root";

export const action = async ({ request }: Route.ActionArgs) => logout(request);

export const loader = async () => redirect("/");