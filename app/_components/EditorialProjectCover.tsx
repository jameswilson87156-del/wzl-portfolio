/* eslint-disable @next/next/no-img-element -- static evidence screens use a local srcSet. */
import type { Project } from "../portfolio-data";

const coverCopy = {
  commerceflow: {
    kicker: "01 / JAVA BACKEND",
    title: "ORDER",
    accent: "TRUTH.",
    subtitle: "CommerceFlow AI Mall",
    question: "订单事实如何在重复请求和库存竞争中保持稳定？",
    metrics: ["50 REQUESTS · LOCAL REPLAY", "STOCK 10 · CONTROLLED", "1 FACT CHAIN"],
    accentClass: "cover-coral",
  },
  ticket: {
    kicker: "02 / AI APPLICATION",
    title: "TRACE",
    accent: "REVIEW.",
    subtitle: "Enterprise Ticket Copilot",
    question: "AI 建议在哪里结束，人工确认从哪里开始？",
    metrics: ["TOP-K · SYNTHETIC EVAL", "CITATION · TESTED", "HUMAN GATE"],
    accentClass: "cover-violet",
  },
  devflow: {
    kicker: "03 / AI TOOLING",
    title: "RUN",
    accent: "EVIDENCE.",
    subtitle: "DevFlow Copilot",
    question: "一次 AI Run 能否被记录、回放并接受审核？",
    metrics: ["PROMPT · TRACE", "TOOL CALL · TESTED", "REPLAY · EVIDENCE"],
    accentClass: "cover-lime",
  },
} as const;

export default function EditorialProjectCover({ project }: { project: Project }) {
  const copy = coverCopy[project.slug as keyof typeof coverCopy];
  const primary = project.primaryImage;
  const secondary = project.secondaryImage;

  return (
    <div className={`editorial-cover ${copy.accentClass}`} data-editorial-cover={project.slug}>
      <div className="editorial-cover-noise" aria-hidden="true" />
      <div className="editorial-cover-copy">
        <span>{copy.kicker}</span>
        <div className="editorial-cover-title">
          {copy.title}
          <em>{copy.accent}</em>
        </div>
        <p>{copy.subtitle}</p>
        <small>{copy.question}</small>
      </div>
      <div className="editorial-cover-stage" aria-hidden="true">
        <figure className="editorial-cover-main">
          <img
            src={primary.responsiveSrc}
            srcSet={primary.responsiveSrcSet}
            sizes="(max-width: 700px) calc(100vw - 64px), (max-width: 1100px) 35vw, 420px"
            alt=""
            width={primary.width}
            height={primary.height}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: primary.objectPosition }}
          />
        </figure>
        <figure className="editorial-cover-mini">
          <img
            src={secondary.responsiveSrc}
            srcSet={secondary.responsiveSrcSet}
            sizes="(max-width: 700px) 45vw, 190px"
            alt=""
            width={secondary.width}
            height={secondary.height}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: secondary.objectPosition }}
          />
        </figure>
      </div>
      <div className="editorial-cover-metrics">
        {copy.metrics.map((metric) => <span key={metric}>{metric}</span>)}
      </div>
      <div className="editorial-cover-footer">
        <span>BUILD · VERIFY · EXPLAIN</span>
        <span>{project.status.claim}</span>
      </div>
    </div>
  );
}
