import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { envOnlyMacros } from "vite-env-only"

export default defineConfig((config) => {
  return {
    esbuild: {
      supported: {
        'top-level-await': true //browsers can handle top-level-await features
      },
    },
    build: {
      rollupOptions: config.isSsrBuild
        ? {
          input: "./server/server.ts"
        }
        : undefined,
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    plugins: [
      reactRouter(),
      tsconfigPaths(),
      envOnlyMacros()
    ],
  }
});
