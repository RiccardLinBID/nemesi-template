import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: "0.0.0.0",
    port: 0,
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    react({
      // babel: {
      //   plugins: [["babel-plugin-react-compiler"]],
      // },
    }),
  ],
});
