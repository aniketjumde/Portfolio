import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { spawn } from "node:child_process";
import path from "node:path";
import type { Plugin } from "vite";

/**
 * Vite cannot execute Vercel serverless functions, so in dev we mount a tiny
 * proxy that forwards /api/* to a short-lived Node adapter around api/*.ts.
 * Without this, `npm run dev` serves the SPA for /api/contact and the contact
 * form silently fails (the production build is unaffected).
 */
function devApiPlugin(): Plugin {
  let child: ReturnType<typeof spawn> | null = null;
  let starting: Promise<void> | null = null;
  const PORT = 8787;

  return {
    name: "dev-api-proxy",
    apply: "serve",
    configureServer(server) {
      /** Boots the adapter if needed and resolves once it accepts connections. */
      const ensureAdapter = async () => {
        const isAlive = child !== null && child.exitCode === null && !child.killed;
        if (isAlive) return;
        if (starting) return starting;

        starting = (async () => {
          child = spawn("npx", ["tsx", "script/dev-api.ts"], {
            stdio: "inherit",
            env: { ...process.env, DEV_API_PORT: String(PORT) },
          });

          // Drop the stale handle so a later request can respawn it.
          child.on("exit", () => {
            child = null;
          });

          // Poll until the adapter actually answers instead of guessing.
          const deadline = Date.now() + 20_000;
          while (Date.now() < deadline) {
            try {
              await fetch(`http://127.0.0.1:${PORT}/contact`, { method: "POST" });
              return;
            } catch {
              await new Promise((r) => setTimeout(r, 250));
            }
          }
          console.warn("[dev-api] adapter did not start within 20s");
        })();

        try {
          await starting;
        } finally {
          starting = null;
        }
      };

      server.middlewares.use("/api", async (req, res, next) => {
        await ensureAdapter();
        const target = `http://127.0.0.1:${PORT}${req.url ?? "/"}`;

        const chunks: Buffer[] = [];
        req.on("data", (chunk) => chunks.push(chunk as Buffer));
        req.on("end", async () => {
          try {
            const response = await fetch(target, {
              method: req.method,
              headers: {
                "content-type": req.headers["content-type"] ?? "application/json",
              },
              body: ["GET", "HEAD"].includes(req.method ?? "") ? undefined : Buffer.concat(chunks),
            });

            res.statusCode = response.status;
            response.headers.forEach((value, key) => {
              if (!["content-encoding", "transfer-encoding"].includes(key)) {
                res.setHeader(key, value);
              }
            });
            const text = await response.text();
            res.end(text);
          } catch (error) {
            next(error as Error);
          }
        });
      });

      server.httpServer?.on("close", () => {
        child?.kill();
        child = null;
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  root: ".",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2020",
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
