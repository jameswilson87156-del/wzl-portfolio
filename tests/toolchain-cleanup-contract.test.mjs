import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const json = (relative) => JSON.parse(read(relative));
const exists = (relative) => fs.existsSync(path.join(root, relative));

test("STATIC_NGINX package contract excludes retired targets and templates", () => {
  const pkg = json("package.json");
  const all = { ...pkg.dependencies, ...pkg.devDependencies };
  for (const dependency of [
    "@cloudflare/vite-plugin",
    "wrangler",
    "drizzle-orm",
    "drizzle-kit",
    "tailwindcss",
    "@tailwindcss/postcss",
  ]) {
    assert.equal(all[dependency], undefined, `${dependency} must be absent`);
  }
  assert.equal(pkg.scripts["db:generate"], undefined);
  assert.equal(pkg.scripts.start, "npm run preview:static");
  assert.doesNotMatch(pkg.scripts.start, /vinext\s+start/);
  assert.doesNotMatch(read("vite.config.ts"), /cloudflare|wrangler|env\.ASSETS/i);
  assert.match(read("vite.config.ts"), /plugins:\s*\[vinext\(\)\]/);
  for (const retired of [
    ".openai/hosting.json",
    "worker/index.ts",
    "build/sites-vite-plugin.ts",
    "drizzle.config.ts",
    "postcss.config.mjs",
    "app/chatgpt-auth.ts",
  ]) {
    assert.equal(exists(retired), false, `${retired} must be absent`);
  }
});

test("security-compatible framework versions remain coordinated", () => {
  const pkg = json("package.json");
  assert.equal(pkg.dependencies.next, "16.2.12");
  assert.equal(pkg.devDependencies["eslint-config-next"], "16.2.12");
  assert.equal(pkg.devDependencies.vinext, "0.0.50");
  assert.equal(pkg.dependencies.react, "19.2.8");
  assert.equal(pkg.dependencies["react-dom"], pkg.dependencies.react);
  assert.equal(
    pkg.devDependencies["react-server-dom-webpack"],
    pkg.dependencies.react,
  );
  assert.equal(pkg.devDependencies.vite, "8.0.16");
  assert.doesNotMatch(pkg.devDependencies.vite, /beta|alpha|canary|rc/i);
  assert.equal(pkg.devDependencies["@vitejs/plugin-rsc"], "0.5.26");
  assert.equal(pkg.devDependencies["@vitejs/plugin-react"], "6.0.2");
});

test("static export, routes, assets and README retain the release boundary", () => {
  const nextConfig = read("next.config.ts");
  const readme = read("README.md");
  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.match(nextConfig, /trailingSlash:\s*true/);
  for (const route of [
    "dist/client/index.html",
    "dist/client/projects/commerceflow/index.html",
    "dist/client/projects/ticket/index.html",
    "dist/client/projects/devflow/index.html",
    "dist/client/404.html",
  ]) {
    assert.equal(exists(route), true, `${route} must exist`);
  }
  for (const required of [
    "public/favicon.ico",
    "public/favicon.svg",
    "public/og.jpg",
    "public/projects/commerceflow/ai-service.png",
    "public/projects/ticket/workbench.png",
    "public/projects/devflow/trace.png",
  ]) {
    assert.equal(exists(required), true, `${required} must remain`);
  }
  assert.match(readme, /Java 全栈/);
  assert.match(readme, /AI 应用开发/);
  assert.match(readme, /正式网站/);
  assert.match(readme, /https:\/\/wzl8\.top/);
  assert.match(readme, /正式公网访问/);
  assert.match(readme, /npm test：30\/30 PASS/);
  assert.match(readme, /Keyword Retrieval/);
  assert.match(
    readme,
    /不声称模型训练、算法研究或复杂自治多 Agent Runtime/,
  );
  assert.doesNotMatch(readme, /Enterprise Ticket RAG Copilot/);
  assert.doesNotMatch(readme, /DNS is not configured/);
  assert.doesNotMatch(readme, /SSL has not been requested/);
  assert.doesNotMatch(readme, /public Nginx ports 80\/443 are not enabled/);
  assert.doesNotMatch(readme, /尚未执行生产部署/);
  assert.doesNotMatch(readme, /当前不声称已完成正式公网生产发布/);
  const maps = [];
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(absolute);
      else if (entry.name.endsWith(".map")) maps.push(absolute);
    }
  };
  walk(path.join(root, "dist/client"));
  assert.deepEqual(maps, []);
});
