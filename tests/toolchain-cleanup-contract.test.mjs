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
  assert.equal(pkg.dependencies.next, "16.4.3");
  assert.equal(pkg.devDependencies["eslint-config-next"], "16.4.3");
  assert.equal(pkg.devDependencies.vinext, "0.0.50");
  assert.equal(pkg.dependencies.react, "19.2.8");
  assert.equal(pkg.dependencies["react-dom"], pkg.dependencies.react);
  assert.equal(
    pkg.devDependencies["react-server-dom-webpack"],
    pkg.dependencies.react,
  );
  assert.equal(pkg.devDependencies.vite, "8.3.5");
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
    "public/og-testdev.jpg",
    "public/og-testdev.svg",
    "public/projects/commerceflow/ai-service.png",
    "public/projects/ticket/workbench.png",
    "public/projects/devflow/trace.png",
  ]) {
    assert.equal(exists(required), true, `${required} must remain`);
  }
  assert.match(readme, /测试开发实习/);
  assert.match(readme, /Gitea Quality Lab/);
  assert.match(readme, /PromptOps Studio/);
  assert.match(readme, /24 通过、2 失败/);
  assert.match(readme, /当前公开测试开发作品集/);
  assert.match(readme, /https:\/\/ai-agent-portfolio-hub\.vercel\.app/);
  assert.match(readme, /https:\/\/wzl8\.top/);
  assert.match(readme, /本仓库的测试开发静态版还没有部署到该域名/);
  assert.match(readme, /当前线上仍是旧版 Java 后端 \/ AI 应用定位/);
  assert.match(readme, /npm ci.*使用现有 lockfile/);
  assert.match(readme, /工程背景案例/);
  assert.match(readme, /CommerceFlow.*Enterprise AI Ticket Copilot.*DevFlow Copilot/);
  assert.match(readme, /确定性 Mock Agent/);
  assert.match(readme, /测试开发改版已通过 PR .* 合入 `main`/);
  assert.match(readme, /活跃 VU 峰值为 1/);
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
