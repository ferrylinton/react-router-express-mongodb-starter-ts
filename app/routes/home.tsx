import { useTranslation } from "react-i18next";
import { data } from "react-router";
import type { Route } from "./+types/home";
import { getUserSession } from "~/.server/utils/sessions";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context, request }: Route.LoaderArgs) {
  console.log("homeeeeeeeeeeeeeeeeeeeeeeeeee");
  const session = await getUserSession(request);

  console.log(session.get("loggedUser"));

  return data(
    { message: "hello" }
  );
}

export default function Home({ loaderData }: Route.ComponentProps) {
  let { t, i18n } = useTranslation();

  return (<>
    <h1>{t("home")}</h1>
  </>);
}
