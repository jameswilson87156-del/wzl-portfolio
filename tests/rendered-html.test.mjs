import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const commerceSha = "954d56e01e4e4fe4bf5cc8a16becf60747305b68";
const ticketSha = "924d40babbb06955c385e9b1106f9ffcbf6c0ea2";
const ticketLoadSha = "bf97f2e0f1c45efb34facfb4b07d258c88aec6fe";
const devFlowSha = "c9cefd4bbbf30d27579efe7d023a83f764f28736";
const oldDevFlowMetricsSha =
  "3b54c08a581dcd90a1a3f746be119356b5de41d5";

async function render(pathname = "/") {
  const normalized = pathname === "/" ? "" : pathname.replace(/^\/|\/$/g, "");
  const htmlUrl = new URL(
    normalized
      ? `../dist/client/${normalized}/index.html`
      : "../dist/client/index.html",
    import.meta.url,
  );
  const html = await readFile(htmlUrl, "utf8");
  return new Response(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function countTags(html, tag) {
  return (html.match(new RegExp(`<${tag}\\b`, "gi")) ?? []).length;
}

function extractAttribute(tag, name) {
  return tag.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? "";
}

test("homepage prioritizes test-development projects and preserves evidence boundaries", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();

  assert.match(html, /测试开发实习方向/);
  assert.match(html, /AI Agent 评测/);
  assert.match(html, /王震龙 · 软件工程本科 · 2027 届/);
  assert.match(html, /class="hero-direction-tags hero-capability-rail"/);
  assert.match(html, /aria-label="求职方向与项目入口"/);
  assert.equal(
    (html.match(/<a class="hero-capability hero-capability--/g) ?? []).length,
    3,
  );
  for (const href of [
    "#project-gitea-quality-lab",
    "#project-promptops",
    "#engineering-background",
  ]) {
    assert.match(html, new RegExp(`class="hero-capability[^"]*" href="${href}"`));
  }
  assert.match(html, /<nav[^>]*class="hero-project-index[^>]*aria-label="重点项目"/);
  assert.equal((html.match(/class="hero-project-link"/g) ?? []).length, 2);
  assert.match(html, /API → BROWSER → SQLITE/);
  assert.match(html, /DATASET → MOCK → TRACE/);
  assert.match(html, /TWO QA PROJECTS \/ CLICK FOR EVIDENCE/);
  assert.match(html, /CASE → ASSERTION → TRACE/);
  assert.match(html, /执行状态与被测行为结果分开呈现/);
  assert.match(html, /id="project-gitea-quality-lab"/);
  assert.match(html, /id="project-promptops"/);
  assert.match(html, /24 \/ 24/);
  assert.match(html, /16 \/ 16/);
  assert.match(html, /26 \/ 26/);
  assert.match(html, /24 \/ 26/);
  assert.match(html, /agent-014/);
  assert.match(html, /agent-015/);
  assert.match(html, /活跃 VU 峰值为 1/);
  assert.match(html, /Mock \/ 规则评测，无真实模型准确率/);
  assert.match(html, /不代表发现了 40 个 Gitea 产品缺陷/);
  assert.match(
    html,
    /href="https:\/\/github\.com\/jameswilson87156-del\/gitea-quality-lab\/actions\/runs\/40710451708"/,
  );
  assert.match(
    html,
    /href="https:\/\/github\.com\/jameswilson87156-del\/ai-agent-eval-promptops\/actions\/runs\/40724124012"/,
  );
  assert.ok(
    html.indexOf("Gitea Quality Lab") < html.indexOf("PROJECT 02 · AI AGENT EVALUATION"),
    "Gitea should be the first test-development project",
  );
  assert.ok(
    html.indexOf("PROJECT 02 · AI AGENT EVALUATION") < html.indexOf("ENGINEERING BACKGROUND · VERIFIED"),
    "test-development projects should appear before engineering-background cases",
  );
  assert.match(html, /Java 后端核心/);
  assert.match(html, /ABOUT &amp; STACK/);
  assert.match(html, /主要寻找测试开发实习/);
  assert.match(html, /南京玻璃纤维研究设计院有限公司江宁分公司/);
  assert.match(html, /2026\.07–2026\.09[\s\S]*Spring Boot 3[\s\S]*MyBatis\/MyBatis-Plus/);
  assert.match(html, /REST API、CRUD、分页与关联查询/);
  assert.match(html, /Java 后端实践帮助我理解业务状态/);
  assert.match(html, /2027 届[\s\S]*一周内可到岗[\s\S]*每周可实习 6 天/);
  assert.match(html, /可连续实习 6 个月[\s\S]*接受异地实习/);
  assert.match(html, /TEST AUTOMATION &amp; SYSTEM QA/);
  assert.match(html, /AGENT EVALUATION &amp; QUALITY SIGNALS/);
  assert.match(html, /PromptOps 使用确定性 Mock Agent/);
  assert.match(html, /核心求职方向已转为测试开发/);
  assert.equal((html.match(/class="project-contribution"/g) ?? []).length, 3);
  assert.match(html, /业务正确性边界、幂等与库存回放，以及 MySQL 证据链。/);
  assert.match(html, /检索、引用、人工复核边界、synthetic evaluation，以及 Retrieval V2、Python AI sidecar API \/ observability \/ load-test 的分版本验收。/);
  assert.match(html, /Provider、Prompt、Tool Call 与 Run Evidence 链路。/);
  assert.match(html, /<h2 class="sr-only">工程方法<\/h2>/);
  assert.match(html, /FULL EVIDENCE LEDGER/);
  assert.match(html, /50 REQUESTS · LOCAL REPLAY/);
  assert.match(html, /TOP-K · SYNTHETIC EVAL/);
  assert.match(html, /TEST DESIGN · AUTOMATION · FAILURE EVIDENCE/);
  assert.match(html, /可核验的运行证据/);
  assert.doesNotMatch(html, /查看最强项目/);
  assert.match(html, /查看测试开发项目/);
  assert.match(html, /href="#projects"/);
  assert.match(html, />GitHub<\/span>/);
  assert.match(html, /2027 GRAD · OPEN TO INTERNSHIP/);
  assert.doesNotMatch(html, /AVAILABLE FOR INTERNSHIP · 2026/);
  assert.match(html, /CommerceFlow AI Mall/);
  assert.match(html, /Enterprise AI Ticket Copilot/);
  assert.match(html, /AI TOOLING \/ AGENT WORKFLOW/);
  assert.match(html, /01[\s\S]*BUILD/);
  assert.match(html, /02[\s\S]*VERIFY/);
  assert.match(html, /03[\s\S]*EXPLAIN/);
  assert.match(
    html,
    /如团队正在招聘相关实习生，欢迎通过邮箱、微信或 GitHub 联系我。/,
  );

  assert.equal(countTags(html, "main"), 1);
  assert.equal(countTags(html, "h1"), 1);
  assert.equal(countTags(html, "header"), 1);
  assert.equal(countTags(html, "footer"), 1);
  assert.match(html, />WZL<\/span>[\s\S]*PORTFOLIO/);
  assert.match(html, /class="nav-mobile-menu"/);
  assert.match(html, /打开站点菜单/);
  assert.match(html, /href="#projects"[\s\S]*>项目<\/span>/);
  assert.match(html, /href="\/favicon\.ico"/);
  assert.match(
    html,
    /寻求[\s\S]*测试开发[\s\S]*AI 测试 \/ Agent 评测[\s\S]*实习机会。/,
  );
  assert.match(html, /Java 后端实践作为理解被测系统的工程背景/);
  assert.match(html, /王震龙｜测试开发 · AI Agent 评测作品集/);
  assert.match(html, /og:image" content="https:\/\/wzl8\.top\/og-testdev\.jpg"/);
  assert.match(
    html,
    /王震龙，2027 届软件工程本科生，测试开发实习方向。展示 API 与 Web 自动化/,
  );
  assert.doesNotMatch(html, /简历下载|求职城市|头像|QQ|添加我为朋友/);
});

test("contact actions expose a truthful WeChat ID copy interaction", async () => {
  const response = await render("/");
  const html = await response.text();
  const contact = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] ?? "";
  const source = await readFile(
    new URL("../app/_components/ContactActions.tsx", import.meta.url),
    "utf8",
  );

  assert.ok(contact);
  assert.match(contact, />EMAIL</);
  assert.match(contact, />WECHAT</);
  assert.match(contact, />GITHUB</);
  assert.doesNotMatch(contact, />QQ</);
  assert.match(contact, /467113957@qq\.com/);
  assert.match(contact, />ll<\/span><span>467113957<\/span>/);
  assert.match(contact, /复制微信号/);
  assert.match(contact, /前两位为两个小写字母 l，复制后在微信中搜索添加/);
  assert.doesNotMatch(contact, /id="wechat-id-value"[^>]*aria-label=/);
  assert.match(contact, /aria-live="polite"/);
  assert.doesNotMatch(contact, /二维码待重新提供/);
  assert.doesNotMatch(contact, /原文件格式与识别验证未通过/);
  assert.doesNotMatch(contact, /\/contact\/wechat-qr\.png|weixin:\/\//);
  assert.match(source, /微信号已复制，请在微信中搜索添加。/);
  assert.match(source, /复制失败，请手动复制微信号。/);
  assert.match(source, /1600/);
  assert.match(source, /const WECHAT_ID = "ll467113957"/);
  assert.doesNotMatch(source, /11467113957/);
  assert.doesNotMatch(source, /ll 467113957/);
  assert.doesNotMatch(source, /wechat-qr\.png|weixin:\/\//);
  assert.match(
    contact,
    /mailto:467113957@qq\.com\?subject=%E5%85%B3%E4%BA%8E%20%E6%B5%8B%E8%AF%95%E5%BC%80%E5%8F%91%E5%AE%9E%E4%B9%A0%E7%9A%84%E6%B2%9F%E9%80%9A/,
  );
  assert.match(contact, /复制邮箱/);
  assert.match(
    contact,
    /href="https:\/\/github\.com\/jameswilson87156-del"[^>]*target="_blank"[^>]*rel="noreferrer"/,
  );
  assert.match(contact, /打开王震龙的 GitHub 主页/);
  assert.doesNotMatch(
    contact,
    /<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<button\b/i,
  );
  assert.doesNotMatch(
    contact,
    /<button\b[^>]*>(?:(?!<\/button>)[\s\S])*<a\b/i,
  );
});

test("homepage evidence items keep the Phase 1A evidence contract", async () => {
  const response = await render("/");
  const html = await response.text();
  const items =
    html.match(/<(?:a|div|article)\b[^>]*data-evidence="true"[^>]*>/g) ?? [];

  assert.ok(items.length >= 10, "expected structured evidence for all projects");
  for (const item of items) {
    assert.match(item, /data-claim="[^"]+"/);
    assert.match(item, /data-scope="[^"]+"/);
    assert.match(item, /data-verified-at="\d{4}-\d{2}-\d{2}"/);
    assert.match(item, /data-boundary="[^"]+"/);
    assert.match(
      item,
      /data-verification-type="(?:ci|local|documentation|synthetic-evaluation)"/,
    );
  }

  assert.match(html, /ORDER RELIABILITY VERIFIED ×3/);
  assert.match(html, /291 BACKEND TESTS/);
  assert.match(html, /6 FRONTEND TESTS/);
  assert.match(html, /16 SYNTHETIC EVAL CASES/);
  assert.match(html, /FRONTEND TEST \+ BUILD PASS/);
  assert.match(html, /BACKEND MAVEN VERIFY PASS/);

  const commerce =
    html.match(
      /<article[^>]*data-project="commerceflow"[\s\S]*?<\/article>/,
    )?.[0] ?? "";
  assert.ok(commerce);
  assert.doesNotMatch(commerce, /34141838761|30552284724|30552289460|CI VERIFIED/);
  assert.match(commerce, /LOCAL VERIFIED/);
});

const caseExpectations = [
  {
    path: "/projects/commerceflow",
    repo: "commerceflow-ai-mall",
    sha: commerceSha,
    decisionCount: 5,
    failureCount: 5,
    expected: /50 REQUESTS \/ STOCK 10/,
  },
  {
    path: "/projects/ticket",
    repo: "enterprise-ai-ticket-copilot",
    sha: ticketSha,
    decisionCount: 6,
    failureCount: 3,
    expected: /EVAL-015[\s\S]*unexpected_retrieval_for_fallback_case/,
  },
  {
    path: "/projects/devflow",
    repo: "devflow-copilot",
    sha: devFlowSha,
    decisionCount: 6,
    failureCount: 2,
    expected: /12-STEP RUN REPLAY/,
  },
];

for (const expectation of caseExpectations) {
  test(`case page ${expectation.path} exposes decisions, failures and source index`, async () => {
    const response = await render(expectation.path);
    assert.equal(response.status, 200);
    const html = await response.text();

    assert.match(html, expectation.expected);
    assert.match(html, /HONEST BOUNDARIES/);
    assert.match(html, /REAL LOCAL RUN/);
    assert.match(html, /MY ROLE \/ AI COLLABORATION/);
    assert.match(html, /href="\/#projects"/);
    assert.match(html, /← 全部项目/);
    assert.match(html, /← 项目/);
    assert.match(html, /SOURCE[\s\S]*aria-hidden="true"[\s\S]*↗/);
    assert.equal(countTags(html, "main"), 1);
    assert.equal(countTags(html, "h1"), 1);
    assert.equal(countTags(html, "header"), 1);
    assert.equal(
      (html.match(/data-case-section="/g) ?? []).length,
      6,
      "each case must keep six major visual sections",
    );
    assert.match(html, />WZL<\/span>[\s\S]*PORTFOLIO/);

    const decisions =
      html.match(/<article\b[^>]*data-decision="true"[^>]*>/g) ?? [];
    assert.equal(decisions.length, expectation.decisionCount);
    for (const decision of decisions) {
      assert.equal(extractAttribute(decision, "data-has-tradeoff"), "true");
      assert.equal(
        extractAttribute(decision, "data-has-failure-check"),
        "true",
      );
      assert.ok(
        Number(extractAttribute(decision, "data-evidence-link-count")) >= 1,
      );
    }

    const failures =
      html.match(/<(?:article|li)\b[^>]*data-failure-case="true"[^>]*>/g) ??
      [];
    assert.equal(failures.length, expectation.failureCount);
    assert.match(html, /data-source-index="true"/);
    assert.match(html, />SOURCE</);
    assert.match(html, />TEST</);
    assert.match(html, />DOCUMENT</);
    assert.match(html, />CI</);

    const sourceIndex =
      html.match(
        /<div class="source-index"[^>]*data-source-index="true"[\s\S]*?<\/div><\/div><\/section>/,
      )?.[0] ?? html;
    const wrongRepos = [
      "commerceflow-ai-mall",
      "enterprise-ai-ticket-copilot",
      "devflow-copilot",
    ].filter((repo) => repo !== expectation.repo);
    for (const wrongRepo of wrongRepos) {
      assert.doesNotMatch(
        sourceIndex,
        new RegExp(`github\\.com\\/jameswilson87156-del\\/${wrongRepo}`),
      );
    }
    assert.match(
      sourceIndex,
      new RegExp(
        `github\\.com\\/jameswilson87156-del\\/${expectation.repo}`,
      ),
    );
  });
}

test("CommerceFlow keeps ownership honest and does not borrow other CI", async () => {
  const html = await (await render("/projects/commerceflow")).text();
  assert.match(html, /Codex 实质参与/);
  assert.match(html, /不能声称整套项目从零独立手写/);
  assert.doesNotMatch(html, /独立完成整个项目|完全自主开发/);
  assert.doesNotMatch(html, /34141838761|30552284724|30552289460/);
  assert.match(html, new RegExp(`/blob/${commerceSha}/`));
});

test("Ticket reports synthetic evaluation boundaries beside attractive metrics", async () => {
  const html = await (await render("/projects/ticket")).text();
  assert.match(html, /16 SYNTHETIC CASES/);
  assert.match(html, /TOP-K HIT 100% \/ RECALL@3 90%/);
  assert.match(html, /PRECISION 81\.11% → 97\.78%/);
  assert.match(html, /FAILED CASES 6 → 1/);
  assert.match(html, /Retrieval V2/);
  assert.match(html, /retrieval_v2_comparison_latest\.md/);
  assert.match(html, /1000 HTTP · 0 ERR · P95 51\.38MS/);
  assert.match(html, /python_sidecar_load_latest\.md/);
  assert.match(html, /Provider fallback 100%[\s\S]*不是模型质量指标/);
  assert.match(html, /synthetic/);
  assert.match(html, new RegExp(`/blob/${ticketSha}/`));
  assert.match(html, new RegExp(`/blob/${ticketLoadSha}/docs/performance/python_sidecar_load_latest\.md`));
});

test("DevFlow separates current HEAD evidence from the old metrics snapshot", async () => {
  const html = await (await render("/projects/devflow")).text();
  assert.match(html, /不声称复杂多 Agent Runtime/);
  assert.doesNotMatch(
    html,
    /我们已实现复杂多 Agent Runtime|复杂多 Agent Runtime 已实现/,
  );
  assert.match(html, /关键词 \/ 简单相似度/);
  assert.match(html, /旧快照固定在 3b54c08/);
  assert.match(html, new RegExp(`/blob/${devFlowSha}/`));
  assert.match(html, new RegExp(`/blob/${oldDevFlowMetricsSha}/`));
});

test("Phase 1C preserves semantic motion fallbacks and screenshot access", async () => {
  const home = await (await render("/")).text();
  const commerce = await (await render("/projects/commerceflow")).text();
  const motionSource = await readFile(new URL("../app/_components/MotionController.tsx", import.meta.url), "utf8");
  const viewerSource = await readFile(new URL("../app/projects/_components/ImageViewer.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(home, /data-hero-title="true"/);
  assert.equal((home.match(/class="hero-title-mask"/g) ?? []).length, 3);
  assert.match(home, /hero-scan-beam" aria-hidden="true"/);
  assert.match(home, /hero-pointer-glow" aria-hidden="true"/);
  assert.match(home, /data-audit-section="contact"/);
  assert.match(commerce, /data-audit-section="system"/);
  assert.match(commerce, /data-audit-section="decisions"/);
  assert.match(commerce, /data-audit-section="failure"/);
  assert.match(commerce, /data-audit-section="source-index"/);
  assert.match(commerce, /class="screenshot-link"/);
  assert.match(viewerSource, /<dialog/);
  assert.match(viewerSource, /showModal\(\)/);
  assert.match(viewerSource, /onCancel/);
  assert.match(motionSource, /addEventListener\("change", applyMotionPreference\)/);
  assert.match(motionSource, /"IntersectionObserver" in window/);
  assert.match(motionSource, /revealEverything\(\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /hero-scan-beam/);
  assert.match(css, /hero-pointer-glow/);
  assert.doesNotMatch(css, /<canvas|three\.js|webgl/i);
});

test("Phase 1E.3B2 keeps one clear project CTA pair and a dark root transition", async () => {
  const home = await (await render("/")).text();
  const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const rootTransition = css.match(
    /::view-transition-old\(root\),\s*::view-transition-new\(root\)\s*\{[\s\S]*?\}/,
  )?.[0] ?? "";

  assert.equal((home.match(/class="project-screenshot-link"/g) ?? []).length, 3);
  assert.equal((home.match(/class="project-links"/g) ?? []).length, 3);
  assert.equal((home.match(/VIEW CASE/g) ?? []).length, 0);
  assert.doesNotMatch(pageSource, /VIEW CASE/);
  assert.match(pageSource, /className="project-links"/);
  assert.match(pageSource, /阅读案例/);
  assert.match(pageSource, /源码仓库/);
  assert.match(rootTransition, /background:\s*var\(--ink-deep\)/);
  assert.doesNotMatch(rootTransition, /background:\s*var\(--paper\)/);
});

test("Phase 1C.1 keeps reveal values bounded and removes the production motion lab", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const viewer = await readFile(new URL("../app/projects/_components/ImageViewer.tsx", import.meta.url), "utf8");
  const contact = await readFile(new URL("../app/_components/ContactActions.tsx", import.meta.url), "utf8");
  await assert.rejects(readFile(new URL("../app/motion-lab/page.tsx", import.meta.url), "utf8"));
  assert.match(css, /transform: translateY\(22px\)/);
  assert.match(css, /transform: translateY\(28px\)/);
  assert.match(css, /transform: translateY\(18px\)/);
  assert.match(css, /transform: translateY\(12px\)/);
  assert.doesNotMatch(css, /translateY\(38px\)|translateY\(56px\)|opacity 760ms|transform 920ms|will-change: opacity, transform/);
  assert.match(css, /\.image-viewer button \{ min-height: 44px;/);
  assert.match(viewer, /if \(!dialog\.open\) dialog\.showModal\(\)/);
  assert.match(contact, /className="wechat-letter-prefix"/);
  assert.match(contact, /LETTER l × 2/);
  assert.doesNotMatch(contact, /aria-label=\{WECHAT_ID\}/);
  assert.match(contact, /const WECHAT_ID = "ll467113957"/);
});

test("Phase 1C.2 decouples readable reveal state from decorative signal state", async () => {
  const motion = await readFile(new URL("../app/_components/MotionController.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(motion, /dataset\.revealState = "pending"/);
  assert.match(motion, /dataset\.revealState = "visible"/);
  assert.match(motion, /dataset\.signalState = "idle"/);
  assert.match(motion, /dataset\.signalState = "played"/);
  assert.match(motion, /const getTargets = \(\)/);
  assert.match(motion, /new WeakSet<Element>\(\)/);
  assert.match(motion, /new MutationObserver\(scan\)/);
  assert.match(motion, /usePathname\(\)/);
  assert.match(motion, /FAIL_OPEN_MS = 1600/);
  assert.match(motion, /rootMargin: "0px 0px 8% 0px", threshold: 0\.01/);
  assert.match(motion, /"IntersectionObserver" in window/);
  assert.match(css, /\.motion-ready \[data-reveal\] \{\s*opacity: 1;\s*transform: none;/);
  assert.match(css, /data-reveal-state="pending"/);
  assert.match(css, /data-signal-state="played"/);
  assert.doesNotMatch(css, /\.project\.is-visible|\.system-path\.is-visible|\.failure-zone\.is-visible/);
});

test("Phase 1C.2 case orientation remains semantic and evidence context stays inline", async () => {
  const html = await (await render("/projects/commerceflow")).text();
  const navSource = await readFile(new URL("../app/projects/_components/CaseSectionNav.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(html, /<nav[^>]*class="case-section-nav"[^>]*aria-label=/);
  for (const id of ["case-summary", "case-system", "case-decisions", "case-failures", "case-evidence", "case-boundaries"]) {
    assert.match(html, new RegExp(`id="${id}"`));
    assert.match(html, new RegExp(`href="#${id}"`));
  }
  assert.match(html, /class="source-context"/);
  assert.match(navSource, /aria-current=/);
  assert.match(navSource, /new IntersectionObserver/);
  assert.doesNotMatch(navSource, /opacity|revealState|signalState/);
  assert.match(css, /--section-space-xl:/);
  assert.match(css, /--section-space-lg:/);
  assert.match(css, /--section-space-md:/);
});

test("Phase 1F.4A exposes one truthful public identity contract", async () => {
  const config = await readFile(
    new URL("../app/site-config.ts", import.meta.url),
    "utf8",
  );
  const expectedOrigin = "https://wzl8.top";
  const expectedIcp = "豫ICP备2026032125号-1";
  const expectedIcpUrl = "https://beian.miit.gov.cn/";
  const expectedPages = [
    ["/", "https://wzl8.top/"],
    ["/projects/commerceflow", "https://wzl8.top/projects/commerceflow/"],
    ["/projects/ticket", "https://wzl8.top/projects/ticket/"],
    ["/projects/devflow", "https://wzl8.top/projects/devflow/"],
  ];

  assert.equal(expectedOrigin, "https://wzl8.top");
  assert.match(config, /origin: "https:\/\/wzl8\.top"/);
  assert.match(config, /hostname: "wzl8\.top"/);
  assert.match(config, new RegExp(`icpNumber: "${expectedIcp}"`));
  assert.match(config, /icpUrl: "https:\/\/beian\.miit\.gov\.cn\/"/);
  assert.doesNotMatch(config, /https?:\/\/www\.wzl8\.top|localhost|127\.0\.0\.1|47\.98\.192\.15/);

  for (const [pathname, canonical] of expectedPages) {
    const html = await (await render(pathname)).text();
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.equal(canonicalMatch?.[1], canonical, `${pathname} canonical`);
    assert.match(
      html,
      new RegExp(`<meta property="og:url" content="${canonical.replaceAll("/", "\\/")}"`),
    );
    const expectedImage =
      pathname === "/" ? "og-testdev.jpg" : "og.jpg";
    assert.match(
      html,
      new RegExp(`<meta property="og:image" content="https:\\/\\/wzl8\\.top\\/${expectedImage}"`),
    );
    assert.match(html, new RegExp(`>${expectedIcp}<`));
    assert.match(html, new RegExp(`href="${expectedIcpUrl.replaceAll("/", "\\/")}"`));
    assert.match(html, /target="_blank" rel="noopener noreferrer"/);
    assert.match(html, /aria-label="前往工信部备案系统查询豫ICP备2026032125号-1"/);
    assert.doesNotMatch(html, />豫ICP备2026032125号</);
    assert.doesNotMatch(html, /京公网安备|豫公网安备|公网安备/);
    assert.doesNotMatch(html, /https?:\/\/www\.wzl8\.top|http:\/\/wzl8\.top|localhost|127\.0\.0\.1/);
  }

  const notFound = await readFile(new URL("../dist/client/404.html", import.meta.url), "utf8");
  assert.match(notFound, /页面不存在/);
  assert.match(notFound, new RegExp(`>${expectedIcp}<`));
  assert.doesNotMatch(notFound, /<link rel="canonical"/);
  assert.doesNotMatch(notFound, /property="og:url" content="https:\/\/wzl8\.top\//);
  assert.doesNotMatch(notFound, /京公网安备|豫公网安备|公网安备/);

  const sitemap = await readFile(new URL("../dist/client/sitemap.xml", import.meta.url), "utf8");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.equal(sitemapUrls.length, 4);
  assert.deepEqual(sitemapUrls, expectedPages.map(([, canonical]) => canonical));
  assert.doesNotMatch(sitemap, /localhost|127\.0\.0\.1|www\.wzl8\.top|<lastmod>|\.rsc|404|47\.98\.192\.15/);

  const robots = await readFile(new URL("../dist/client/robots.txt", import.meta.url), "utf8");
  assert.match(robots, /User-agent: \*\s+Allow: \/\s+Sitemap: https:\/\/wzl8\.top\/sitemap\.xml/);
  assert.doesNotMatch(robots, /Disallow:/);
});
