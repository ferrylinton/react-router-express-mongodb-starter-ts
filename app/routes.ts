import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [

    layout("components/Layout/Layout.tsx", [
        index("routes/home.tsx"),
        ...prefix("user", [
            index("routes/user/list.tsx"),
            route("/create", "routes/user/create.tsx"),
            route("/detail/:id", "routes/user/detail.tsx"),
            route("/update/:id", "routes/user/update.tsx"),
            route("/password/:id", "routes/user/password.tsx")
        ]),
    ]),

    layout("components/Layout/PublicLayout.tsx", [
        route("login", "routes/login.tsx")
    ]),

    route("logout", "routes/logout.tsx")


] satisfies RouteConfig;
