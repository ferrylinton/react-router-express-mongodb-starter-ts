import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router";
import { useChangeLanguage } from "remix-i18next/react";
import type { Route } from "./+types/root";
import { getCookieTheme } from "./.server/utils/cookies-util";
import stylesheet from "./css/index.css?url";
import i18next from "./i18n/i18next.server";
import { AppProvider } from "./providers/AppProvider";
import { ToastProvider, useToastContext } from "./providers/ToastProvider";
import { getToastData, removeToastData } from "./.server/utils/message-util";
import styles from "./components/Layout/Layout.module.css"
import { PublicNavbar } from "./components/Navbar/PublicNavbar";
import { Button } from "./components/Button/Button";
import Cookies from "js-cookie";


export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request }: Route.LoaderArgs) {
  const locale = await i18next.getLocale(request);
  const theme = getCookieTheme(request);
  const toastData = getToastData(request);

  return data(
    { locale, theme, toastData },
    { headers: { "Set-Cookie": removeToastData() } },
  );
}

export let handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export function Layout({ children }: { children: React.ReactNode }) {

  const loaderData = useRouteLoaderData<typeof loader>("root");
  const [locale, setLocale] = useState(loaderData?.locale || "id");
  const [theme, setTheme] = useState(loaderData?.theme || "light")
  const { i18n } = useTranslation();

  useEffect(() => {

    if (!loaderData) {
      setLocale(Cookies.get("locale") || "id");
      setTheme(Cookies.get("theme") || "light");
    }

  }, [])

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()} >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={clsx(theme)}>
        <AppProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {

  const loaderData = useLoaderData<typeof loader>();

  const { toast } = useToastContext();

  useEffect(() => {
    if (loaderData?.toastData) {
      toast(loaderData?.toastData);
    }

  }, [loaderData]);

  return <>
    <Outlet />
  </>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? t("pageNotFound")
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className={clsx(styles.layout, 'flex-col',)}>
      <PublicNavbar />
      <main className="h-full flex flex-col justify-center items-center p-4 gap-4">
        <h1 className="text-7xl font-bold">{message}</h1>
        <p className="text-center">{details}</p>
        {stack && (
          <pre className="stack">
            <code>{stack}</code>
          </pre>
        )}
        <Button type="submit" variant="primary" minWidth={120} onClick={() => navigate("/", { replace: true })}>
          {t("home")}
        </Button>
      </main>
    </div>
  );
}
