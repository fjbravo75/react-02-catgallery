import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const ruta = (archivo) => fileURLToPath(new URL(archivo, import.meta.url));

export default defineConfig({
  base: "./",
  build: {
    outDir: "docs",
    minify: false,
    cssMinify: false,
    rollupOptions: {
      input: {
        index: ruta("./index.html"),
        favoritos: ruta("./favoritos.html")
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/styles.css";
          }

          return "assets/[name][extname]";
        },
        chunkFileNames: "assets/[name].js",
        entryFileNames: "assets/[name].js",
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "react";
          }

          return undefined;
        }
      }
    }
  },
  plugins: [react()]
});

