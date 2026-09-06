import Link from "next/link";
import CaseSectionNav from "./CaseSectionNav";
import ProjectScreenshot from "./ProjectScreenshot";
import SiteComplianceFooter from "../../_components/SiteComplianceFooter";
import type {
  EvidenceLink,
  Project,
  SourceGroup,
} from "../../portfolio-data";
import { projects } from "../../portfolio-data";

type CaseInteractionSignal = {
  trace: string;
  note: string;
};

const caseInteractionSignals: Record<string, CaseInteractionSignal> = {
  commerceflow: {
    trace: "REQUEST → VERIFY → COMMIT",
    note: "从幂等请求、库存判断读到订单事务事实。",
  },
  ticket: {
    trace: "RETRIEVE → REVIEW → EXPLAIN",
    note: "从检索来源、人工门禁读到回答边界。",
  },
  devflow: {
    trace: "PROMPT → ROUTE → REPLAY",
    note: "从 Prompt、Provider 路由读到 Run 证据回放。",
  },
};

function ExternalLink({
  link,
  className,
}: {
  link: EvidenceLink;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={link.href}
      target="_blank"
      rel="noreferrer"
    >
      <span>{link.label}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function SourceColumn({ group }: { group: SourceGroup }) {
  return (
    <details
      className="source-group"
      data-source-kind={group.title.toLowerCase()}
    >
      <summary>
        <span>{group.title}</span>
        <i aria-hidden="true">+</i>
      </summary>
      <div>
        {group.items.length ? (
          <ul>
            {group.items.map((item) => (
              <li key={`${group.title}-${item.label}`}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  <strong>{item.label}</strong>
                  <span>{item.description}</span>
                  <small className="source-context">
                    <span>{item.kind.toUpperCase()}</span>
                    <span>{decodeURIComponent(item.href.split("/").pop() ?? item.label)}</span>
                    <span>{item.href.match(/\/blob\/([a-f0-9]{7,40})\//)?.[1]?.slice(0, 7) ?? "RUN"}</span>
                    <span>{item.kind === "ci" ? "CI VERIFIED" : "REPOSITORY VERIFIED"}</span>
                  </small>
                  <i aria-hidden="true">↗</i>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="source-empty">{group.emptyNote}</p>
        )}
      </div>
    </details>
  );
}

export default function ProjectCase({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const primaryFailure = project.failureCases[0];
  const secondaryFailures = project.failureCases.slice(1);
  const interactionSignal =
    caseInteractionSignals[project.slug] ?? caseInteractionSignals.devflow;
  const caseImages = [
    project.primaryImage,
    project.secondaryImage,
    ...(project.metricImage ? [project.metricImage] : []),
  ];

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`case-page case-${project.tone}`}
      data-project={project.slug}
      data-active-section="case-summary"
    >
      <span className="case-ambient" aria-hidden="true" />
      <section className="case-hero" id="case-summary" data-case-section="01">
        <div className="grain" aria-hidden="true" />
        <div className="case-orbit" aria-hidden="true" />
        <header className="case-header">
          <nav className="case-nav shell" aria-label="项目案例导航">
            <Link className="brand" href="/#top">
              <span>WZL</span>
              <i aria-hidden="true" />
              PORTFOLIO
            </Link>
            <div>
              <Link href="/#projects">
                <span className="case-back-desktop">← 全部项目</span>
                <span className="case-back-mobile">← 项目</span>
              </Link>
              <a href={project.repo} target="_blank" rel="noreferrer">
                SOURCE <span aria-hidden="true">↗</span>
              </a>
            </div>
          </nav>
        </header>

        <div className="case-hero-content shell">
          <div className="case-index">
            <span>CASE STUDY</span>
            <strong>{project.no}</strong>
          </div>
          <div className="case-title">
            <p>{project.type}</p>
            <h1 data-view-transition-title={`project-${project.slug}-title`}>
              {project.title}
            </h1>
            <p className="case-summary">{project.summary}</p>
          </div>
          <div className="case-meta">
            <div>
              <span>MY ROLE / AI COLLABORATION</span>
              <p>{project.ownership.summary}</p>
            </div>
            <div>
              <span>STACK</span>
              <p>{project.stack}</p>
            </div>
            <div>
              <span>STATUS</span>
              <p className="case-status">{project.status.claim}</p>
            </div>
          </div>
        </div>

        <div className="case-hero-followup shell" data-case-signal={interactionSignal.trace}>
          <div className="case-hero-signal">
            <span>READING SIGNAL</span>
            <strong>{interactionSignal.trace}</strong>
            <small>{interactionSignal.note}</small>
          </div>
          <div className="case-hero-actions" aria-label="案例快速入口">
            <a className="case-hero-action case-hero-action-primary" href="#case-system">
              <span>追踪系统</span>
              <b aria-hidden="true">↓</b>
            </a>
            <a className="case-hero-action" href="#case-evidence">
              <span>查看证据</span>
              <b aria-hidden="true">↘</b>
            </a>
          </div>
        </div>
      </section>

      <CaseSectionNav />

      <section
        className="case-problem shell"
        id="case-screenshot"
        data-case-section="02"
        data-reveal="section"
        data-screenshot-section="primary"
      >
        <div className="screenshot-head">
          <span>REAL LOCAL RUN / REPOSITORY EVIDENCE</span>
          <span>02</span>
        </div>
        <ProjectScreenshot
          image={project.primaryImage}
          images={caseImages}
          index={0}
          projectSlug={project.slug}
          projectTitle={project.title}
        />
        <p className="screenshot-caption">
          画面来自项目仓库保存的真实本地运行截图，不是概念图或第三方产品截图。
        </p>

        <div className="problem-grid">
          <div>
            <p className="section-label">/ PROBLEM & OWNERSHIP</p>
            <h2>{project.headings.problem}</h2>
            <p className="problem-copy">{project.challenge}</p>
          </div>
          <aside className="ownership-card" data-ownership="true">
            <div>
              <span>我确认并负责</span>
              <ul>
                {project.ownership.confirmed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span>不能声称</span>
              <ul>
                {project.ownership.cannotClaim.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {project.ownership.evidenceHref ? (
              <a
                href={project.ownership.evidenceHref}
                target="_blank"
                rel="noreferrer"
              >
                打开贡献与边界证据 <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </aside>
        </div>
      </section>

      <section
        className="case-system"
        id="case-system"
        data-case-section="03"
        data-reveal="section"
        data-audit-section="system"
      >
        <div className="shell">
          <div className="case-section-head">
            <p className="section-label light">/ SYSTEM PATH</p>
            <h2>{project.headings.system}</h2>
          </div>
          <ol className="system-path" data-reveal="sequence" data-signal-on-view="system">
            {project.systemSteps.map((step, index) => (
              <li key={`${index}-${step}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="case-decisions shell"
        id="case-decisions"
        data-case-section="04"
        data-reveal="section"
        data-audit-section="decisions"
      >
        <div className="case-section-head ink">
          <p className="section-label">/ DECISIONS & FAILURE CHECKS</p>
          <h2>{project.headings.decisions}</h2>
        </div>

        <div className="decision-grid" data-reveal="sequence">
          {project.decisions.map((decision, index) => (
            <article
              key={decision.title}
              data-decision="true"
              data-has-tradeoff={Boolean(decision.tradeoff)}
              data-has-failure-check={Boolean(decision.failureCheck)}
              data-evidence-link-count={decision.evidenceLinks.length}
            >
              <details className="decision-details">
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className="decision-summary-copy">
                    <h3>{decision.title}</h3>
                    <p className="decision-preview">{decision.body}</p>
                  </div>
                  <i aria-hidden="true">+</i>
                </summary>
                <div className="decision-body">
                  <dl>
                    <div>
                      <dt>未选择 / 取舍</dt>
                      <dd>{decision.tradeoff}</dd>
                    </div>
                    <div>
                      <dt>失败验证</dt>
                      <dd>{decision.failureCheck}</dd>
                    </div>
                  </dl>
                  <div className="decision-links">
                    {decision.evidenceLinks.map((link) => (
                      <ExternalLink
                        key={link.href}
                        link={link}
                        className="decision-evidence-link"
                      />
                    ))}
                  </div>
                </div>
              </details>
            </article>
          ))}
        </div>

        <div className="failure-zone" id="case-failures" data-project-failure-cases="true" data-audit-section="failure" data-signal-on-view="failure">
          <div className="failure-zone-head">
            <p className="section-label">/ FEATURED FAILURE CASE</p>
            <p>
              成功结果只说明正常路径；失败结果用于检查设计是否真的守住边界。
            </p>
          </div>
          <article
            className="failure-featured"
            data-failure-case="true"
            data-failure-label={primaryFailure.label}
          >
            <div className="failure-featured-title">
              <span>{primaryFailure.label}</span>
              <h3>{primaryFailure.title}</h3>
            </div>
            <dl>
              <div>
                <dt>SETUP</dt>
                <dd>{primaryFailure.setup}</dd>
              </div>
              <div>
                <dt>EXPECTED</dt>
                <dd>{primaryFailure.expected}</dd>
              </div>
              <div>
                <dt>OBSERVED</dt>
                <dd>{primaryFailure.observed}</dd>
              </div>
              <div>
                <dt>LESSON</dt>
                <dd>{primaryFailure.lesson}</dd>
              </div>
            </dl>
            <p className="failure-boundary">
              <span>BOUNDARY</span>
              {primaryFailure.boundary}
            </p>
            <div className="failure-links">
              {primaryFailure.evidenceLinks.map((link) => (
                <ExternalLink key={link.href} link={link} />
              ))}
            </div>
          </article>

          {secondaryFailures.length ? (
            <div className="failure-compact">
              <h3>其他失败回放</h3>
              <ul>
                {secondaryFailures.map((failure) => (
                  <li
                    key={failure.label}
                    data-failure-case="true"
                    data-failure-label={failure.label}
                  >
                    <details>
                      <summary>
                        <span>{failure.label}</span>
                        <strong>{failure.title}</strong>
                        <i aria-hidden="true">+</i>
                      </summary>
                      <div>
                        <dl>
                          <div>
                            <dt>EXPECTED</dt>
                            <dd>{failure.expected}</dd>
                          </div>
                          <div>
                            <dt>OBSERVED</dt>
                            <dd>{failure.observed}</dd>
                          </div>
                          <div>
                            <dt>LESSON / BOUNDARY</dt>
                            <dd>
                              {failure.lesson} {failure.boundary}
                            </dd>
                          </div>
                        </dl>
                        <div className="failure-links">
                          {failure.evidenceLinks.map((link) => (
                            <ExternalLink key={link.href} link={link} />
                          ))}
                        </div>
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section
        className="case-proof"
        id="case-evidence"
        data-case-section="05"
        data-reveal="section"
      >
        <div className="shell">
          <div className="case-section-head">
            <p className="section-label light">/ VERIFIED EVIDENCE</p>
            <h2>{project.headings.evidence}</h2>
          </div>
          <div className="proof-grid" data-reveal="sequence">
            {project.caseEvidence.map((item, index) => (
              <article
                key={`${item.claim}-${index}`}
                data-evidence="true"
                data-claim={item.claim}
                data-scope={item.scope}
                data-verified-at={item.verifiedAt}
                data-boundary={item.boundary}
                data-verification-type={item.verificationType}
                data-repository-sha={item.repositorySha}
              >
                <span>
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {item.verificationType}
                </span>
                <strong>{item.claim}</strong>
                <p>{item.scope}</p>
                <small>
                  {item.verifiedAt} · {item.boundary}
                </small>
                {item.evidenceHref ? (
                  <a
                    className="proof-evidence-link"
                    href={item.evidenceHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.evidenceLabel} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="proof-evidence-label">
                    {item.evidenceLabel}
                  </span>
                )}
              </article>
            ))}
          </div>
          <div className="proof-links">
            <a href={project.readme} target="_blank" rel="noreferrer">
              阅读项目 README <span aria-hidden="true">↗</span>
            </a>
            {project.action ? (
              <a href={project.action} target="_blank" rel="noreferrer">
                查看对应 GitHub Actions <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>

          <div className="case-secondary-view" id="case-secondary-evidence" data-screenshot-section="secondary">
            <div className="screenshot-head">
              <span>SECONDARY VIEW / TRACEABLE UI</span>
              <span>05B</span>
            </div>
            <ProjectScreenshot
              image={project.secondaryImage}
              images={caseImages}
              index={1}
              projectSlug={project.slug}
              projectTitle={project.title}
            />
          </div>
          {project.metricImage ? (
            <div className="case-metric-view" id="case-metric-evidence" data-screenshot-section="metric">
              <div className="screenshot-head">
                <span>METRICS / BASELINE EVIDENCE</span>
                <span>05C</span>
              </div>
              <ProjectScreenshot
                image={project.metricImage}
                images={caseImages}
                index={2}
                projectSlug={project.slug}
                projectTitle={project.title}
              />
            </div>
          ) : null}

          <div className="source-index" data-source-index="true" data-audit-section="source-index">
            <div className="source-index-head">
              <p className="section-label light">/ SOURCE INDEX</p>
              <p>每个入口都固定到对应仓库与证据提交；链接说明打开的具体内容。</p>
            </div>
            <div className="source-grid">
              {project.sourceGroups.map((group) => (
                <SourceColumn key={group.title} group={group} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="case-conclusion" id="case-boundaries" data-case-section="06">
        <div className="shell boundaries-grid" data-reveal="section">
          <div>
            <p className="section-label">/ HONEST BOUNDARIES</p>
            <h2>不把 Demo，{"\n"}包装成生产系统。</h2>
          </div>
          <ul>
            {project.boundaries.map((boundary) => (
              <li key={boundary}>{boundary}</li>
            ))}
          </ul>
        </div>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="shell case-next-link"
        >
          <span>NEXT CASE / {nextProject.no}</span>
          <strong>{nextProject.title}</strong>
          <i aria-hidden="true">↗</i>
        </Link>
      </section>
      <SiteComplianceFooter />
    </main>
  );
}
