import compression from "compression";
import express from "express";
import morgan from "morgan";

const PORT = Number.parseInt(process.env.PORT || "3000");

const viteDevServer = await import("vite").then((vite) =>
  vite.createServer({
    server: { middlewareMode: true },
  })
);

const app = express();

app.use(compression());
app.disable("x-powered-by");
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

app.use(morgan("tiny"));

app.listen(PORT, () => {
  console.log("Starting development server");
  console.log(`Server is running on http://localhost:${PORT}`);
});
