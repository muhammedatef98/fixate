import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";


const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // Heavy charting library — only used in admin dashboard
          if (id.includes("recharts") || id.includes("/d3-")) return "vendor-charts";
          // Animation library
          if (id.includes("framer-motion")) return "vendor-motion";
          // tRPC + React Query (data layer)
          if (id.includes("@trpc")) return "vendor-trpc";
          if (id.includes("@tanstack/react-query")) return "vendor-trpc";
          // Radix UI primitives
          if (id.includes("@radix-ui")) return "vendor-radix";
          // OpenAI SDK — backend only, shouldn't land in frontend bundle
          // but tree-shake it here as a safety net
          if (id.includes("openai")) return "vendor-openai";
        },
      },
    },
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    hmr: {
      protocol: 'wss',
      host: '3000-ihzv0kq89w61pg1oaj1wp-b5841e30.manus-asia.computer',
      clientPort: 443,
    },
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
