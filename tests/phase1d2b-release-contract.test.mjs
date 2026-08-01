import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const json = (relative) => JSON.parse(read(relative));
const exists = (relative) => fs.existsSync(path.join(root, relative));
const sha256 = (relative) =>
  crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");

const originals = [
  "public/projects/commerceflow/order-inventory.png",
  "public/projects/commerceflow/ai-service.png",
  "public/projects/ticket/workbench.png",
  "public/projects/ticket/evaluation-metrics.png",
  "public/projects/ticket/trace.png",
  "public/projects/devflow/workbench.png",
  "public/projects/devflow/trace.png",
];

test("responsive previews preserve all original evidence PNG bytes", () => {
  const baseline = json("tests/security-upgrade-baseline.json");
  const expected = new Map(baseline.files.map((entry) => [entry.path, entry.sha256]));
  for (const relative of originals) {
    assert.equal(exists(relative), true, relative);
    assert.equal(sha256(relative), expected.get(relative), relative);
  }
  const manifest = json("tests/fixtures/phase1d2b-image-derivative-manifest.json");
  assert.equal(manifest.images.length, 6);
  for (const image of manifest.images) {
    assert.equal(image.derivatives.length, 4);
    assert.deepEqual(image.derivatives.slice(0, 3).map((item) => item.width), [480, 768, 1280]);
    for (const derivative of image.derivatives) {
      assert.equal(exists(`public/${derivative.path}`), true, derivative.path);
      assert.equal(sha256(`public/${derivative.path}`), derivative.sha256);
    }
  }
});

test("screenshot system uses responsive previews and loads originals only while open", () => {
  const viewer = read("app/projects/_components/ImageViewer.tsx");
  const data = read("app/portfolio-data.ts");
  const home = read("app/page.tsx");
  const screenshot = read("app/projects/_components/ProjectScreenshot.tsx");
  const frame = read("app/projects/_components/ScreenshotFrame.tsx");
  assert.match(viewer, /originalSrc/);
  assert.match(viewer, /srcSet=\{image\.responsiveSrcSet\}/);
  assert.match(viewer, /sizes=\{image\.sizes\}/);
  assert.match(viewer, /loading="lazy"/);
  assert.match(viewer, /current \? \(/);
  assert.match(viewer, /src=\{current\.originalSrc\}/);
  assert.match(viewer, /href=\{image\.originalSrc\}/);
  assert.match(screenshot, /ImageViewer/);
  assert.match(frame, /screenshot-windowbar/);
  assert.match(frame, /data-reveal="screenshot-frame"/);
  assert.match(home, /frameKind="card"/);
  assert.match(home, /project\.primaryImage/);
  assert.doesNotMatch(home, /function ProjectVisual\(\{ tone \}/);
  assert.doesNotMatch(home, /commerce-visual|ticket-visual|flow-visual/);
  assert.match(home, /data-view-transition-title/);
  assert.match(home, /<a[\s\S]*className="project-screenshot-link"/);
  assert.match(data, /480w[\s\S]*768w[\s\S]*1280w/);
  assert.match(data, /projects\/ticket\/responsive\/trace-480w\.webp/);
});

test("ImageViewer close lifecycle restores its real opener and keeps 44px targets", () => {
  const viewer = read("app/projects/_components/ImageViewer.tsx");
  const css = read("app/globals.css");
  assert.match(viewer, /openerRef\.current = event\.currentTarget/);
  assert.match(viewer, /dialog\.close\(\)/);
  assert.match(viewer, /onClose=\{restoreFocus\}/);
  assert.match(viewer, /requestAnimationFrame/);
  assert.match(viewer, /focus\(\{ preventScroll: true \}\)/);
  assert.match(viewer, /if \(!dialog\.open\) dialog\.showModal\(\)/);
  assert.match(viewer, /setMode\("fit"\)/);
  assert.match(viewer, /data-viewer-mode=\{mode\}/);
  assert.match(viewer, /ArrowLeft/);
  assert.match(viewer, /ArrowRight/);
  assert.match(viewer, /NEXT →/);
  assert.match(viewer, /← PREV/);
  assert.match(viewer, /data-viewer-state=\{viewerState\}/);
  assert.match(viewer, /data-viewer-direction=\{direction\}/);
  assert.match(viewer, /aria-busy=\{loadedSrc !== current\.originalSrc\}/);
  assert.match(viewer, /onLoad=\{\(\) => setLoadedSrc\(current\.originalSrc\)\}/);
  assert.match(css, /data-viewer-direction="previous"[\s\S]*translateX\(-6px\)/);
  assert.match(css, /data-viewer-direction="next"[\s\S]*translateX\(6px\)/);
  assert.doesNotMatch(css, /\.image-viewer button[^\n]*min-height:\s*38px/);
  assert.match(css, /\.image-viewer button[^\n]*min-width:\s*(?:4[4-9]|[5-9]\d)px[^\n]*min-height:\s*(?:4[4-9]|[5-9]\d)px/);
});

test("project screenshots retain dimensions, alt text and restrained hover scale", () => {
  const data = read("app/portfolio-data.ts");
  const css = read("app/globals.css");
  const casePage = read("app/projects/_components/ProjectCase.tsx");
  assert.match(data, /label: "TRACE TIMELINE \/ EVIDENCE"/);
  assert.equal((data.match(/originalSrc: "\/projects\//g) ?? []).length, 7);
  assert.equal((data.match(/responsiveSrc: "\/projects\//g) ?? []).length, 7);
  assert.equal((data.match(/alt: /g) ?? []).length >= 7, true);
  assert.equal((data.match(/width: \d+/g) ?? []).length >= 7, true);
  assert.equal((data.match(/height: \d+/g) ?? []).length >= 7, true);
  assert.match(casePage, /case-metric-evidence/);
  assert.match(casePage, /id="case-failures"/);
  assert.match(casePage, /data-active-section="case-summary"/);
  const caseNav = read("app/projects/_components/CaseSectionNav.tsx");
  assert.match(caseNav, /--case-progress/);
  assert.match(caseNav, /Math\.min\(1, Math\.max\(0,/);
  assert.match(caseNav, /requestAnimationFrame\(paintProgress\)/);
  assert.match(caseNav, /caseRoot\.dataset\.activeSection/);
  assert.match(css, /scale\(1\.01\)/);
  assert.match(css, /@view-transition\s*\{[\s\S]*navigation:\s*auto/);
  assert.match(css, /case-section-progress/);
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*view-transition/);
  assert.doesNotMatch(css, /project-screenshot[^\n]*rotate\(/);
});

test("accessible names, skip link and WeChat text retain visible wording", () => {
  const home = read("dist/client/index.html");
  const viewer = read("app/projects/_components/ImageViewer.tsx");
  const contact = read("app/_components/ContactActions.tsx");
  assert.match(home, /class="skip-link" href="#main-content"/);
  assert.equal((home.match(/id="main-content"/g) ?? []).length, 1);
  assert.equal((home.match(/VIEW CASE/g) ?? []).length, 0);
  assert.equal((home.match(/class="project-links"/g) ?? []).length, 3);
  assert.match(viewer, /VIEW ORIGINAL/);
  assert.match(viewer, /CLOSE/);
  assert.doesNotMatch(contact, /aria-label=\{WECHAT_ID\}/);
  assert.match(contact, /<span className="wechat-letter-prefix">ll<\/span>/);
  assert.match(contact, /<span>467113957<\/span>/);
  assert.match(contact, /const WECHAT_ID = "ll467113957"/);
  assert.match(contact, /aria-describedby="wechat-id-description"/);
});

test("canonical, social metadata, robots and sitemap expose only the four public routes", () => {
  const expected = [
    ["dist/client/index.html", "https://wzl8.top/"],
    ["dist/client/projects/commerceflow/index.html", "https://wzl8.top/projects/commerceflow/"],
    ["dist/client/projects/ticket/index.html", "https://wzl8.top/projects/ticket/"],
    ["dist/client/projects/devflow/index.html", "https://wzl8.top/projects/devflow/"],
  ];
  for (const [relative, canonical] of expected) {
    const html = read(relative);
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical.replaceAll("/", "\\/")}"`));
    assert.match(html, /property="og:image" content="https:\/\/wzl8\.top\/og\.jpg"/);
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
  }
  assert.equal(exists("dist/client/robots.txt"), true);
  assert.equal(exists("dist/client/sitemap.xml"), true);
  const sitemap = read("dist/client/sitemap.xml");
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 4);
  assert.doesNotMatch(sitemap, /localhost|\.rsc|github\.com|404/);
  assert.doesNotMatch([read("app/layout.tsx"), ...expected.slice(1).map(([file]) => read(file))].join("\n"), /Organization|Employer/);
});

test("framework versions and production dependency surface remain frozen", () => {
  const pkg = json("package.json");
  assert.equal(pkg.dependencies.next, "16.2.12");
  assert.equal(pkg.devDependencies["eslint-config-next"], "16.2.12");
  assert.equal(pkg.devDependencies.vinext, "0.0.50");
  assert.equal(pkg.dependencies.react, "19.2.8");
  assert.equal(pkg.dependencies["react-dom"], "19.2.8");
  assert.equal(pkg.devDependencies["react-server-dom-webpack"], "19.2.8");
  assert.equal(pkg.devDependencies.vite, "8.0.16");
  assert.equal(Object.keys(pkg.dependencies).length, 3);
  assert.equal(Object.values({ ...pkg.dependencies, ...pkg.devDependencies }).some((value) => /motion|anime|gsap/i.test(value)), false);
});
