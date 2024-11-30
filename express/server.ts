import compression from "compression";
import dotenv from 'dotenv';
import express from "express";
import morgan from "morgan";

dotenv.config();

const BUILD_PATH = process.env.REMIX_SERVER || "./server/index.js";
const PORT = Number.parseInt(process.env.PORT || "3000");

const app = express();

app.use(compression());
app.disable("x-powered-by");

app.use(
  "/assets",
  express.static("client/assets", { immutable: true, maxAge: "1y" })
);
app.use(express.static("client", { maxAge: "1h" }));
app.use(await import(
  /* webpackIgnore: true */
  BUILD_PATH
).then((mod) => mod.app));

app.use(morgan("tiny"));

app.listen(PORT, () => {
  console.log("Starting production server");
  console.log(`Server is running on http://localhost:${PORT}`);
});
