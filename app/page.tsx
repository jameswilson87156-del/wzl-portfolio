import type { Metadata } from "next";
import Link from "next/link";
import {
  collaborationDisclosure,
  projects,
  type EvidenceItem,
} from "./portfolio-data";
import ContactActions from "./_components/ContactActions";
import SiteComplianceFooter from "./_components/SiteComplianceFooter";
import { siteUrl } from "./site-config";
import ScreenshotFrame from "./projects/_components/ScreenshotFrame";

export const metadata: Metadata = {
  title: "王震龙 · Java 后端 / AI 应用开发作品集",
  description: "面向 Java 后端 / AI 应用开发实习的证据优先工程作品集。",
  alternates: {
    canonical: siteUrl("/"),
  },
  openGraph: {
    title: "王震龙 · Java 后端 / AI 应用开发作品集",
    description: "把业务问题，做成可验证的工程系统。",
    url: siteUrl("/"),
    type: "website",
    images: [
      {
        url: siteUrl("/og.jpg"),
        width: 1200,
        height: 630,
        alt: "王震龙 Java 后端与 AI 应用开发作品集",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "王震龙 · Java 后端 / AI 应用开发作品集",
    description: "把业务问题，做成可验证的工程系统。",
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
    >
      <ScreenshotFrame
        className="project-screenshot-frame"
        frameKind="card"
        label={image.label}
        transitionName={`project-${project.slug}-screenshot-1`}
      >
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
      </ScreenshotFrame>
    </a>
  );
}

function EvidenceClaim({ item }: { item: EvidenceItem }) {
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
      className="evidence-claim"
      href={item.evidenceHref}
      target="_blank"
      rel="noreferrer"
      {...attributes}
    >
      {content}
    </a>
  ) : (
    <div className="evidence-claim" {...attributes}>
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

        <header className="site-header">
          <nav className="nav shell" aria-label="主导航">
            <Brand />
            <div className="nav-links">
              <a href="#projects">项目</a>
              <a href="#evidence">证据</a>
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
        </header>

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
          <p className="hero-kicker">JAVA BACKEND × AI APPLICATIONS</p>
          <h1 className="hero-title" data-hero-title="true">
            <span className="hero-title-mask"><span>把业务问题，</span></span>
            <span className="hero-title-mask"><span>
              <em>做成</em>可验证的
            </span></span>
            <span className="hero-title-mask"><span>工程系统。</span></span>
          </h1>
          <div className="hero-bottom">
            <p>
              王震龙 · 软件工程本科 · 2027 届
              <br />
              <strong>Java 后端 / AI 应用开发</strong>
              <br />
              使用 Java、Vue 3 与 AI 能力，完成从业务链路、失败处理到测试和
              CI 的完整验证。
            </p>
            <div className="hero-actions">
              <Link className="hero-action primary" href="/projects/commerceflow">
                <span>查看 CommerceFlow 案例</span>
                <b aria-hidden="true">↗</b>
              </Link>
              <a className="hero-action" href="#evidence">
                <span>查看验证证据</span>
                <b aria-hidden="true">↓</b>
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
              每条数字和状态均绑定仓库提交、验证日期、来源与适用边界。
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
                {project.evidence.map((item) => (
                  <EvidenceClaim item={item} key={item.claim} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="project-section" id="projects">
        <div className="shell projects-head" data-reveal="section">
          <div>
            <p className="section-label light">/ 精选项目</p>
            <h2>三个问题，三种工程重点。</h2>
          </div>
          <p>
            固定顺序对应事务一致性、RAG 决策支持与 AI Run
            可观测。技术结论以源码、测试和仓库文档为准。
          </p>
        </div>

        <div className="projects">
          {projects.map((project) => (
            <article
              className={`project project-${project.tone}`}
              key={project.slug}
              data-project={project.slug}
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
                <p className="project-question">
                  <span>CORE QUESTION</span>
                  {project.question}
                </p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
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
        className="capabilities engineering-method shell"
        id="method"
        data-reveal="section"
      >
        <div className="cap-title">
          <p className="section-label">/ ENGINEERING METHOD</p>
          <p>Vue 3 全栈交付 · RAG · Agent 工作流 · PromptOps</p>
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
            <span>JAVA BACKEND × AI APPLICATIONS</span>
            <strong>
              <span>寻求 <span className="contact-phrase">Java 后端</span></span>
              <em>
                或 <span className="contact-phrase">AI 应用开发</span>
                <span className="contact-phrase">实习机会。</span>
              </em>
            </strong>
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
