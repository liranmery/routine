/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/routine/",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
    exclude: [...configDefaults.exclude, "e2e"],
  },
});
