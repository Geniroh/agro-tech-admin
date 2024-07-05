import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  base: "/",
  plugins: [react()],
  preview: {
    port: 3000,
    strictPort: false,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    origin: `http://0.0.0.0:${process.env.PORT}`,
  },
});
