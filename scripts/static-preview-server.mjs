import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { pipeline } from "node:stream";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const options = {
  host: "127.0.0.1",
  port: 4173,
  directory: path.join(root, "dist", "client"),
  gzip: false,
};
for (let index = 2; index < process.argv.length; index += 1) {
  const flag = process.argv[index];
  const value = process.argv[index + 1];
  if (flag === "--host" && value) options.host = value;
  if (flag === "--port" && value) options.port = Number(value);
  if (flag === "--directory" && value) options.directory = path.resolve(value);
  if (flag === "--gzip") {
    options.gzip = true;
    continue;
  }
  if (flag.startsWith("--")) index += 1;
}

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".json", "application/json; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".rsc", "application/octet-stream"],
]);

const gzipExtensions = new Set([
  ".html",
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".rsc",
  ".svg",
]);

function safePath(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  if (decoded.includes("\0")) return null;
  const relative = decoded.replace(/^\/+/, "");
  const resolved = path.resolve(options.directory, relative);
  const base = `${path.resolve(options.directory)}${path.sep}`;
  if (resolved !== path.resolve(options.directory) && !resolved.startsWith(base)) {
    return null;
  }
  return resolved;
}

async function resolveFile(pathname) {
  if (pathname === "/") return path.join(options.directory, "index.html");
  const resolved = safePath(pathname);
  if (!resolved) return null;
  try {
    const metadata = await stat(resolved);
    if (metadata.isDirectory()) return path.join(resolved, "index.html");
    if (metadata.isFile()) return resolved;
  } catch {
    return null;
  }
  return null;
}

async function sendFile(request, response, absolute, statusCode = 200) {
  await access(absolute);
  const extension =
    path.basename(absolute) === ".rsc" ? ".rsc" : path.extname(absolute);
  const headers = {
    "Content-Type": mime.get(extension.toLowerCase()) ?? "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
  };
  const acceptsGzip = /(?:^|,)\s*gzip\s*(?:,|$)/i.test(
    request.headers["accept-encoding"] ?? "",
  );
  const compress =
    options.gzip && acceptsGzip && gzipExtensions.has(extension.toLowerCase());
  if (compress) {
    headers["Content-Encoding"] = "gzip";
    headers.Vary = "Accept-Encoding";
  } else {
    headers["Content-Length"] = String((await stat(absolute)).size);
  }
  response.writeHead(statusCode, headers);
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  if (compress) {
    pipeline(createReadStream(absolute), createGzip({ level: 6 }), response, () => {});
  } else {
    createReadStream(absolute).pipe(response);
  }
}

const server = http.createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method ?? "")) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }
  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);
  try {
    const absolute = await resolveFile(url.pathname);
    if (!absolute) throw new Error("not found");
    await sendFile(request, response, absolute);
  } catch {
    const notFound = path.join(options.directory, "404.html");
    try {
      await sendFile(request, response, notFound, 404);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not Found");
    }
  }
});

server.listen(options.port, options.host, () => {
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : options.port;
  console.log(
    JSON.stringify({
      event: "STATIC_PREVIEW_READY",
      host: options.host,
      port,
      directory: path.resolve(options.directory),
      gzip: options.gzip,
    }),
  );
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
