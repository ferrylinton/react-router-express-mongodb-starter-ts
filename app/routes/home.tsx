import { useTranslation } from "react-i18next";
import { data } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context, request }: Route.LoaderArgs) {
  

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
