import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";
import { authMiddleware } from "./middlewares/auth-middleware";
import bodyParser from "body-parser";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

//app.use(bodyParser.json()); // support json encoded bodies
//app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use(authMiddleware);

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Router at build time
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express",
      };
    },
  })
);
