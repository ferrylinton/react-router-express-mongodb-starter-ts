import compression from "compression";
import express from "express";
import morgan from "morgan";

// Short-circuit the type-checking of the built output.
const BUILD_PATH = "./build/server/index.js";
const PORT = Number.parseInt(process.env.PORT || "3000");

const app = express();

app.use(compression());
app.disable("x-powered-by");

app.use(
  "/assets",
  express.static("build/client/assets", { immutable: true, maxAge: "1y" })
);
app.use(express.static("build/client", { maxAge: "1h" }));
app.use(await import(BUILD_PATH).then((mod) => mod.app));

app.use(morgan("tiny"));

app.listen(PORT, () => {
  console.log("Starting production server");
  console.log(`Server is running on http://localhost:${PORT}`);
});
