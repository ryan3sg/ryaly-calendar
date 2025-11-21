import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  build: {
    lib: {
      entry: "src/main.tsx",
      name: "CldrWgt",
      fileName: "cldr-wgt",
      formats: ["umd"],
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
}));
