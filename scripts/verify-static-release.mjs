import { createHash } from "node:crypto";
import {
  access,
  readFile,
  readdir,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "client");
const manifestPath = path.join(output, "static-release-manifest.json");
const core = new Set([
  "index.html",
  "index.rsc",
  ".rsc",
  "404.html",
  "projects/commerceflow/index.html",
  "projects/ticket/index.html",
  "projects/devflow/index.html",
  "projects/commerceflow.rsc",
  "projects/ticket.rsc",
  "projects/devflow.rsc",
  "favicon.ico",
  "og.jpg",
  "robots.txt",
  "sitemap.xml",
]);
const evidenceImages = [
  "projects/commerceflow/ai-service.png",
  "projects/commerceflow/order-inventory.png",
  "projects/ticket/evaluation-metrics.png",
  "projects/ticket/trace.png",
  "projects/ticket/workbench.png",
  "projects/devflow/trace.png",
  "projects/devflow/workbench.png",
];

function typeFor(relative) {
  const extension = path.extname(relative).toLowerCase();
  if (relative === ".rsc" || extension === ".rsc") return "rsc";
  if (extension === ".html") return "html";
  if (extension === ".css") return "css";
  if ([".js", ".mjs"].includes(extension)) return "javascript";
  if ([".png", ".svg", ".ico", ".jpg", ".jpeg", ".webp"].includes(extension)) {
    return "image";
  }
  if (extension === ".json") return "json";
  return "other";
}

async function walk(directory) {
  const rows = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) rows.push(...(await walk(absolute)));
    else rows.push(absolute);
  }
  return rows;
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

await access(output);
await Promise.all(
  [...core, ...evidenceImages].map((relative) =>
    access(path.join(output, relative)),
  ),
);

const files = (await walk(output))
  .filter((absolute) => absolute !== manifestPath)
  .sort((a, b) => a.localeCompare(b));
const relativeFiles = files.map((absolute) =>
  path.relative(output, absolute).replaceAll(path.sep, "/"),
);
const sourceMaps = relativeFiles.filter((relative) => relative.endsWith(".map"));
if (sourceMaps.length > 0) {
  throw new Error(`Unexpected source maps: ${sourceMaps.join(", ")}`);
}
if (!relativeFiles.some((relative) => relative.endsWith(".css"))) {
  throw new Error("Static release has no CSS asset");
}
if (!relativeFiles.some((relative) => relative.endsWith(".js"))) {
  throw new Error("Static release has no JavaScript asset");
}
if (evidenceImages.some((relative) => !relativeFiles.includes(relative))) {
  throw new Error("Static release is missing an evidence image");
}

const rootRsc = await readFile(path.join(output, "index.rsc"));
const rootAlias = await readFile(path.join(output, ".rsc"));
if (!rootRsc.equals(rootAlias) || sha256(rootRsc) !== sha256(rootAlias)) {
  throw new Error(".rsc and index.rsc are not byte-identical");
}

const entries = [];
for (const absolute of files) {
  const relative = path.relative(output, absolute).replaceAll(path.sep, "/");
  const bytes = await readFile(absolute);
  const metadata = await stat(absolute);
  entries.push({
    path: relative,
    size: metadata.size,
    sha256: sha256(bytes),
    type: typeFor(relative),
    core: core.has(relative) || evidenceImages.includes(relative),
  });
}

const manifest = {
  version: 1,
  output: "dist/client",
  generatedAt: new Date().toISOString(),
  rootRsc: {
    source: "index.rsc",
    alias: ".rsc",
    size: rootRsc.length,
    sha256: sha256(rootRsc),
    byteIdentical: true,
  },
  assertions: {
    sourceMaps: 0,
    directoryListing: false,
    htmlRoutes: 5,
    projectRscFiles: 3,
    evidenceImages: evidenceImages.length,
  },
  files: entries,
};
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(
  JSON.stringify(
    {
      output: manifest.output,
      files: entries.length,
      coreFiles: entries.filter((entry) => entry.core).length,
      rootRsc: manifest.rootRsc,
      sourceMaps: 0,
      manifest: "dist/client/static-release-manifest.json",
    },
    null,
    2,
  ),
);
