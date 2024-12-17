import compression from "compression";
import express from "express";
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

// PRODUCTION
app.use(
  "/assets",
  express.static(path.join(__dirname, "../client/assets"), { immutable: true, maxAge: "1y" })
);
app.use(express.static(path.join(__dirname, "../client"), { maxAge: "1h" }));
app.use(serverBuild);

// START SERVER
app.listen(PORT, () => {
  logger.info(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
	logger.info(`[SERVER] NODE_ENV : ${NODE_ENV}`);
});

initDb()
.then(() => console.log("DB is running"))
.catch(console.error);
