import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace Shiven14 and repo name if different:
const repo = "url-shortener"; // your repo name
export default defineConfig({
  plugins: [react()],
  base: `/${repo}/`,
});
