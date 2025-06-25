import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes("node_modules")) {
  //           if (id.includes("react")) return "react";
  //           if (id.includes("react-router-dom")) return "router";
  //           if (id.includes("zustand")) return "zustand";
  //           if (id.includes("axios")) return "axios";
  //           if (id.includes("lodash")) return "lodash";
  //           return "vendor";
  //         }
  //       },
  //     },
  //   },
  //   chunkSizeWarningLimit: 1000,
  // },
});
