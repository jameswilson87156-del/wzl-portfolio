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
    label: "JAVA BACKEND CORE",
    title: "Java 后端核心",
    items: [
      "Java 17",
      "Spring Boot 3",
      "Spring MVC",
      "MyBatis / MyBatis-Plus",
      "MySQL",
      "Redis",
      "REST API",
      "Maven",
      "JUnit / MockMvc",
    ],
  },
  {
    label: "FRONTEND & FULL-STACK DELIVERY",
    title: "前端与全栈交付",
    items: [
      "Vue 3",
      "TypeScript",
      "Axios",
      "Element Plus",
      "前后端联调",
      "Git",
      "Linux",
      "Docker",
      "Nginx",
      "Portfolio HTTPS",
    ],
  },
  {
    label: "AI APPLICATION, TOOLING & AGENT",
    title: "AI 应用、工具与 Agent",
    items: [
      "Provider Router",
      "Retrieval Workflow",
      "PromptOps",
      "Tool Calling",
      "Human Review",
      "Trace",
      "Fallback Handling",
      "Agent Workflow",
    ],
  },
] as const;

const heroProjectRail = [
  {
    slug: "commerceflow",
    no: "01",
    shortTitle: "CommerceFlow",
    type: "JAVA BACKEND",
    trace: "REQUEST → VERIFY → COMMIT",
    cue: "订单事实 / 一致性",
  },
  {
    slug: "ticket",
    no: "02",
    shortTitle: "Ticket Copilot",
    type: "AI WORKFLOW",
    trace: "RETRIEVE → REVIEW → EXPLAIN",
    cue: "检索证据 / 人工复核",
  },
] as const;

export const metadata: Metadata = {
  title: {
    absolute: "王震龙｜Java 全栈与 AI 应用开发作品集",
  },
  description:
    "王震龙的软件工程作品集，展示以 Java 后端为核心的 Spring Boot 3、Vue 3 全栈项目，以及 AI 应用、AI 工具和 Agent 工作流工程实践。",
  alternates: {
    canonical: siteUrl("/"),
  },
  openGraph: {
    title: "王震龙｜Java 全栈与 AI 应用开发作品集",
    description:
      "王震龙的软件工程作品集，展示以 Java 后端为核心的 Spring Boot 3、Vue 3 全栈项目，以及 AI 应用、AI 工具和 Agent 工作流工程实践。",
    url: siteUrl("/"),
    type: "website",
    images: [
      {
        url: siteUrl("/og.jpg"),
        width: 1200,
        height: 630,
        alt: "王震龙 Java 全栈与 AI 应用开发作品集",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "王震龙｜Java 全栈与 AI 应用开发作品集",
    description:
      "王震龙的软件工程作品集，展示以 Java 后端为核心的 Spring Boot 3、Vue 3 全栈项目，以及 AI 应用、AI 工具和 Agent 工作流工程实践。",
    images: [siteUrl("/og.jpg")],
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
            <span className="hero-title-mask"><span>Java 全栈开发</span></span>
            <span className="hero-title-mask"><span><em>×</em></span></span>
            <span className="hero-title-mask"><span>AI 应用开发</span></span>
          </h1>
          <nav
            className="hero-direction-tags hero-capability-rail"
            aria-label="求职方向与项目入口"
          >
            <a
              className="hero-capability hero-capability--java"
              href="#project-commerceflow"
              aria-label="Java Full-stack：查看 CommerceFlow 项目"
            >
              <span className="hero-capability-index">01</span>
              <div className="hero-capability-copy">
                <span className="hero-capability-label">JAVA BACKEND</span>
                <strong>Java Full-stack</strong>
                <small>业务闭环 · 接口与数据一致性</small>
              </div>
              <i aria-hidden="true">↗</i>
            </a>
            <a
              className="hero-capability hero-capability--ai"
              href="#project-ticket"
              aria-label="AI Application：查看 Ticket Copilot 项目"
            >
              <span className="hero-capability-index">02</span>
              <div className="hero-capability-copy">
                <span className="hero-capability-label">AI APPLICATION</span>
                <strong>AI Application</strong>
                <small>检索证据 · 人工复核</small>
              </div>
              <i aria-hidden="true">↗</i>
            </a>
            <a
              className="hero-capability hero-capability--agent"
              href="#project-devflow"
              aria-label="AI Tooling and Agent：查看 DevFlow 项目"
            >
              <span className="hero-capability-index">03</span>
              <div className="hero-capability-copy">
                <span className="hero-capability-label">AI TOOLING</span>
                <strong>AI Tooling &amp; Agent</strong>
                <small>Provider 路由 · Trace 回放</small>
              </div>
              <i aria-hidden="true">↗</i>
            </a>
          </nav>
          <HeroProjectRail projects={heroProjectRail} />
          <div className="hero-bottom">
            <p>
              以 Java 后端能力为核心，使用 Spring Boot 3 与 Vue 3 完成全栈交付，
              <br className="hero-break" />
              并在 AI 工具和 Agent 应用工作流中实践大模型接入、检索、人工复核与失败降级。
            </p>
            <div className="hero-actions">
              <Link className="hero-action primary" href="#projects">
                <span>查看工程项目</span>
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

      <section className="evidence-strip" id="evidence" data-reveal="section">
        <div className="shell evidence-grid">
          <div className="evidence-intro">
            <p className="section-label light">/ VERIFIED EVIDENCE</p>
            <h2>
              声明之后，
              <br />
              紧跟证据。
            </h2>
            <p>
              首页先给出每个项目的一条主证据；完整账本和边界说明留在案例页。
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
        className="project-section"
        id="projects"
        data-portfolio-scope="static-case-studies"
      >
        <div className="shell projects-head" data-reveal="section">
          <div>
            <p className="section-label light">/ 精选项目 · STATIC CASE STUDIES</p>
            <h2>两个业务主案例，一个 AI 工作流案例。</h2>
            <p className="projects-reading-key">
              PROBLEM → ROLE → PROOF <span>先看问题，再看我的贡献和可验证证据。</span>
            </p>
          </div>
          <p>
            先看 CommerceFlow 与 Ticket Copilot 两个业务主案例，再看 DevFlow AI 工具工作流。这里展示截图、源码、测试和边界，不是在线业务入口。
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
            <h2>把后端基础，接到真实的 AI 应用场景。</h2>
          </div>
          <p>项目中使用的技术与当前学习方向，按交付链路分组展示。</p>
        </div>
        <div className="positioning-grid">
          <div className="positioning-copy">
            <p>
              我是一名 2027 届软件工程本科生，主要学习和实践 Java 全栈与 AI 应用开发。
            </p>
            <p>
              项目中以 Java、Spring Boot 3、MySQL、Redis 和 Vue 3 为主要技术栈，关注业务流程、接口设计、数据状态、异常处理、测试与部署；同时在 AI 工具与 Agent 应用项目中实践 Provider 路由、检索、Prompt、Tool Calling、Trace、人工复核与失败降级。
            </p>
            <p className="positioning-openness">
              目前主要寻找 Java 全栈、AI 应用、AI 工具或 Agent 应用开发方向的实习机会，同时兼投 Java 后端与 Java + Vue 岗位。
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
                {group.label === "AI APPLICATION, TOOLING & AGENT" ? (
                  <p className="stack-group-note">
                    Agent 仅指应用工作流与证据聚合，不代表复杂自治多 Agent Runtime。
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
        <div className="cap-title">
          <p className="section-label">/ ENGINEERING METHOD</p>
          <p>Java 全栈 · AI 应用 · AI 工具与 Agent 工作流</p>
        </div>
        <div className="cap-list">
          <article>
            <span>01</span>
            <h3>BUILD</h3>
            <p>把业务约束转成可运行链路。</p>
          </article>
          <article>
            <span>02</span>
            <h3>VERIFY</h3>
            <p>验证正常路径、失败路径和数据边界。</p>
          </article>
          <article>
            <span>03</span>
            <h3>EXPLAIN</h3>
            <p>用源码、测试、CI 和文档说明结论。</p>
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
            <span>JAVA FULL-STACK × AI APPLICATIONS</span>
            <strong>
              <span>寻求 <span className="contact-phrase">Java 全栈</span></span>
              <em>
                或 <span className="contact-phrase">AI 应用开发</span>
                <span className="contact-phrase">实习机会。</span>
              </em>
            </strong>
            <small className="contact-subline">AI 工具 / Agent 应用方向，兼投 Java 后端。</small>
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
