import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "王震龙 · AI 应用开发作品集",
  description: "面向 AI 应用开发与 Java 全栈实习的工程作品集。",
};

const projects = [
  {
    no: "01",
    type: "AI + BUSINESS SYSTEM",
    title: "CommerceFlow AI Mall",
    summary: "把商品、SKU、库存、购物车、订单与 AI 能力放进一条可追踪的业务链路。",
    detail: "Java 17 · Spring Boot 3 · MySQL · Redis Lua · Vue 3 · UniApp",
    href: "https://github.com/jameswilson87156-del/commerceflow-ai-mall",
    tone: "coral",
    metrics: ["库存扣减", "幂等下单", "AI mock"],
    lens: "业务链路",
    proof: "从 SKU 到订单的一致性设计"
  },
  {
    no: "02",
    type: "RAG + HUMAN REVIEW",
    title: "Enterprise AI Ticket Copilot",
    summary: "为企业工单建立检索、建议、人工复核和可回看的处理工作流。",
    detail: "Spring Boot · Vue 3 · 关键词检索 · Trace · Human Review",
    href: "https://github.com/jameswilson87156-del/enterprise-ai-ticket-copilot",
    tone: "violet",
    metrics: ["可解释检索", "人工复核", "处理追踪"],
    lens: "人机协作",
    proof: "检索建议进入人工可控闭环"
  },
  {
    no: "03",
    type: "AI ENGINEERING WORKFLOW",
    title: "DevFlow Copilot",
    summary: "把 Prompt、模型降级、工具调用与 Review 组织成可验证的开发辅助流程。",
    detail: "Java 17 · Spring Boot · Vue 3 · TypeScript · Provider Fallback",
    href: "https://github.com/jameswilson87156-del/devflow-copilot",
    tone: "lime",
    metrics: ["Prompt 管理", "调用追踪", "降级策略"],
    lens: "工程工作流",
    proof: "从输入到回放的调用可见性"
  }
];

const capabilities = [
  ["01", "业务系统", "从实体建模到下单、库存与一致性处理，关注能跑通的真实链路。"],
  ["02", "AI 应用", "把检索、模型调用、提示词和人工复核放进可观察的产品流程。"],
  ["03", "全栈交付", "Java / Spring Boot 与 Vue 3 协作，重视接口边界、演示与复盘。"]
];

function ProjectVisual({ tone }: { tone: string }) {
  if (tone === "coral") return <div className="commerce-visual" aria-hidden="true"><div className="commerce-top"><span>CATALOG</span><span>INVENTORY</span></div><div className="commerce-lanes"><i/><i/><i/></div><div className="commerce-skus"><b>SKU-01</b><b>SKU-02</b><b>SKU-03</b></div><div className="commerce-order">ORDER <em>→</em> AI</div></div>;
  if (tone === "violet") return <div className="ticket-visual" aria-hidden="true"><div className="ticket-chip">TICKET #042</div><div className="ticket-rail"><i/><i/><i/><i/></div><div className="ticket-card card-a">RETRIEVE</div><div className="ticket-card card-b">REVIEW</div><div className="ticket-card card-c">TRACE</div></div>;
  return <div className="flow-visual" aria-hidden="true"><div className="flow-head">DEVFLOW / RUN 014</div><div className="flow-steps"><b>01<span>PROMPT</span></b><i>→</i><b>02<span>TOOL</span></b><i>→</i><b>03<span>REVIEW</span></b></div><div className="flow-log"><span>fallback: ready</span><span>trace: recorded</span></div></div>;
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="grain" aria-hidden="true" />
        <div className="hero-orbit orbit-a" aria-hidden="true" />
        <div className="hero-orbit orbit-b" aria-hidden="true" />
        <nav className="nav shell" aria-label="主导航">
          <a className="brand" href="#top"><span>WZL</span><i />PORTFOLIO</a>
          <div className="nav-links">
            <a href="#projects">Projects</a>
            <a href="#about">Profile</a>
            <a href="https://github.com/jameswilson87156-del" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a className="nav-contact" href="#contact">Contact <b>↗</b></a>
          </div>
        </nav>

        <div className="hero-content shell">
          <div className="eyebrow"><span className="pulse" />AVAILABLE FOR INTERNSHIP · 2026</div>
          <p className="hero-kicker">AI APPLICATION ENGINEERING</p>
          <h1>把 AI 能力<br /><em>做成</em>可验证的产品。</h1>
          <div className="hero-bottom">
            <p>王震龙 · 软件工程本科 · 2027 届<br />面向 <strong>AI 应用开发 / Java 全栈 / Agent 工程</strong> 实习机会。</p>
            <a className="round-link" href="#projects" aria-label="查看项目">↓</a>
          </div>
        </div>

        <aside className="hero-index" aria-label="站点索引">
          <span>SCROLL TO EXPLORE</span><div /><span>01 — 04</span>
        </aside>
        <div className="hero-foot shell"><span>SHENZHEN / REMOTE</span><span>BUILD · TRACE · REVIEW</span></div>
      </section>

      <div className="signal-strip" aria-label="技术关键词"><div>JAVA 17 <i>✦</i> SPRING BOOT <i>✦</i> VUE 3 <i>✦</i> RAG <i>✦</i> REDIS <i>✦</i> HUMAN REVIEW <i>✦</i> PROMPTOPS <i>✦</i> JAVA 17 <i>✦</i> SPRING BOOT <i>✦</i> VUE 3 <i>✦</i> RAG <i>✦</i> REDIS <i>✦</i></div></div>

      <section className="statement shell" id="about">
        <p className="section-label">/ 个人定位</p>
        <div className="statement-grid">
          <h2>不是堆叠<br />Demo，而是练习<br /><em>工程决策。</em></h2>
          <div className="statement-copy">
            <p>我在项目中关心的不是“接入一个模型”本身，而是如何把它连接到业务对象、失败降级、操作记录和人工判断。</p>
            <p>当前以 Java 后端和 Vue 3 为主，持续把 AI 应用、RAG 与业务系统做成能演示、能解释、能继续迭代的完整作品。</p>
            <a href="https://github.com/jameswilson87156-del" target="_blank" rel="noreferrer" className="text-link">查看 GitHub 代码证据 <b>↗</b></a>
          </div>
        </div>
      </section>

      <section className="project-section" id="projects">
        <div className="shell projects-head">
          <p className="section-label light">/ 精选项目</p>
          <p>每个项目均链接至公开仓库；技术说明以仓库 README 和可运行代码为准。</p>
        </div>
        <div className="projects">
          {projects.map((project) => (
            <article className={`project project-${project.tone}`} key={project.title}>
              <div className="project-top"><span>{project.no}</span><span>{project.type}</span></div>
              <ProjectVisual tone={project.tone} />
              <div className="project-copy">
                <p className="project-lens">{project.lens} / {project.proof}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tag-row">{project.metrics.map((m) => <span key={m}>{m}</span>)}</div>
                <div className="project-links"><a href={project.href} target="_blank" rel="noreferrer">源码仓库 ↗</a><a href={`${project.href}/blob/main/README.md`} target="_blank" rel="noreferrer">阅读 README ↗</a></div>
              </div>
              <div className="project-bottom">
                <span>{project.detail}</span>
                <a href={project.href} target="_blank" rel="noreferrer" aria-label={`打开 ${project.title} GitHub 仓库`}>VIEW REPO <b>↗</b></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities shell">
        <div className="cap-title"><p className="section-label">/ 我能贡献什么</p><p>从需求理解到可演示实现，保持边界清楚、过程可复盘。</p></div>
        <div className="cap-list">
          {capabilities.map(([number, title, text]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="shell contact-inner">
          <p className="section-label">/ 联系我</p>
          <h2>下一段代码，<br /><em>一起写。</em></h2>
          <div className="contact-grid">
            <a href="mailto:467113957@qq.com"><span>EMAIL</span><b>467113957@qq.com</b><i>↗</i></a>
            <a href="https://github.com/jameswilson87156-del" target="_blank" rel="noreferrer"><span>GITHUB</span><b>jameswilson87156-del</b><i>↗</i></a>
          </div>
          <div className="contact-foot"><span>© 2026 WANG ZHENLONG</span><span>FACTS FIRST. WORK IN PUBLIC.</span></div>
        </div>
      </section>
    </main>
  );
}
