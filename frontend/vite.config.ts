import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { manifestForPlugIn } from "./manifest.ts";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VitePWA(manifestForPlugIn as any),
  ],
});
