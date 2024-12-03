import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import * as url from "url";
import { NODE_ENV, PORT } from "~/.server/config/constant";
import logger from "~/.server/config/winston";
import { initDb } from "~/.server/db/create-collections";
import { app as serverBuild } from "./app";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();

app.use(compression());
app.disable("x-powered-by");

if (NODE_ENV === "development") {
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    })
  );
  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule("./server/app.ts");
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  app.use(
    "/assets",
    express.static(path.join(__dirname, "../client/assets"), { immutable: true, maxAge: "1y" })
  );
  app.use(express.static(path.join(__dirname, "../client"), { maxAge: "1h" }));
  app.use(serverBuild);
}

app.use(morgan("tiny"));

app.listen(PORT, () => {
  logger.info(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
	logger.info(`[SERVER] NODE_ENV : ${NODE_ENV}`);
});

await initDb();
