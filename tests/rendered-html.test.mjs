import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the portfolio and its evidence links", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /王震龙 · AI 应用开发作品集/);
  assert.match(html, /CommerceFlow AI Mall/);
  assert.match(html, /Enterprise AI Ticket Copilot/);
  assert.match(html, /DevFlow Copilot/);
  assert.match(html, /github\.com\/jameswilson87156-del\/commerceflow-ai-mall/);
  assert.match(html, /mailto:467113957@qq\.com/);
});
