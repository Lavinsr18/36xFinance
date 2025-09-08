import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------- Logging middleware ----------
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

// ---------- Start Server ----------
(async () => {
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // Dev vs Prod
  if (app.get("env") === "development") {
    // Vite Dev Server integration
    await setupVite(app, server);
  } else {
    // Serve React build from client/dist
    const __dirname1 = path.resolve();
    app.use(express.static(path.join(__dirname1, "client", "dist")));

    // Catch-all route for React Router
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname1, "client", "dist", "index.html"));
    });
  }

  // ---------- Render Port with Auto Fallback ----------
  const basePort = parseInt(process.env.PORT || "5000", 10);

  function tryListen(port: number) {
    const listenOptions: any = { port, host: "0.0.0.0" };
    if (process.platform !== "win32") listenOptions.reusePort = true;

    server.listen(listenOptions, () => {
      log(`✅ Server is running on port ${port}`);
    }).on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        log(`⚠️ Port ${port} in use, trying ${port + 1}...`);
        tryListen(port + 1);
      } else {
        log("❌ Server failed to start:", err);
        process.exit(1);
      }
    });
  }

  tryListen(basePort);
})();
