import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const candidates = [
    path.resolve(__dirname, "public"),
    path.resolve(__dirname, "..", "public"),
    path.resolve(__dirname, "..", "..", "dist", "public"),
    path.resolve(process.cwd(), "dist", "public"),
  ];
  const distPath = candidates.find((p) => fs.existsSync(path.join(p, "index.html")));

  if (!distPath) {
    console.error(
      `[serveStatic] Could not find dist/public/index.html. Tried:\n${candidates.join("\n")}`
    );
    app.use("*", (_req, res) => {
      res.status(500).send("Build directory not found on server");
    });
    return;
  }

  console.log(`[serveStatic] Serving static files from: ${distPath}`);
  console.log(`[serveStatic] Assets dir exists: ${fs.existsSync(path.join(distPath, "assets"))}`);

  app.use(express.static(distPath, { index: false }));

  // SPA fallback — only for non-asset routes
  app.use("*", (req, res) => {
    if (req.originalUrl.startsWith("/assets/")) {
      return res.status(404).send("Asset not found");
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
