import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative base so the static build also works from a sub-path
  // (e.g. GitHub Pages at /webinar-landing/).
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Use the next free port if 3000 is busy
    host: "localhost",
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    host: "localhost",
  },
});
