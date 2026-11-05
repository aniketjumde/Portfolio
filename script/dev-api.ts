/**
 * Tiny local adapter that lets `npm run dev` exercise the real Vercel
 * serverless handler in api/contact.ts. Started automatically by the
 * Vite dev proxy in vite.config.ts — you should never need to run it.
 */
import http from "node:http";
import contact from "../api/contact.js";

const PORT = Number(process.env.DEV_API_PORT ?? 8787);

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);

  let body: unknown = {};
  const raw = Buffer.concat(chunks).toString("utf8");
  if (raw) {
    try {
      body = JSON.parse(raw);
    } catch {
      body = {};
    }
  }

  // Minimal VercelRequest/VercelResponse shim
  const shimReq = Object.assign(req, { body });
  const shimRes = Object.assign(res, {
    status(code: number) {
      res.statusCode = code;
      return shimRes;
    },
    json(payload: unknown) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(payload));
      return shimRes;
    },
  });

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (contact as any)(shimReq, shimRes);
  } catch (error) {
    console.error("[dev-api] handler error:", error);
    if (!res.writableEnded) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Internal error in dev API" }));
    }
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[dev-api] contact endpoint ready on http://127.0.0.1:${PORT}/contact`);
});
