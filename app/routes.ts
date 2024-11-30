import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [

    layout("components/Layout/Layout.tsx", [
        index("routes/home.tsx")
    ]),

    layout("components/Layout/PublicLayout.tsx", [
        route("login", "routes/login.tsx")
    ]),


] satisfies RouteConfig;
