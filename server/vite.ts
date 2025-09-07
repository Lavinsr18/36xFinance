import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prod: serve React build
export function serveStatic(app: any) {
  const distPath = path.resolve(__dirname, "../dist");
  app.use(express.static(distPath));

  // Catch-all → React index.html
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Dev: Vite setup (if needed)
export async function setupVite(app: any, server: any) {
  const vite = await import("vite");
  const viteServer = await vite.createServer({
    server: { middlewareMode: true },
    appType: "custom"
  });
  app.use(viteServer.middlewares);
  return server;
}

// Simple logger
export function log(msg: string) {
  console.log(`[server] ${msg}`);
}
