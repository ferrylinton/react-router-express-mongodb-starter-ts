import clsx from "clsx";
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
} from "react-router";
import { useChangeLanguage } from "remix-i18next/react";
import type { Route } from "./+types/root";
import { getCookieTheme } from "./.server/utils/cookies-util";
import { commitSession, getUserSession } from "./.server/utils/sessions";
import stylesheet from "./css/index.css?url";
import i18next from "./i18n/i18next.server";
import { AppProvider } from "./providers/AppProvider";
import { ToastProvider } from "./providers/ToastProvider";


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
  const session = await getUserSession(request);
  const theme = getCookieTheme(request);
  const toastData = session.get("toastData") as ToastData;

  return data(
    { locale, theme, toastData },
    { headers: { "Set-Cookie": await commitSession(session) } },
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
  // Get the locale from the loader
  const loaderData = useLoaderData<typeof loader | undefined>();
  const locale = loaderData?.locale || "id";
  const theme = loaderData?.theme || "light";
  const { i18n } = useTranslation();

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
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <>
    <AppProvider>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </AppProvider>
  </>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
