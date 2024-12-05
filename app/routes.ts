import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [

    layout("components/Layout/Layout.tsx", [
        index("routes/HomeRoute.tsx"),
        ...prefix("user", [
            index("routes/user/UserListRoute.tsx"),
            route("/create", "routes/user/UserCreateRoute.tsx"),
            route("/detail/:id", "routes/user/UserDetailRoute.tsx"),
            route("/update/:id", "routes/user/UserUpdateRoute.tsx"),
            route("/password/:id", "routes/user/UserPasswordRoute.tsx"),
            route("/lock/:id", "routes/user/UserLockRoute.tsx")
        ]),
    ]),

    layout("components/Layout/PublicLayout.tsx", [
        route("login", "routes/LoginRoute.tsx"),
        route("register", "routes/RegisterRoute.tsx"),
        route("forgotpassword", "routes/ForgotPasswordRoute.tsx"),
        route("resetpassword", "routes/ResetPasswordRoute.tsx")
    ]),

    route("logout", "routes/LogoutRoute.tsx")


] satisfies RouteConfig;
