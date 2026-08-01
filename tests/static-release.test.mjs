import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { once } from "node:events";
import {
  access,
  readFile,
  readdir,
  stat,
} from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "client");
const routes = [
  "index.html",
  "projects/commerceflow/index.html",
  "projects/ticket/index.html",
  "projects/devflow/index.html",
];
const projectRsc = [
  "projects/commerceflow.rsc",
  "projects/ticket.rsc",
  "projects/devflow.rsc",
];
const evidenceImages = [
  "projects/commerceflow/ai-service.png",
  "projects/commerceflow/order-inventory.png",
  "projects/ticket/evaluation-metrics.png",
  "projects/ticket/trace.png",
  "projects/ticket/workbench.png",
  "projects/devflow/trace.png",
  "projects/devflow/workbench.png",
];
const responsiveImages = [
  "projects/commerceflow/responsive/order-inventory-480w.webp",
  "projects/commerceflow/responsive/ai-service-480w.webp",
  "projects/ticket/responsive/workbench-480w.webp",
  "projects/ticket/responsive/evaluation-metrics-480w.webp",
  "projects/devflow/responsive/workbench-480w.webp",
  "projects/devflow/responsive/trace-480w.webp",
];

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

async function allFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await allFiles(absolute)));
    else files.push(absolute);
  }
  return files;
}

function countTags(html, tag) {
  return (html.match(new RegExp(`<${tag}\\b`, "gi")) ?? []).length;
}

async function startPreview() {
  const child = spawn(
    process.execPath,
    [
      path.join(root, "scripts", "static-preview-server.mjs"),
      "--host",
      "127.0.0.1",
      "--port",
      "0",
      "--directory",
      output,
    ],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
  );
  let buffer = "";
  const ready = new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Static preview did not start")),
      10_000,
    );
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      buffer += chunk;
      for (const line of buffer.split(/\r?\n/)) {
        if (!line.includes("STATIC_PREVIEW_READY")) continue;
        clearTimeout(timer);
        resolve(JSON.parse(line));
      }
    });
    child.once("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Static preview exited early with ${code}`));
    });
  });
  const info = await ready;
  return { child, baseURL: `http://${info.host}:${info.port}` };
}

test("static release contains the complete deployable contract", async () => {
  await access(output);
  await Promise.all(
    [
      ...routes,
      "404.html",
      "index.rsc",
      ".rsc",
      ...projectRsc,
      ...evidenceImages,
      ...responsiveImages,
      "favicon.ico",
      "og.jpg",
      "robots.txt",
      "sitemap.xml",
      "static-release-manifest.json",
    ].map((relative) => access(path.join(output, relative))),
  );

  const files = await allFiles(output);
  assert.ok(files.some((file) => file.endsWith(".css")), "CSS asset missing");
  assert.ok(files.some((file) => file.endsWith(".js")), "JS asset missing");
  assert.equal(
    files.filter((file) => file.endsWith(".map")).length,
    0,
    "source maps must not be published",
  );

  const indexRsc = await readFile(path.join(output, "index.rsc"));
  const aliasRsc = await readFile(path.join(output, ".rsc"));
  assert.ok(indexRsc.equals(aliasRsc));
  assert.equal(sha256(indexRsc), sha256(aliasRsc));

  for (const route of routes) {
    const html = await readFile(path.join(output, route), "utf8");
    assert.equal(countTags(html, "main"), 1, `${route} main count`);
    assert.equal(countTags(html, "h1"), 1, `${route} h1 count`);
  }

  const manifest = JSON.parse(
    await readFile(path.join(output, "static-release-manifest.json"), "utf8"),
  );
  assert.equal(manifest.rootRsc.byteIdentical, true);
  assert.equal(manifest.rootRsc.sha256, sha256(indexRsc));
  assert.equal(manifest.assertions.evidenceImages, 7);
});

test("static preview serves routes and RSC without Vinext or Cloudflare bindings", async () => {
  const { child, baseURL } = await startPreview();
  try {
    for (const route of [
      "/",
      "/projects/commerceflow/",
      "/projects/ticket/",
      "/projects/devflow/",
    ]) {
      const response = await fetch(`${baseURL}${route}`);
      assert.equal(response.status, 200, route);
      assert.match(response.headers.get("content-type") ?? "", /^text\/html/i);
      assert.doesNotMatch(await response.text(), /Directory listing/i);
    }
    for (const asset of ["/robots.txt", "/sitemap.xml", "/og.jpg", ...responsiveImages.map((value) => `/${value}`)]) {
      const response = await fetch(`${baseURL}${asset}`);
      assert.equal(response.status, 200, asset);
    }
    for (const route of [
      "/.rsc",
      "/.rsc?_rsc=contract-test",
      "/projects/commerceflow.rsc",
      "/projects/ticket.rsc",
      "/projects/devflow.rsc",
    ]) {
      const response = await fetch(`${baseURL}${route}`);
      assert.equal(response.status, 200, route);
      assert.equal(
        response.headers.get("content-type"),
        "application/octet-stream",
      );
    }
    const missing = await fetch(`${baseURL}/not-a-real-static-route`);
    assert.equal(missing.status, 404);
    assert.doesNotMatch(await missing.text(), /Directory listing/i);
    const traversal = await fetch(`${baseURL}/%2e%2e/package.json`);
    assert.equal(traversal.status, 404);
  } finally {
    child.kill("SIGTERM");
    await Promise.race([
      once(child, "exit"),
      new Promise((resolve) => setTimeout(resolve, 3_000)),
    ]);
  }
  assert.equal(
    (await stat(path.join(output, ".rsc"))).size,
    (await stat(path.join(output, "index.rsc"))).size,
  );
});
