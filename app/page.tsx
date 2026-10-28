import type { Metadata } from "next";
import Link from "next/link";
import {
  collaborationDisclosure,
  projects,
  type EvidenceItem,
} from "./portfolio-data";
import ContactActions from "./_components/ContactActions";
import EditorialProjectCover from "./_components/EditorialProjectCover";
import HeroProjectRail from "./_components/HeroProjectRail";
import MobileNav from "./_components/MobileNav";
import ScrollAwareHeader from "./_components/ScrollAwareHeader";
import SiteComplianceFooter from "./_components/SiteComplianceFooter";
import { siteUrl } from "./site-config";
import ScreenshotFrame from "./projects/_components/ScreenshotFrame";

const techStackGroups = [
  {
    label: "TEST AUTOMATION & SYSTEM QA",
    title: "测试自动化与系统质量",
    items: [
      "Python 3.12",
      "pytest",
      "HTTPX",
      "Playwright / Chromium",
      "Java / JUnit / MockMvc",
      "API / HTTP testing",
      "权限 / 状态 / 幂等",
      "JSON / HTML reports",
      "GitHub Actions",
    ],
  },
  {
    label: "AGENT EVALUATION & QUALITY SIGNALS",
    title: "Agent 评测与质量信号",
    items: [
      "26-case synthetic dataset",
      "Deterministic Mock Agent",
      "Tool choice / arguments",
      "Trace / failure attribution",
      "Run history / JSON report",
      "Regression comparison",
      "Micrometer / Prometheus",
      "Alertmanager local drill",
    ],
  },
  {
    label: "SYSTEMS UNDER TEST",
    title: "理解被测系统",
    items: [
      "Java 17 / Spring Boot",
      "MySQL / Redis",
      "Vue 3 / TypeScript",
      "Docker Compose",
      "SQLite / H2 fixtures",
      "k6 local load test",
      "REST / state machine",
      "Git / Linux",
    ],
  },
] as const;

const heroProjectRail = [
  {
    slug: "gitea-quality-lab",
    no: "01",
    shortTitle: "Gitea Quality Lab",
    type: "OPEN-SOURCE SYSTEM QA",
    trace: "API → BROWSER → SQLITE",
    cue: "24 unit + 16 integration checks",
  },
  {
    slug: "promptops",
    no: "02",
    shortTitle: "PromptOps Studio",
    type: "AI AGENT EVALUATION",
    trace: "DATASET → MOCK → TRACE",
    cue: "26 cases · 2 retained failures",
  },
] as const;

export const metadata: Metadata = {
  title: {
    absolute: "王震龙｜测试开发 · AI Agent 评测作品集",
  },
  description:
    "王震龙，2027 届软件工程本科生，测试开发实习方向。展示 API 与 Web 自动化、AI Agent 确定性评测、失败定位及可核验的运行证据。",
  alternates: {
    canonical: siteUrl("/"),
  },
  openGraph: {
    title: "王震龙｜测试开发 · AI Agent 评测作品集",
    description:
      "测试开发实习方向：API 与 Web 自动化、AI Agent 确定性评测、失败定位及可核验的运行证据。",
    url: siteUrl("/"),
    type: "website",
    images: [
      {
        url: siteUrl("/og-testdev.jpg"),
        width: 1200,
        height: 630,
        alt: "王震龙测试开发与 AI Agent 评测作品集",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "王震龙｜测试开发 · AI Agent 评测作品集",
    description:
      "测试开发实习方向：API 与 Web 自动化、AI Agent 确定性评测、失败定位及可核验的运行证据。",
    images: [siteUrl("/og-testdev.jpg")],
  },
};

function Brand() {
  return (
    <Link className="brand" href="/#top">
      <span>WZL</span>
      <i aria-hidden="true" />
      PORTFOLIO
    </Link>
  );
}

function ProjectVisual({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const image = project.primaryImage;
  return (
    <a
      className="project-screenshot-link"
      href={`/projects/${project.slug}`}
      aria-label={`打开 ${project.title} 项目案例`}
      data-cover-art={project.coverImage ? "editorial" : "evidence"}
    >
      <ScreenshotFrame
        className="project-screenshot-frame"
        frameKind="card"
        label={project.coverImage?.label ?? image.label}
        transitionName={`project-${project.slug}-screenshot-1`}
      >
        {project.coverImage ? (
          <EditorialProjectCover project={project} />
        ) : (
          <img
            src={image.responsiveSrc}
            srcSet={image.responsiveSrcSet}
            sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 42vw, 480px"
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: image.objectPosition }}
          />
        )}
      </ScreenshotFrame>
    </a>
  );
}

function EvidenceClaim({
  item,
  className,
}: {
  item: EvidenceItem;
  className?: string;
}) {
  const content = (
    <>
      <strong>{item.claim}</strong>
      <span>{item.evidenceLabel}</span>
      <p>{item.scope}</p>
      <small>
        {item.verifiedAt} · {item.verificationType}
      </small>
      <em>{item.boundary}</em>
    </>
  );
  const attributes = {
    "data-evidence": "true",
    "data-claim": item.claim,
    "data-scope": item.scope,
    "data-verified-at": item.verifiedAt,
    "data-boundary": item.boundary,
    "data-verification-type": item.verificationType,
    "data-repository-sha": item.repositorySha,
  };

  return item.evidenceHref ? (
    <a
      className={`evidence-claim${className ? ` ${className}` : ""}`}
      href={item.evidenceHref}
      target="_blank"
      rel="noreferrer"
      {...attributes}
    >
      {content}
    </a>
  ) : (
    <div
      className={`evidence-claim${className ? ` ${className}` : ""}`}
      {...attributes}
    >
      {content}
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero" id="top">
        <div className="grain" aria-hidden="true" />
        <div className="hero-orbit orbit-a" aria-hidden="true" />
        <div className="hero-orbit orbit-b" aria-hidden="true" />
        <div className="hero-scan-beam" aria-hidden="true" />
        <div className="hero-pointer-glow" aria-hidden="true" />

        <ScrollAwareHeader>
          <nav className="nav shell" aria-label="主导航">
            <Brand />
            <div className="nav-links">
              <MobileNav />
              <a href="#projects">项目</a>
              <a href="#evidence">证据</a>
              <a href="#about">关于</a>
              <a
                href="https://github.com/jameswilson87156-del"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <a className="nav-contact" href="#contact">
                联系我 <b>↗</b>
              </a>
            </div>
          </nav>
        </ScrollAwareHeader>

        <div className="hero-content shell">
          <div className="eyebrow">
            <span className="pulse" />
            <span className="internship-status-full">
              2027 GRAD · OPEN TO INTERNSHIP
            </span>
            <span className="internship-status-compact">
              2027 GRAD · INTERNSHIP
            </span>
          </div>
          <p className="hero-kicker hero-identity">王震龙 · 软件工程本科 · 2027 届</p>
          <h1 className="hero-title" data-hero-title="true">
            <span className="hero-title-mask"><span>测试开发实习方向</span></span>
            <span className="hero-title-mask"><span><em>×</em></span></span>
            <span className="hero-title-mask"><span>AI Agent 评测</span></span>
          </h1>
          <nav
            className="hero-direction-tags hero-capability-rail"
            aria-label="求职方向与项目入口"
          >
            <a
              className="hero-capability hero-capability--qa"
              href="#project-gitea-quality-lab"
              aria-label="System QA：查看 Gitea Quality Lab 项目"
            >
              <span className="hero-capability-index">01</span>
              <div className="hero-capability-copy">
                <span className="hero-capability-label">SYSTEM QA</span>
                <strong>API + Web 自动化</strong>
                <small>接口 · 权限 · 浏览器 · 持久化</small>
              </div>
              <i aria-hidden="true">↗</i>
            </a>
            <a
              className="hero-capability hero-capability--ai"
              href="#project-promptops"
              aria-label="Agent Evaluation：查看 PromptOps Studio 项目"
            >
              <span className="hero-capability-index">02</span>
              <div className="hero-capability-copy">
                <span className="hero-capability-label">AGENT EVALUATION</span>
                <strong>确定性评测</strong>
                <small>固定用例 · Trace · 失败归因</small>
              </div>
              <i aria-hidden="true">↗</i>
            </a>
            <a
              className="hero-capability hero-capability--system"
              href="#engineering-background"
              aria-label="System Foundations：查看后端和 AI 工程背景"
            >
              <span className="hero-capability-index">03</span>
              <div className="hero-capability-copy">
                <span className="hero-capability-label">SYSTEM FOUNDATIONS</span>
                <strong>理解被测服务</strong>
                <small>Java · Spring Boot · 数据状态</small>
              </div>
              <i aria-hidden="true">↗</i>
            </a>
          </nav>
          <HeroProjectRail projects={heroProjectRail} />
          <div className="hero-bottom">
            <p>
              用 Python / pytest、Java / JUnit 与浏览器自动化检查系统行为，
              <br className="hero-break" />
              并通过运行记录、Trace、失败复现和 CI 质量门禁说明测试结论。
            </p>
            <div className="hero-actions">
              <Link className="hero-action primary" href="#projects">
                <span>查看测试开发项目</span>
                <b aria-hidden="true">↗</b>
              </Link>
              <a
                className="hero-action"
                href="https://github.com/jameswilson87156-del/wzl-portfolio"
                target="_blank"
                rel="noreferrer"
              >
                <span>GitHub</span>
                <b aria-hidden="true">↗</b>
              </a>
            </div>
          </div>
        </div>

        <aside className="hero-index" aria-label="站点索引">
          <span>SCROLL TO EXPLORE</span>
          <div />
          <span>01 — 05</span>
        </aside>
        <div className="hero-foot shell">
          <span>FACTS OVER CLAIMS</span>
          <span>BUILD · VERIFY · EXPLAIN</span>
        </div>
      </section>

      <section
        className="project-section"
        id="projects"
        data-portfolio-scope="test-development-case-studies"
      >
        <div className="shell projects-head" data-reveal="section">
          <div>
            <p className="section-label light">/ TEST DEVELOPMENT · OPEN PROJECTS</p>
            <h2>把测试结论做成可重放的证据。</h2>
            <p className="projects-reading-key">
              CASE → ASSERTION → TRACE <span>从测试对象、断言到可核验运行结果。</span>
            </p>
          </div>
          <p>
            下面是独立测试开发项目：Gitea Quality Lab 验证开源业务系统，PromptOps Studio 验证 AI Agent 行为。执行状态与被测行为结果分开呈现。
          </p>
        </div>

        <div className="shell quality-project-grid">
          <article
            className="quality-project-card quality-project-card-gitea"
            id="project-gitea-quality-lab"
            data-project="gitea-quality-lab"
          >
            <div className="quality-project-top">
              <span>PROJECT 01 · OPEN-SOURCE SYSTEM QA</span>
              <span className="quality-status">CI VERIFIED</span>
            </div>
            <h3>Gitea Quality Lab</h3>
            <p className="quality-project-summary">
              在隔离的 Gitea 28.2 / SQLite 实例上验证 REST API、角色权限、浏览器工作流与重启持久化；将逐条结果汇总为 JSON、JUnit、HTML 和浏览器证据。
            </p>
            <div className="quality-evidence-panel" aria-label="GitHub Actions 中的测试结果">
              <div className="quality-panel-heading">
                <span>GITHUB ACTIONS · ISOLATED CI INSTANCE</span>
                <b>RUN 40710451708</b>
              </div>
              <div className="quality-result-row">
                <span>测试框架单元测试</span>
                <strong>24 / 24</strong>
                <em>PASS</em>
              </div>
              <div className="quality-result-row">
                <span>Gitea API / UI 集成</span>
                <strong>16 / 16</strong>
                <em>PASS</em>
              </div>
              <div className="quality-result-foot">
                <span>API · PERMISSIONS · PLAYWRIGHT · RESTART</span>
                <span>JSON / JUNIT CONSISTENCY</span>
              </div>
            </div>
            <ul className="quality-check-list">
              <li>匿名与登录访问、身份和仓库权限边界。</li>
              <li>浏览器创建仓库与 Issue；重启后再次读取 SQLite 数据。</li>
              <li>检查报告 Run ID、逐条用例 ID 和 JSON / JUnit 汇总一致。</li>
            </ul>
            <p className="quality-project-boundary">
              范围：隔离 Docker Compose / SQLite。40 项通过表示定义的检查通过，不代表发现了 40 个 Gitea 产品缺陷。
            </p>
            <div className="quality-project-links">
              <a href="https://github.com/jameswilson87156-del/gitea-quality-lab/tree/feat/gitea-quality-lab" target="_blank" rel="noreferrer">源码与用例 ↗</a>
              <a href="https://github.com/jameswilson87156-del/gitea-quality-lab/actions/runs/40710451708" target="_blank" rel="noreferrer">CI 运行 ↗</a>
              <a href="https://github.com/jameswilson87156-del/gitea-quality-lab/blob/feat/gitea-quality-lab/reports/evidence.md" target="_blank" rel="noreferrer">验收证据 ↗</a>
            </div>
          </article>

          <article
            className="quality-project-card quality-project-card-promptops"
            id="project-promptops"
            data-project="promptops"
          >
            <div className="quality-project-top">
              <span>PROJECT 02 · AI AGENT EVALUATION</span>
              <span className="quality-status quality-status-mock">MOCK MODE</span>
            </div>
            <h3>PromptOps Studio</h3>
            <p className="quality-project-summary">
              用 26 条固定合成用例驱动确定性 Mock Agent，检查输出规则、工具选择与参数，并保存逐条结果、Trace、失败归因和 JSON 报告。
            </p>
            <div className="quality-evaluation-grid" aria-label="PromptOps 最近一次 Mock 评测结果">
              <div><span>用例执行</span><strong>26 / 26</strong><small>EXECUTED</small></div>
              <div><span>Agent 行为断言</span><strong>24 / 26</strong><small>PASS</small></div>
              <div><span>保留失败</span><strong>2</strong><small>NOT HIDDEN</small></div>
            </div>
            <div className="quality-failure-panel" aria-label="两个可重复的 Agent 行为失败样本">
              <div className="quality-panel-heading">
                <span>DETERMINISTIC FAILURE SAMPLES</span>
                <b>RUN ID · PER EXECUTION</b>
              </div>
              <div className="quality-failure-row"><code>agent-014</code><span>工具选择错误</span><strong>FAIL</strong></div>
              <div className="quality-failure-row"><code>agent-015</code><span>重复调用工具</span><strong>FAIL</strong></div>
              <div className="quality-result-foot"><span>EXECUTOR SUCCESS ≠ AGENT BEHAVIOR PASS</span></div>
            </div>
            <p className="quality-project-boundary">
              仅为 Mock / 规则评测，无真实模型准确率。配套 30 分钟本地 Soak 完成 60/60 轮；k6 完成 8,103 个本地工作流，但活跃 VU 峰值为 1。
            </p>
            <div className="quality-project-links">
              <a href="https://github.com/jameswilson87156-del/ai-agent-eval-promptops/tree/feat/agent-evaluation-platform" target="_blank" rel="noreferrer">源码与固定集 ↗</a>
              <a href="https://github.com/jameswilson87156-del/ai-agent-eval-promptops/actions/runs/40724124012" target="_blank" rel="noreferrer">CI 运行 ↗</a>
              <a href="https://github.com/jameswilson87156-del/ai-agent-eval-promptops/blob/feat/agent-evaluation-platform/docs/test-development-acceptance.md" target="_blank" rel="noreferrer">运行报告 ↗</a>
            </div>
          </article>
        </div>
      </section>

      <section className="evidence-strip" id="evidence" data-reveal="section">
        <div className="shell evidence-grid">
          <div className="evidence-intro">
            <p className="section-label light">/ ENGINEERING BACKGROUND · VERIFIED</p>
            <h2>
              系统理解能力，
              <br />
              也有证据。
            </h2>
            <p>
              后端业务与 AI 应用项目作为被测系统工程背景；其证据保留原有范围，不替代测试开发项目经历。
            </p>
          </div>
          {projects.map((project) => (
            <article
              className="evidence-project"
              data-project={project.slug}
              key={project.slug}
            >
              <div className="evidence-project-head">
                <span>{project.no}</span>
                <h3>{project.shortTitle}</h3>
              </div>
              <div className="evidence-claims">
                {(() => {
                  const primaryEvidence =
                    project.evidence.find(
                      (item) => item.claim === project.homepageEvidenceClaim,
                    ) ?? project.evidence[0];
                  const additionalEvidence = project.evidence.filter(
                    (item) => item !== primaryEvidence,
                  );

                  return (
                    <>
                      <EvidenceClaim
                        item={primaryEvidence}
                        className="evidence-claim-primary"
                      />
                      {additionalEvidence.length ? (
                        <details className="evidence-more">
                          <summary>
                            <span>FULL EVIDENCE LEDGER</span>
                            <b>{additionalEvidence.length} more records</b>
                            <i aria-hidden="true">+</i>
                          </summary>
                          <div className="evidence-claims evidence-claims-more">
                            {additionalEvidence.map((item) => (
                              <EvidenceClaim item={item} key={item.claim} />
                            ))}
                          </div>
                        </details>
                      ) : null}
                    </>
                  );
                })()}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="project-section engineering-background"
        id="engineering-background"
        data-portfolio-scope="supporting-engineering-case-studies"
      >
        <div className="shell projects-head" data-reveal="section">
          <div>
            <p className="section-label light">/ SYSTEM ENGINEERING · SUPPORTING CASES</p>
            <h2>从后端与 AI 项目理解被测系统。</h2>
            <p className="projects-reading-key">
              SYSTEM → STATE → FAILURE <span>业务规则、接口和数据状态是测试设计的上下文。</span>
            </p>
          </div>
          <p>
            以下是此前的 Java 后端与 AI 应用工程案例，作为测试开发的系统背景补充。核心求职方向已转为测试开发；这些项目不冒充测试岗位或生产系统经验。
          </p>
        </div>

        <div className="projects">
          {projects.map((project) => (
            <article
              className={`project project-${project.tone} ${
                project.slug === "devflow"
                  ? "project-supporting"
                  : "project-featured"
              }`}
              id={`project-${project.slug}`}
              key={project.slug}
              data-project={project.slug}
              data-featured={project.slug !== "devflow" ? "true" : "false"}
              data-signal-on-view="project"
            >
              <div className="project-top">
                <span>{project.no}</span>
                <span>{project.type}</span>
              </div>
              <ProjectVisual project={project} />
              <div className="project-copy">
                <p className="project-lens">
                  {project.lens} / {project.proof}
                </p>
                <h3 data-view-transition-title={`project-${project.slug}-title`}>
                  {project.title}
                </h3>
                <p>{project.summary}</p>
                <p className="project-contribution">
                  <span>MY CONTRIBUTION</span>
                  {project.contribution}
                </p>
                <div className="project-scan-grid" aria-label="项目快速阅读">
                  <div>
                    <span>FOCUS</span>
                    <strong>{project.lens}</strong>
                  </div>
                  <div>
                    <span>PROOF LENS</span>
                    <strong>{project.proof}</strong>
                  </div>
                  <div>
                    <span>PUBLIC SIGNAL</span>
                    <strong>{project.status.claim}</strong>
                  </div>
                </div>
                <p className="project-question">
                  <span>CORE QUESTION</span>
                  {project.question}
                </p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-proof-chip" aria-label="项目证据状态">
                  <span>{project.status.claim}</span>
                  <small>{project.status.verificationType}</small>
                </div>
                <div className="project-links">
                  <a href={`/projects/${project.slug}`}>阅读案例 ↗</a>
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    源码仓库 ↗
                  </a>
                </div>
              </div>
              <div className="project-bottom">
                <span>{project.stack}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="positioning-section shell"
        id="about"
        data-reveal="section"
      >
        <div className="positioning-heading">
          <div>
            <p className="section-label">/ ABOUT & STACK</p>
            <h2>把后端基础转成系统测试与失败定位能力。</h2>
          </div>
          <p>项目中使用的技术与当前学习方向，按交付链路分组展示。</p>
        </div>
        <div className="positioning-grid">
          <div className="positioning-copy">
            <p>
              我是一名 2027 届软件工程本科生，主要寻找测试开发实习。我通过 API / Web 自动化、确定性评测和可重复运行来检查系统行为，并用逐条结果与失败证据解释结论。
            </p>
            <p>
              2026.07–2026.09 在南京玻璃纤维研究设计院有限公司江宁分公司研发部参与企业内网材料研发数据与文件资源管理平台开发，使用 Java 17、Spring Boot 3、MyBatis/MyBatis-Plus、MySQL 完成 REST API、CRUD、分页与关联查询，并参与文件导入预览和页面联调。
            </p>
            <p>
              Java 后端实践帮助我理解业务状态、幂等、接口契约与数据边界。测试项目使用 Python / pytest、Java / JUnit、HTTPX、Playwright、Docker Compose、GitHub Actions、k6、Prometheus 与本地 Alertmanager 演练。
            </p>
            <p className="positioning-openness">
              目前主要寻找测试开发实习，也关注 AI 测试与 Agent 评测方向。个人项目数据均注明 Mock、合成数据、隔离环境和本地负载范围。
            </p>
            <div className="availability-strip" aria-label="实习条件">
              <span>2027 届</span>
              <span>一周内可到岗</span>
              <span>每周可实习 6 天</span>
              <span>可连续实习 6 个月</span>
              <span>接受异地实习</span>
            </div>
          </div>
          <div className="stack-groups" aria-label="技术栈分组">
            {techStackGroups.map((group) => (
              <div className="stack-group" key={group.label}>
                <div className="stack-group-heading">
                  <span>{group.label}</span>
                  <strong>{group.title}</strong>
                </div>
                <div className="stack-tags">
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
                {group.label === "AGENT EVALUATION & QUALITY SIGNALS" ? (
                  <p className="stack-group-note">
                    PromptOps 使用确定性 Mock Agent；指标来自本地合成环境，不代表真实模型质量或生产监控。
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="capabilities engineering-method shell"
        id="method"
        data-reveal="section"
      >
        <h2 className="sr-only">工程方法</h2>
        <div className="cap-title">
          <p className="section-label">/ ENGINEERING METHOD</p>
          <p>TEST DESIGN · AUTOMATION · FAILURE EVIDENCE</p>
        </div>
        <div className="cap-list">
          <article>
            <span>01</span>
            <h3>BUILD</h3>
            <p>把业务规则拆成可重复执行的用例。</p>
          </article>
          <article>
            <span>02</span>
            <h3>VERIFY</h3>
            <p>覆盖正常、异常、权限、状态与数据边界。</p>
          </article>
          <article>
            <span>03</span>
            <h3>EXPLAIN</h3>
            <p>保留 Run ID、逐条断言、Trace 与 CI 报告。</p>
          </article>
        </div>
        <p className="collaboration-disclosure">{collaborationDisclosure}</p>
      </section>

      <footer className="contact" id="contact" data-audit-section="contact">
        <div className="shell contact-inner">
          <div className="contact-intro" data-reveal="section">
            <p className="section-label">/ CONTACT · OPEN FOR INTERNSHIP</p>
            <p className="contact-note">
              如团队正在招聘相关实习生，欢迎通过邮箱、微信或 GitHub 联系我。
            </p>
          </div>
          <div
            className="contact-hero-link"
            data-reveal="contact"
          >
            <span>TEST DEVELOPMENT × AI AGENT EVALUATION</span>
            <strong>
              <span>寻求 <span className="contact-phrase">测试开发</span></span>
              <em>
                或 <span className="contact-phrase">AI 测试 / Agent 评测</span>
                <span className="contact-phrase">实习机会。</span>
              </em>
            </strong>
            <small className="contact-subline">Java 后端实践作为理解被测系统的工程背景。</small>
            <i aria-hidden="true">↗</i>
          </div>
          <ContactActions />
          <div className="contact-foot">
            <span>© 2026 WANG ZHENLONG</span>
            <a href="#top">BACK TO TOP ↑</a>
            <span>FACTS FIRST · BUILD · VERIFY · EXPLAIN</span>
          </div>
          <SiteComplianceFooter />
        </div>
      </footer>
    </main>
  );
}
