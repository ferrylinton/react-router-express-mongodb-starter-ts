import { createRequestHandler } from "@react-router/express";
import express from "express";
import "react-router";
import { authMiddleware } from "./middlewares/auth-middleware";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

app.use(authMiddleware);

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Router at build time
    build: () => import("virtual:react-router/server-build")
  })
);
