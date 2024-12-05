import { useTranslation } from "react-i18next";
import { data } from "react-router";
import { getUserSession } from "~/.server/utils/sessions";
import { Route } from "../+types/root";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context, request }: Route.LoaderArgs) {
  const session = await getUserSession(request);

  return data(
    { message: "hello" }
  );
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  let { t, i18n } = useTranslation();

  return (<>
    <h1>{t("home")}</h1>
  </>);
}
