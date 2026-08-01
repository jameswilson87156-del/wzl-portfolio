import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");

test("Next security patch versions stay aligned and inside the approved 16.2 line", () => {
  const pkg = readJson("package.json");
  const next = pkg.dependencies.next;
  const eslintNext = pkg.devDependencies["eslint-config-next"];
  assert.equal(next, "16.2.12");
  assert.equal(eslintNext, next);
  assert.match(next, /^16\.2\.(?:1[1-9]|[2-9]\d)$/);
  assert.equal(pkg.devDependencies.vinext, "0.0.50");
  assert.equal(pkg.dependencies.react, "19.2.8");
  assert.equal(pkg.dependencies["react-dom"], pkg.dependencies.react);
  assert.equal(
    pkg.devDependencies["react-server-dom-webpack"],
    pkg.dependencies.react,
  );
});

test("static export and root RSC release gates remain active", () => {
  const nextConfig = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
  const pkg = readJson("package.json");
  const prepare = fs.readFileSync(path.join(root, "scripts/prepare-static-release.mjs"), "utf8");
  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.match(nextConfig, /trailingSlash:\s*true/);
  assert.match(pkg.scripts.build, /prepare:static/);
  assert.match(pkg.scripts.build, /verify:static/);
  assert.doesNotMatch(pkg.scripts.test, /vinext\s+start/);
  assert.doesNotMatch(pkg.scripts.test, /env\.ASSETS/);
  assert.match(prepare, /\.rsc/);
  const rootRsc = fs.readFileSync(path.join(root, "dist/client/index.rsc"));
  const alias = fs.readFileSync(path.join(root, "dist/client/.rsc"));
  assert.equal(Buffer.compare(rootRsc, alias), 0);
  assert.equal(sha256(rootRsc), sha256(alias));
});

test("release-quality changes preserve every original project evidence PNG", () => {
  const baseline = readJson("tests/security-upgrade-baseline.json");
  const protectedEvidence = baseline.files.filter((expected) =>
    /^public\/projects\/.+\.png$/.test(expected.path),
  );
  assert.equal(protectedEvidence.length, 7);
  for (const expected of protectedEvidence) {
    const file = path.join(root, ...expected.path.split("/"));
    assert.equal(fs.existsSync(file), true, `${expected.path} must still exist`);
    const actual = fs.readFileSync(file);
    assert.equal(actual.length, expected.bytes, `${expected.path} byte length changed`);
    assert.equal(sha256(actual), expected.sha256, `${expected.path} content changed`);
  }
});
