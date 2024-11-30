// vite.config.ts
import { reactRouter } from "file:///C:/Projects/react-router-express-mongodb-starter-ts/node_modules/@react-router/dev/dist/vite.js";
import autoprefixer from "file:///C:/Projects/react-router-express-mongodb-starter-ts/node_modules/autoprefixer/lib/autoprefixer.js";
import tailwindcss from "file:///C:/Projects/react-router-express-mongodb-starter-ts/node_modules/tailwindcss/lib/index.js";
import { defineConfig } from "file:///C:/Projects/react-router-express-mongodb-starter-ts/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///C:/Projects/react-router-express-mongodb-starter-ts/node_modules/vite-tsconfig-paths/dist/index.js";
var vite_config_default = defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild ? {
      input: "./server/app.ts"
    } : void 0
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  plugins: [
    reactRouter(),
    tsconfigPaths()
  ]
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxQcm9qZWN0c1xcXFxyZWFjdC1yb3V0ZXItZXhwcmVzcy1tb25nb2RiLXN0YXJ0ZXItdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFByb2plY3RzXFxcXHJlYWN0LXJvdXRlci1leHByZXNzLW1vbmdvZGItc3RhcnRlci10c1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovUHJvamVjdHMvcmVhY3Qtcm91dGVyLWV4cHJlc3MtbW9uZ29kYi1zdGFydGVyLXRzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVhY3RSb3V0ZXIgfSBmcm9tIFwiQHJlYWN0LXJvdXRlci9kZXYvdml0ZVwiO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tIFwiYXV0b3ByZWZpeGVyXCI7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcInRhaWx3aW5kY3NzXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGlzU3NyQnVpbGQgfSkgPT4gKHtcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiBpc1NzckJ1aWxkXG4gICAgICA/IHtcbiAgICAgICAgaW5wdXQ6IFwiLi9zZXJ2ZXIvYXBwLnRzXCIsXG4gICAgICB9XG4gICAgICA6IHVuZGVmaW5lZCxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW3RhaWx3aW5kY3NzLCBhdXRvcHJlZml4ZXJdLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdFJvdXRlcigpLCBcbiAgICB0c2NvbmZpZ1BhdGhzKClcbiAgXSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsU0FBUyxtQkFBbUI7QUFDN1csT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFFMUIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxXQUFXLE9BQU87QUFBQSxFQUMvQyxPQUFPO0FBQUEsSUFDTCxlQUFlLGFBQ1g7QUFBQSxNQUNBLE9BQU87QUFBQSxJQUNULElBQ0U7QUFBQSxFQUNOO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsYUFBYSxZQUFZO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWixjQUFjO0FBQUEsRUFDaEI7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
