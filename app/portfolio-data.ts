export type ProjectTone = "coral" | "violet" | "lime";

export type VerificationType =
  | "ci"
  | "local"
  | "documentation"
  | "synthetic-evaluation";

export type EvidenceItem = {
  claim: string;
  scope: string;
  evidenceLabel: string;
  evidenceHref?: string;
  repositorySha?: string;
  verifiedAt: string;
  boundary: string;
  verificationType: VerificationType;
};

export type EvidenceLink = {
  label: string;
  href: string;
};

export type Decision = {
  title: string;
  body: string;
  tradeoff: string;
  failureCheck: string;
  evidenceLinks: EvidenceLink[];
};

export type FailureCase = {
  label: string;
  title: string;
  setup: string;
  expected: string;
  observed: string;
  lesson: string;
  boundary: string;
  evidenceLinks: EvidenceLink[];
};

export type SourceKind = "source" | "test" | "document" | "ci";

export type SourceItem = {
  label: string;
  description: string;
  href: string;
  kind: SourceKind;
};

export type SourceGroup = {
  title: "SOURCE" | "TEST" | "DOCUMENT" | "CI";
  items: SourceItem[];
  emptyNote?: string;
};

export type Ownership = {
  summary: string;
  confirmed: string[];
  cannotClaim: string[];
  evidenceHref?: string;
};

export type ProjectHeadings = {
  problem: string;
  system: string;
  decisions: string;
  evidence: string;
};

export type ScreenshotFrameKind = "card" | "hero" | "evidence" | "metric";

export type ProjectImage = {
  alt: string;
  description: string;
  frameKind: Exclude<ScreenshotFrameKind, "card">;
  height: number;
  label: string;
  objectPosition: string;
  originalSrc: string;
  responsiveSrc: string;
  responsiveSrcSet: string;
  sizes: string;
  width: number;
};

export type Project = {
  slug: string;
  no: string;
  type: string;
  title: string;
  shortTitle: string;
  summary: string;
  contribution: string;
  question: string;
  stack: string;
  tone: ProjectTone;
  tags: string[];
  lens: string;
  proof: string;
  repo: string;
  readme: string;
  action?: string;
  status: EvidenceItem;
  homepageEvidenceClaim: string;
  challenge: string;
  headings: ProjectHeadings;
  ownership: Ownership;
  systemSteps: string[];
  decisions: Decision[];
  failureCases: FailureCase[];
  evidence: EvidenceItem[];
  caseEvidence: EvidenceItem[];
  sourceGroups: SourceGroup[];
  boundaries: string[];
  coverImage?: ProjectImage;
  primaryImage: ProjectImage;
  secondaryImage: ProjectImage;
  metricImage?: ProjectImage;
};

export const collaborationDisclosure =
  "负责项目方向、业务约束、验收标准和关键链路验证；使用 Codex/Claude 辅助编码、测试与文档整理，最终代码差异、能力边界和工程取舍由我审核确认。";

const commerceRepo = "commerceflow-ai-mall";
const ticketRepo = "enterprise-ai-ticket-copilot";
const devFlowRepo = "devflow-copilot";
const owner = "jameswilson87156-del";

const commerceSha = "954d56e01e4e4fe4bf5cc8a16becf60747305b68";
const ticketSha = "89b608d79166fa13a3093e9fafebaf9da51677f9";
const devFlowSha = "c9cefd4bbbf30d27579efe7d023a83f764f28736";
const devFlowMetricsSha = "3b54c08a581dcd90a1a3f746be119356b5de41d5";
const verifiedAt = "2026-07-31";
const commerceVerifiedAt = "2026-09-08";
const ticketVerifiedAt = "2026-09-08";
const ticketCiRun = "34141838761";
const ticketCiUrl = `https://github.com/${owner}/${ticketRepo}/actions/runs/${ticketCiRun}`;

function blob(repo: string, sha: string, path: string) {
  return `https://github.com/${owner}/${repo}/blob/${sha}/${path}`;
}

function coverImage(
  path: string,
  label: string,
  alt: string,
  description: string,
): ProjectImage {
  return {
    alt,
    description,
    frameKind: "hero",
    height: 1000,
    label,
    objectPosition: "50% 50%",
    originalSrc: path,
    responsiveSrc: path,
    responsiveSrcSet: `${path} 1600w`,
    sizes: "(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 42vw, 540px",
    width: 1600,
  };
}

const commerceLink = (path: string) => blob(commerceRepo, commerceSha, path);
const ticketLink = (path: string) => blob(ticketRepo, ticketSha, path);
const devFlowLink = (path: string) => blob(devFlowRepo, devFlowSha, path);

const commerceStatus: EvidenceItem = {
  claim: "LOCAL VERIFIED",
  scope: `${commerceRepo} main @ ${commerceSha.slice(0, 7)}`,
  evidenceLabel: "README · LOCAL SHOWCASE",
  evidenceHref: commerceLink("README.md"),
  repositorySha: commerceSha,
  verifiedAt: commerceVerifiedAt,
  boundary: "本地 Showcase 状态，不代表生产部署、线上流量或外部模型效果。",
  verificationType: "documentation",
};

const ticketStatus: EvidenceItem = {
  claim: "CI VERIFIED",
  scope: `${ticketRepo} main @ ${ticketSha.slice(0, 7)}`,
  evidenceLabel: `GitHub Actions #${ticketCiRun}`,
  evidenceHref: ticketCiUrl,
  repositorySha: ticketSha,
  verifiedAt: ticketVerifiedAt,
  boundary: "CI 证明该提交的前端构建和后端测试通过，不代表生产可用性。",
  verificationType: "ci",
};

const devFlowStatus: EvidenceItem = {
  claim: "CI VERIFIED",
  scope: `${devFlowRepo} main @ ${devFlowSha.slice(0, 7)}`,
  evidenceLabel: "GitHub Actions #30552289460",
  evidenceHref:
    "https://github.com/jameswilson87156-del/devflow-copilot/actions/runs/30552289460",
  repositorySha: devFlowSha,
  verifiedAt,
  boundary: "CI 证明该提交的 frontend 与 backend job 通过，不代表已生产部署。",
  verificationType: "ci",
};

export const projects: Project[] = [
  {
    slug: "commerceflow",
    no: "01",
    type: "JAVA BACKEND",
    title: "CommerceFlow AI Mall",
    shortTitle: "CommerceFlow",
    summary:
      "围绕商品、订单、库存和 AI 商品助手构建的 Java 业务系统，重点展示分层设计、状态流转、数据一致性和前后端联调。",
    contribution:
      "业务正确性边界、幂等与库存回放，以及 MySQL 证据链。",
    question:
      "如何在重复请求、库存竞争和 AI 服务异常时保持订单事实一致？",
    stack:
      "Java 17 · Spring Boot 3 · MySQL 8.4 · Redis Lua · Vue 3 · UniApp · FastAPI",
    tone: "coral",
    tags: ["Java Backend", "Idempotency", "Inventory Consistency", "Vue 3 Delivery"],
    lens: "Java 后端核心",
    proof: "业务系统与全栈交付",
    repo: `https://github.com/${owner}/${commerceRepo}`,
    readme: commerceLink("README.md"),
    status: commerceStatus,
    homepageEvidenceClaim: "ORDER RELIABILITY VERIFIED ×3",
    challenge:
      "电商展示不能只停留在商品列表。真正需要解释的是：重复请求会不会重复扣库存，库存竞争时是否超卖，失败时事务如何回滚，以及 AI 回答究竟来自哪些业务事实。",
    headings: {
      problem: "先验证订单事实，\n再讨论 AI 能力。",
      system: "从幂等请求到事务提交的事实链路。",
      decisions: "正确性留在数据库与 Java 边界内。",
      evidence: "可靠性回放、事务测试与事实契约。",
    },
    ownership: {
      summary:
        "我确定产品与求职定位、MySQL-first、幂等规则、Java/Python 边界和 businessFacts 契约，并负责验收、测试运行、证据整理与最终取舍。",
      confirmed: [
        "确认 MySQL-first 与订单正确性边界。",
        "确认同 Key 同请求重放、同 Key 不同请求冲突的幂等规则。",
        "确认 Java 构造 businessFacts，Python Provider 不写业务数据库。",
        "执行验收、测试回放、证据整理并审核最终差异。",
      ],
      cannotClaim: [
        "初始项目结构与大量 Showcase 实现由 Codex 实质参与。",
        "不能声称整套项目从零独立手写或全部核心代码均由本人编写。",
        "仍需通过 learning rebuild 重写关键模块，补足独立实现能力。",
      ],
      evidenceHref: commerceLink("docs/career/OWNERSHIP_GAPS.md"),
    },
    systemSteps: [
      "Request + Idempotency-Key",
      "请求指纹与唯一约束",
      "聚合同 SKU 数量",
      "库存原子条件 UPDATE",
      "订单 / 快照 / movement 写入",
      "MySQL 事务提交或整体回滚",
      "Java 构造 businessFacts",
      "Provider 或事实约束 fallback",
    ],
    decisions: [
      {
        title: "库存扣减使用原子条件 UPDATE",
        body:
          "在 SQL 中同时判断库存并扣减，让库存竞争的胜负由单条写操作决定。",
        tradeoff:
          "未采用“先 SELECT 库存、再 UPDATE”的读后写方案；后者在并发窗口中更容易超卖。",
        failureCheck:
          "50 个不同 Key 竞争库存 10，结果为 10 个 CREATED、40 个 INVENTORY_INSUFFICIENT，最终库存为 0。",
        evidenceLinks: [
          {
            label: "订单事务流程",
            href: commerceLink("docs/architecture/ORDER_TRANSACTION_FLOW.md"),
          },
          {
            label: "MySQL 可靠性测试",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/OrderReliabilityMySqlTests.java",
            ),
          },
        ],
      },
      {
        title: "幂等落在数据库唯一约束",
        body:
          "持久化 Idempotency-Key 与请求指纹；同请求返回原订单，不同请求返回 IDEMPOTENCY_KEY_REUSED。",
        tradeoff:
          "未只使用进程内锁，因为它不能覆盖重启、重试与多实例边界，也不能留下持久化审计事实。",
        failureCheck:
          "20 个同 Key 同请求只产生一个物理订单；同 Key 不同请求返回等价 HTTP 409，且没有额外库存变化。",
        evidenceLinks: [
          {
            label: "订单流程测试",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/OrderFlowTests.java",
            ),
          },
          {
            label: "可靠性回放记录",
            href: commerceLink(
              "docs/evidence/order-reliability-v1/README.md",
            ),
          },
        ],
      },
      {
        title: "Redis 只保护 AI 接口",
        body:
          "Redis Lua 用于 AI ask endpoint 的固定窗口限流，订单正确性仍由 MySQL 事务与唯一约束保证。",
        tradeoff:
          "未让 Redis 锁参与订单正确性；这避免 Redis 状态与 MySQL 事实之间出现新的双写一致性问题。",
        failureCheck:
          "Redis 集成测试验证 5 / 60s Showcase 配置；Redis 不可用或限流结果不会改写订单事务事实。",
        evidenceLinks: [
          {
            label: "Redis 限流流程",
            href: commerceLink(
              "docs/architecture/REDIS_RATE_LIMIT_FLOW.md",
            ),
          },
          {
            label: "Redis Lua 集成测试",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/AiRateLimitRedisIntegrationTests.java",
            ),
          },
        ],
      },
      {
        title: "businessFacts 由 Java 从 MySQL 构造",
        body:
          "库存、商品与订单事实先由 Java 读取并收敛为显式契约，再交给 Provider 生成表达。",
        tradeoff:
          "未允许 Provider 自行查询或猜测库存；Provider 只消费受限事实，不拥有业务写权限。",
        failureCheck:
          "AI 客服测试校验事实字段与引用链路，防止回答使用契约之外的业务数据。",
        evidenceLinks: [
          {
            label: "AI 事实约束流程",
            href: commerceLink(
              "docs/architecture/AI_GROUNDED_ANSWER_FLOW.md",
            ),
          },
          {
            label: "AI 客服测试",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/AiCustomerServiceTests.java",
            ),
          },
        ],
      },
      {
        title: "AI 不可用时由 Java 事实降级",
        body:
          "Provider 异常时返回基于 businessFacts 的确定性降级结果，不让外部模型故障破坏业务事实。",
        tradeoff:
          "未把“强制调用外部模型”当作成功条件；可用性优先于看起来更智能的不可验证回答。",
        failureCheck:
          "Provider 禁用测试验证降级边界；回退内容仍受 Java 事实契约限制。",
        evidenceLinks: [
          {
            label: "Provider 禁用测试",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/AiFallbackDisabledTests.java",
            ),
          },
          {
            label: "AI 事实约束流程",
            href: commerceLink(
              "docs/architecture/AI_GROUNDED_ANSWER_FLOW.md",
            ),
          },
        ],
      },
    ],
    failureCases: [
      {
        label: "PRIMARY · INVENTORY COMPETITION",
        title: "库存 10，50 个不同 Key 同时竞争",
        setup: "MySQL 8.4 独立测试库；50 个不同幂等 Key 请求同一 SKU。",
        expected: "最多 10 个订单成功，不超卖；失败请求不留下订单或库存变动。",
        observed:
          "10 个 CREATED、40 个 INVENTORY_INSUFFICIENT；最终库存 0；orders、items、movements 均为 10。",
        lesson:
          "原子条件 UPDATE 与同事务证据写入能够把竞争结果收敛为可核对的数据库事实。",
        boundary:
          "这是受控本地可靠性回放，不是 QPS、吞吐量、生产压测或分布式多实例证明。",
        evidenceLinks: [
          {
            label: "打开可靠性回放",
            href: commerceLink(
              "docs/evidence/order-reliability-v1/README.md",
            ),
          },
          {
            label: "打开 MySQL 测试",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/OrderReliabilityMySqlTests.java",
            ),
          },
        ],
      },
      {
        label: "IDEMPOTENCY",
        title: "20 个同 Key 同请求",
        setup: "初始库存 10，20 个并发请求复用同一 Key 与相同请求体。",
        expected: "只产生一个物理订单，顺序重放返回原订单。",
        observed:
          "库存 10 → 9；只存在一个订单；并发非 owner 请求可能得到 IDEMPOTENCY_IN_PROGRESS。",
        lesson: "幂等语义区分 owner、并发等待与顺序重放。",
        boundary: "不外推为分布式多实例幂等能力。",
        evidenceLinks: [
          {
            label: "查看并发幂等测试",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/OrderReliabilityMySqlTests.java",
            ),
          },
        ],
      },
      {
        label: "KEY CONFLICT",
        title: "同 Key 不同请求",
        setup: "先完成一个请求，再以相同 Key 提交不同请求体。",
        expected: "拒绝错误折叠，不复用原订单。",
        observed: "返回 IDEMPOTENCY_KEY_REUSED（等价 HTTP 409），无额外库存变化。",
        lesson: "幂等键必须与请求指纹共同判断。",
        boundary: "结果来自仓库测试，不代表所有网关重试策略。",
        evidenceLinks: [
          {
            label: "查看订单流程测试",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/OrderFlowTests.java",
            ),
          },
        ],
      },
      {
        label: "ROLLBACK",
        title: "第二个 SKU 缺货触发整体回滚",
        setup: "两个 SKU；第一个有库存，第二个库存为 0。",
        expected: "整个订单失败，第一个 SKU 的预扣减恢复。",
        observed: "orders、items、movements 均为 0，第一个 SKU 库存恢复。",
        lesson: "订单与库存证据必须处于同一 MySQL 事务。",
        boundary: "未覆盖支付、物流或跨服务 Saga。",
        evidenceLinks: [
          {
            label: "查看回滚测试",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/OrderReliabilityMySqlTests.java",
            ),
          },
        ],
      },
      {
        label: "DUPLICATE SKU",
        title: "重复 SKU 先聚合再扣减",
        setup: "同一请求中相同 SKU 数量分别为 2 与 3。",
        expected: "聚合为数量 5，避免重复写入和分段扣减。",
        observed: "只产生一个 order item 与一个 inventory movement。",
        lesson: "在事务入口规范化请求，减少后续一致性分支。",
        boundary: "只验证单订单内聚合，不代表批量导入能力。",
        evidenceLinks: [
          {
            label: "查看重复 SKU 测试",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/OrderFlowTests.java",
            ),
          },
        ],
      },
    ],
    evidence: [
      commerceStatus,
      {
        claim: "ORDER RELIABILITY VERIFIED ×3",
        scope: `${commerceRepo} main @ ${commerceSha.slice(0, 7)} · MySQL 8.4 独立数据库`,
        evidenceLabel: "Order Reliability Evidence V1",
        evidenceHref: commerceLink(
          "docs/evidence/order-reliability-v1/README.md",
        ),
        repositorySha: commerceSha,
        verifiedAt: commerceVerifiedAt,
        boundary: "覆盖库存竞争、并发幂等、Key 冲突与回滚；不是生产负载或吞吐量测试。",
        verificationType: "local",
      },
      {
        claim: "REDIS LUA · 5 / 60s",
        scope: `${commerceRepo} main @ ${commerceSha.slice(0, 7)} · AI ask endpoint`,
        evidenceLabel: "Redis rate-limit flow",
        evidenceHref: commerceLink(
          "docs/architecture/REDIS_RATE_LIMIT_FLOW.md",
        ),
        repositorySha: commerceSha,
        verifiedAt: commerceVerifiedAt,
        boundary: "固定窗口 Showcase 配置；不代表 DDoS 防护或生产限流能力。",
        verificationType: "documentation",
      },
    ],
    caseEvidence: [
      commerceStatus,
      {
        claim: "50 REQUESTS / STOCK 10",
        scope: "受控 MySQL 可靠性回放 · 10 CREATED / 40 INSUFFICIENT",
        evidenceLabel: "库存竞争回放",
        evidenceHref: commerceLink(
          "docs/evidence/order-reliability-v1/README.md",
        ),
        repositorySha: commerceSha,
        verifiedAt: commerceVerifiedAt,
        boundary: "本地并发场景，不是生产压测、QPS 或吞吐量指标。",
        verificationType: "local",
      },
      {
        claim: "20 SAME-KEY REQUESTS / 1 ORDER",
        scope: "同 Key 同请求 · 库存 10 → 9 · 顺序重放返回原订单",
        evidenceLabel: "并发幂等测试",
        evidenceHref: commerceLink(
          "apps/mall-api/src/test/java/com/commerceflow/mall/OrderReliabilityMySqlTests.java",
        ),
        repositorySha: commerceSha,
        verifiedAt: commerceVerifiedAt,
        boundary: "不声称分布式多实例幂等。",
        verificationType: "local",
      },
      {
        claim: "ROLLBACK / ZERO RESIDUE",
        scope: "第二个 SKU 缺货 · orders/items/movements = 0",
        evidenceLabel: "事务回滚测试",
        evidenceHref: commerceLink(
          "apps/mall-api/src/test/java/com/commerceflow/mall/OrderReliabilityMySqlTests.java",
        ),
        repositorySha: commerceSha,
        verifiedAt: commerceVerifiedAt,
        boundary: "只覆盖单体 MySQL 事务，不覆盖跨服务 Saga。",
        verificationType: "local",
      },
    ],
    sourceGroups: [
      {
        title: "SOURCE",
        items: [
          {
            label: "Repository README",
            description: "运行方式、能力范围与本地 Showcase 说明。",
            href: commerceLink("README.md"),
            kind: "source",
          },
        ],
      },
      {
        title: "TEST",
        items: [
          {
            label: "OrderFlowTests",
            description: "幂等冲突、重复 SKU 与订单主流程。",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/OrderFlowTests.java",
            ),
            kind: "test",
          },
          {
            label: "OrderReliabilityMySqlTests",
            description: "库存竞争、并发幂等与事务回滚。",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/OrderReliabilityMySqlTests.java",
            ),
            kind: "test",
          },
          {
            label: "AI & Redis tests",
            description: "事实约束、Provider 禁用与 Redis Lua 限流。",
            href: commerceLink(
              "apps/mall-api/src/test/java/com/commerceflow/mall/AiCustomerServiceTests.java",
            ),
            kind: "test",
          },
        ],
      },
      {
        title: "DOCUMENT",
        items: [
          {
            label: "ORDER_TRANSACTION_FLOW",
            description: "订单、幂等、库存与回滚的事务边界。",
            href: commerceLink(
              "docs/architecture/ORDER_TRANSACTION_FLOW.md",
            ),
            kind: "document",
          },
          {
            label: "Order Reliability Evidence V1",
            description: "五类受控可靠性回放的输入、结果与边界。",
            href: commerceLink(
              "docs/evidence/order-reliability-v1/README.md",
            ),
            kind: "document",
          },
          {
            label: "AI_GROUNDED_ANSWER_FLOW",
            description: "Java businessFacts、Provider 与 fallback 契约。",
            href: commerceLink(
              "docs/architecture/AI_GROUNDED_ANSWER_FLOW.md",
            ),
            kind: "document",
          },
          {
            label: "OWNERSHIP_GAPS",
            description: "本人贡献、AI 协作与 learning rebuild 缺口。",
            href: commerceLink("docs/career/OWNERSHIP_GAPS.md"),
            kind: "document",
          },
        ],
      },
      {
        title: "CI",
        items: [],
        emptyNote: "本案例未绑定远端 CI；只展示该提交的本地回放与文档证据。",
      },
    ],
    boundaries: [
      "当前没有真实注册登录，userId=1 是演示用户。",
      "不包含支付、物流、退款、优惠券或生产认证。",
      "AI 默认使用确定性 commerceflow-mock，不包装成真实外部大模型效果。",
      "可靠性结果不外推为高并发生产能力、QPS 或商业系统压测。",
    ],
    coverImage: coverImage(
      "/projects/commerceflow/order-inventory.png",
      "COMMERCEFLOW / ORDER TRUTH",
      "CommerceFlow 订单一致性作品集封面，包含订单、库存和 AI 服务证据切片",
      "Editorial cover composition built from the local CommerceFlow evidence screens.",
    ),
    primaryImage: {
      alt: "CommerceFlow 订单管理与库存执行证据真实运行页面",
      description: "Order, SKU and inventory evidence from a local run.",
      frameKind: "hero",
      height: 1080,
      label: "ORDER & INVENTORY EVIDENCE",
      objectPosition: "50% 46%",
      originalSrc: "/projects/commerceflow/order-inventory.png",
      responsiveSrc: "/projects/commerceflow/responsive/order-inventory-768w.webp",
      responsiveSrcSet: "/projects/commerceflow/responsive/order-inventory-480w.webp 480w, /projects/commerceflow/responsive/order-inventory-768w.webp 768w, /projects/commerceflow/responsive/order-inventory-1280w.webp 1280w, /projects/commerceflow/responsive/order-inventory-1920w.webp 1920w",
      sizes: "(max-width: 768px) calc(100vw - 32px), (max-width: 1360px) calc(100vw - 80px), 1255px",
      width: 1920,
    },
    secondaryImage: {
      alt: "CommerceFlow AI 客服 Evidence 与 Trace 页面",
      description: "Local mock provider state, business facts and trace evidence.",
      frameKind: "evidence",
      height: 1080,
      label: "AI SERVICE / TRACE EVIDENCE",
      objectPosition: "54% 46%",
      originalSrc: "/projects/commerceflow/ai-service.png",
      responsiveSrc: "/projects/commerceflow/responsive/ai-service-768w.webp",
      responsiveSrcSet: "/projects/commerceflow/responsive/ai-service-480w.webp 480w, /projects/commerceflow/responsive/ai-service-768w.webp 768w, /projects/commerceflow/responsive/ai-service-1280w.webp 1280w, /projects/commerceflow/responsive/ai-service-1920w.webp 1920w",
      sizes: "(max-width: 768px) calc(100vw - 32px), (max-width: 1360px) calc(100vw - 80px), 1255px",
      width: 1920,
    },
  },
  {
    slug: "ticket",
    no: "02",
    type: "AI APPLICATION",
    title: "Enterprise AI Ticket Copilot",
    shortTitle: "Ticket Copilot",
    summary:
      "面向企业工单处理场景的 AI 应用，串联知识检索、建议生成、人工复核、Trace 和审计流程。",
    contribution:
      "检索、引用、人工复核边界与 synthetic evaluation。",
    question:
      "AI 工单建议如何展示来源、暴露召回失败并保留人工确认？",
    stack:
      "Java 17 · Spring Boot 3 · Vue 3 · TypeScript · Keyword Retrieval · Human Review · Trace",
    tone: "violet",
    tags: ["Keyword Retrieval", "Citation", "Human Review", "Trace"],
    lens: "AI 应用",
    proof: "检索与复核",
    repo: `https://github.com/${owner}/${ticketRepo}`,
    readme: ticketLink("README.md"),
    action:
      ticketCiUrl,
    status: ticketStatus,
    homepageEvidenceClaim: "16 SYNTHETIC EVAL CASES",
    challenge:
      "普通 RAG Demo 往往只展示一个问答框，却无法回答建议引用了什么、哪些样本召回失败，以及风险动作由谁确认。本案例把失败样本和人工门禁放到成功指标旁边。",
    headings: {
      problem: "100% 命中率，\n不等于检索已经完美。",
      system: "从检索证据到人工门禁的决策链路。",
      decisions: "把引用质量与失败样本一起展示。",
      evidence: "合成评测、失败样本与审核门禁。",
    },
    ownership: {
      summary:
        "我负责项目方向、RAG 边界、验收标准、评测口径与证据核验；Codex/Claude 深度参与实现、测试和文档，不把 AI 生成代码包装为独立手写。",
      confirmed: [
        "确认 keyword retrieval 是当前可复现 baseline。",
        "确认 citation、fallback 与 Human Review 的业务门禁。",
        "核对 16 条 synthetic cases、失败样本与指标边界。",
        "运行测试、审查差异并决定最终公开表述。",
      ],
      cannotClaim: [
        "不能声称已经实现 Vector DB、Hybrid Retrieval 或 Rerank。",
        "不能把 local-rule fallback 写成真实模型质量。",
        "不能声称全部实现由本人从零独立手写。",
      ],
      evidenceHref: ticketLink("docs/TEST_REPORT.md"),
    },
    systemSteps: [
      "Ticket Input",
      "Query Rewrite",
      "Keyword Retrieval",
      "Citation Evidence",
      "Citation Gating",
      "Provider 或 local-rule fallback",
      "Answer Draft",
      "Human Review",
    ],
    decisions: [
      {
        title: "先建立 keyword retrieval baseline",
        body:
          "关键词检索易复现、易检查，可先暴露数据集、召回与引用问题。",
        tradeoff:
          "未把 Vector DB、Hybrid Retrieval 或 Rerank 写成已实现；它们保留为后续实验方向。",
        failureCheck:
          "EVAL-016 因“登录”相似词额外召回账号知识，直接暴露 baseline 的分类与 rerank 缺口。",
        evidenceLinks: [
          {
            label: "打开 RAG 评测计划",
            href: ticketLink("docs/evaluation/RAG_EVALUATION_PLAN.md"),
          },
          {
            label: "打开评测数据集",
            href: ticketLink("data/eval/ticket_rag_eval_cases.jsonl"),
          },
        ],
      },
      {
        title: "Citation gating 是回答前提",
        body:
          "引用来源被显式验证并展示；证据不足时进入 fallback 或 review。",
        tradeoff:
          "Citation Coverage 只能证明回答附带了来源，不能证明来源相关、完整或答案正确。",
        failureCheck:
          "Citation Precision 仅 81.11%，证明“有引用”与“引用准确”必须分开。",
        evidenceLinks: [
          {
            label: "打开 CitationValidatorTest",
            href: ticketLink(
              "backend/src/test/java/com/enterpriseai/ticketcopilot/service/CitationValidatorTest.java",
            ),
          },
          {
            label: "打开最新指标 JSON",
            href: ticketLink("docs/metrics/rag_metrics_latest.json"),
          },
        ],
      },
      {
        title: "高风险建议进入 Human Review",
        body:
          "Answer Draft 不会自动对外发送，Approve、Request Changes 与 Reject 构成显式门禁。",
        tradeoff:
          "多一道人工确认会增加处理时间，但避免把低证据建议直接变成外部动作。",
        failureCheck:
          "16 条 synthetic cases 中 15 条触发 Human Review Required；测试验证 review 状态流。",
        evidenceLinks: [
          {
            label: "打开 ReviewGateTest",
            href: ticketLink(
              "backend/src/test/java/com/enterpriseai/ticketcopilot/service/ReviewGateTest.java",
            ),
          },
          {
            label: "打开 Trace 证据说明",
            href: ticketLink("docs/trace-evidence.md"),
          },
        ],
      },
      {
        title: "无 API Key 时明确使用 local-rule",
        body:
          "本次评测没有配置真实 Provider Key，Provider 路径记录为 local-rule fallback。",
        tradeoff:
          "默认可运行与可复现优先于伪造外部模型调用；因此不评估真实模型生成质量。",
        failureCheck:
          "Provider fallback 100% 只表示本次没有真实 Key，不是模型成功率或质量指标。",
        evidenceLinks: [
          {
            label: "打开 Provider failure 集成测试",
            href: ticketLink(
              "backend/src/test/java/com/enterpriseai/ticketcopilot/TicketWorkflowProviderFailureIntegrationTest.java",
            ),
          },
          {
            label: "打开评测指标快照",
            href: ticketLink("docs/metrics/rag_metrics_snapshot.md"),
          },
        ],
      },
      {
        title: "100% Hit Rate 与 90% Recall 并列",
        body:
          "Top-K Hit Rate 表示至少命中一个预期来源，Context Recall@3 才反映预期来源是否完整覆盖。",
        tradeoff:
          "未只展示最漂亮的 100%；同时展示 90% Recall、81.11% Precision 和失败样本。",
        failureCheck:
          "EVAL-007、015、016 等样本说明命中并不等于上下文干净或完整。",
        evidenceLinks: [
          {
            label: "打开最新指标 JSON",
            href: ticketLink("docs/metrics/rag_metrics_latest.json"),
          },
          {
            label: "打开测试报告",
            href: ticketLink("docs/TEST_REPORT.md"),
          },
        ],
      },
      {
        title: "失败样本进入下一轮检索实验",
        body:
          "每个 failed case 保留 expected、observed 与 reason，作为分类、阈值和 rerank 的实验输入。",
        tradeoff:
          "未用人工改写结果掩盖失败；代价是公开指标不全为 100%。",
        failureCheck:
          "当前 16 条 synthetic cases 中有 6 条 failed cases，页面详细展示 EVAL-015 与 EVAL-016。",
        evidenceLinks: [
          {
            label: "打开评测数据集",
            href: ticketLink("data/eval/ticket_rag_eval_cases.jsonl"),
          },
          {
            label: "打开评测计划",
            href: ticketLink("docs/evaluation/RAG_EVALUATION_PLAN.md"),
          },
        ],
      },
    ],
    failureCases: [
      {
        label: "PRIMARY · EVAL-015",
        title: "缺少知识时仍召回无关来源",
        setup: "该 synthetic case 预期没有可用知识来源。",
        expected: "不引用知识条目，进入 fallback / review。",
        observed:
          "实际召回 KB-FAQ-KNOWLEDGE，失败原因为 unexpected_retrieval_for_fallback_case。",
        lesson:
          "关键词重叠会让系统在缺知识时仍显得“有证据”；需要 no-answer threshold、分类或 rerank。",
        boundary:
          "这是自建 synthetic demo case，只说明当前本地 baseline 的召回边界。",
        evidenceLinks: [
          {
            label: "打开 EVAL-015 数据",
            href: ticketLink("data/eval/ticket_rag_eval_cases.jsonl"),
          },
          {
            label: "打开最新评测结果",
            href: ticketLink("docs/metrics/rag_metrics_latest.json"),
          },
        ],
      },
      {
        label: "EVAL-016",
        title: "“登录”词触发账号知识误命中",
        setup: "预期来源为 KB-API-500 与 KB-OPS-003。",
        expected: "召回 API 500 与运维排查知识。",
        observed: "额外召回 KB-ACCOUNT-001。",
        lesson: "keyword baseline 需要更好的意图分类、字段权重或 rerank。",
        boundary: "不把该样本外推为真实企业工单分布。",
        evidenceLinks: [
          {
            label: "查看 EVAL-016 数据",
            href: ticketLink("data/eval/ticket_rag_eval_cases.jsonl"),
          },
        ],
      },
      {
        label: "EVAL-007",
        title: "预期端口知识旁混入运维与 Bean 来源",
        setup: "预期来源包含 KB-JAVA-PORT。",
        expected: "聚焦 Java 端口冲突知识。",
        observed: "同时召回 KB-OPS-003 与 KB-SPRING-BEAN。",
        lesson: "Top-K 命中不代表上下文没有噪声。",
        boundary: "辅助失败样本，只用于解释 Citation Precision。",
        evidenceLinks: [
          {
            label: "查看 EVAL-007 数据",
            href: ticketLink("data/eval/ticket_rag_eval_cases.jsonl"),
          },
        ],
      },
    ],
    evidence: [
      ticketStatus,
      {
        claim: "291 BACKEND TESTS",
        scope: `${ticketRepo} main @ ${ticketSha.slice(0, 7)} · backend mvn test`,
        evidenceLabel: "TEST_REPORT.md · MAIN MERGE",
        evidenceHref: ticketLink("docs/TEST_REPORT.md"),
        repositorySha: ticketSha,
        verifiedAt: ticketVerifiedAt,
        boundary: "仓库测试数量，不代表生产流量、SLA 或真实企业数据效果。",
        verificationType: "ci",
      },
      {
        claim: "6 FRONTEND TESTS",
        scope: `${ticketRepo} main @ ${ticketSha.slice(0, 7)} · frontend npm test`,
        evidenceLabel: "TEST_REPORT.md · MAIN MERGE",
        evidenceHref: ticketLink("docs/TEST_REPORT.md"),
        repositorySha: ticketSha,
        verifiedAt: ticketVerifiedAt,
        boundary: "覆盖前端演示边界与错误处理，不代表完整端到端生产验收。",
        verificationType: "ci",
      },
      {
        claim: "16 SYNTHETIC EVAL CASES",
        scope: `${ticketRepo} main @ ${ticketSha.slice(0, 7)} · local keyword retrieval dataset`,
        evidenceLabel: "RAG Evaluation Plan",
        evidenceHref: ticketLink("docs/evaluation/RAG_EVALUATION_PLAN.md"),
        repositorySha: ticketSha,
        verifiedAt: ticketVerifiedAt,
        boundary: "自建 synthetic demo cases，只验证本地检索与引用链路，不代表真实模型质量。",
        verificationType: "synthetic-evaluation",
      },
    ],
    caseEvidence: [
      {
        claim: "16 SYNTHETIC CASES",
        scope: "自建 demo dataset · 不包含真实用户数据",
        evidenceLabel: "评测数据与计划",
        evidenceHref: ticketLink("docs/evaluation/RAG_EVALUATION_PLAN.md"),
        repositorySha: ticketSha,
        verifiedAt: ticketVerifiedAt,
        boundary: "不代表真实企业工单分布或线上模型效果。",
        verificationType: "synthetic-evaluation",
      },
      {
        claim: "TOP-K HIT 100% / RECALL@3 90%",
        scope: "keyword retrieval baseline · Top-K = 3",
        evidenceLabel: "最新指标 JSON",
        evidenceHref: ticketLink("docs/metrics/rag_metrics_latest.json"),
        repositorySha: ticketSha,
        verifiedAt: ticketVerifiedAt,
        boundary: "至少命中一个预期来源，不代表召回完整或答案正确。",
        verificationType: "synthetic-evaluation",
      },
      {
        claim: "COVERAGE 100% / PRECISION 81.11%",
        scope: "citation-gated local evaluation",
        evidenceLabel: "评测指标快照",
        evidenceHref: ticketLink("docs/metrics/rag_metrics_snapshot.md"),
        repositorySha: ticketSha,
        verifiedAt: ticketVerifiedAt,
        boundary: "有引用不等于引用相关、完整或回答正确。",
        verificationType: "synthetic-evaluation",
      },
      {
        claim: "6 FAILED / 15 REVIEW REQUIRED",
        scope: "16 条 synthetic cases 的失败与门禁结果",
        evidenceLabel: "最新评测结果",
        evidenceHref: ticketLink("docs/metrics/rag_metrics_latest.json"),
        repositorySha: ticketSha,
        verifiedAt: ticketVerifiedAt,
        boundary: "失败与审核数量只适用于该固定数据集。",
        verificationType: "synthetic-evaluation",
      },
      {
        claim: "PROVIDER FALLBACK 100%",
        scope: "本次未配置真实 API Key · local-rule fallback",
        evidenceLabel: "Provider 路径说明",
        evidenceHref: ticketLink("docs/TEST_REPORT.md"),
        repositorySha: ticketSha,
        verifiedAt: ticketVerifiedAt,
        boundary: "这是配置路径结果，不是模型质量或成功率指标。",
        verificationType: "documentation",
      },
    ],
    sourceGroups: [
      {
        title: "SOURCE",
        items: [
          {
            label: "Repository README",
            description: "运行方式、Provider 边界与验证摘要。",
            href: ticketLink("README.md"),
            kind: "source",
          },
        ],
      },
      {
        title: "TEST",
        items: [
          {
            label: "CitationValidatorTest",
            description: "引用结构与证据校验规则。",
            href: ticketLink(
              "backend/src/test/java/com/enterpriseai/ticketcopilot/service/CitationValidatorTest.java",
            ),
            kind: "test",
          },
          {
            label: "TicketWorkflowIntegrationTest",
            description: "工单输入、检索、生成与审核链路。",
            href: ticketLink(
              "backend/src/test/java/com/enterpriseai/ticketcopilot/TicketWorkflowIntegrationTest.java",
            ),
            kind: "test",
          },
          {
            label: "ReviewGateTest",
            description: "人工审核门禁与状态转换。",
            href: ticketLink(
              "backend/src/test/java/com/enterpriseai/ticketcopilot/service/ReviewGateTest.java",
            ),
            kind: "test",
          },
          {
            label: "ProviderFailureIntegrationTest",
            description: "Provider 失败与 local-rule fallback。",
            href: ticketLink(
              "backend/src/test/java/com/enterpriseai/ticketcopilot/TicketWorkflowProviderFailureIntegrationTest.java",
            ),
            kind: "test",
          },
        ],
      },
      {
        title: "DOCUMENT",
        items: [
          {
            label: "RAG_EVALUATION_PLAN",
            description: "指标定义、数据集边界与实验计划。",
            href: ticketLink("docs/evaluation/RAG_EVALUATION_PLAN.md"),
            kind: "document",
          },
          {
            label: "rag_metrics_latest.json",
            description: "16 个 synthetic cases 的当前机器可读指标。",
            href: ticketLink("docs/metrics/rag_metrics_latest.json"),
            kind: "document",
          },
          {
            label: "ticket_rag_eval_cases.jsonl",
            description: "EVAL-007、015、016 等固定评测输入。",
            href: ticketLink("data/eval/ticket_rag_eval_cases.jsonl"),
            kind: "document",
          },
          {
            label: "trace-evidence",
            description: "Citation、Provider 与 Human Review 证据链。",
            href: ticketLink("docs/trace-evidence.md"),
            kind: "document",
          },
        ],
      },
      {
        title: "CI",
        items: [
          {
            label: `GitHub Actions #${ticketCiRun}`,
            description: `提交 ${ticketSha.slice(0, 7)} 的 frontend build 与 backend tests。`,
            href: ticketCiUrl,
            kind: "ci",
          },
        ],
      },
    ],
    boundaries: [
      "默认数据集为 16 条 synthetic enterprise ticket demo cases。",
      "默认检索方式是 keyword retrieval，不声称已经实现向量数据库、Hybrid Retrieval 或 Rerank。",
      "Provider fallback 100% 来自未配置真实 API Key，不是模型质量指标。",
      "100% Top-K Hit Rate 不等于检索完美；Context Recall@3 为 90%，Citation Precision 为 81.11%。",
    ],
    coverImage: coverImage(
      "/projects/ticket/workbench.png",
      "TICKET COPILOT / RAG REVIEW",
      "Enterprise Ticket Copilot 作品集封面，包含工单工作台、Trace 和 Human Review 证据切片",
      "Editorial cover composition built from the local Ticket Copilot evidence screens.",
    ),
    primaryImage: {
      alt: "Enterprise Ticket RAG Copilot 工单工作台真实运行页面",
      description: "Ticket queue, citation evidence and human review in one workbench.",
      frameKind: "hero",
      height: 1200,
      label: "TICKET WORKBENCH",
      objectPosition: "51% 42%",
      originalSrc: "/projects/ticket/workbench.png",
      responsiveSrc: "/projects/ticket/responsive/workbench-768w.webp",
      responsiveSrcSet: "/projects/ticket/responsive/workbench-480w.webp 480w, /projects/ticket/responsive/workbench-768w.webp 768w, /projects/ticket/responsive/workbench-1280w.webp 1280w, /projects/ticket/responsive/workbench-1920w.webp 1920w",
      sizes: "(max-width: 768px) calc(100vw - 32px), (max-width: 1360px) calc(100vw - 80px), 1255px",
      width: 1920,
    },
    secondaryImage: {
      alt: "Enterprise Ticket RAG Copilot Trace Timeline 真实运行页面",
      description: "Retrieval, citation, fallback and review steps for one ticket run.",
      frameKind: "evidence",
      height: 1200,
      label: "TRACE TIMELINE / EVIDENCE",
      objectPosition: "52% 43%",
      originalSrc: "/projects/ticket/trace.png",
      responsiveSrc: "/projects/ticket/responsive/trace-768w.webp",
      responsiveSrcSet: "/projects/ticket/responsive/trace-480w.webp 480w, /projects/ticket/responsive/trace-768w.webp 768w, /projects/ticket/responsive/trace-1280w.webp 1280w, /projects/ticket/responsive/trace-1920w.webp 1920w",
      sizes: "(max-width: 768px) calc(100vw - 32px), (max-width: 1360px) calc(100vw - 80px), 1255px",
      width: 1920,
    },
    metricImage: {
      alt: "Enterprise Ticket RAG Copilot 本地合成评测指标页面",
      description: "Synthetic evaluation baseline, metrics and stated boundaries.",
      frameKind: "metric",
      height: 1200,
      label: "EVALUATION METRICS",
      objectPosition: "50% 38%",
      originalSrc: "/projects/ticket/evaluation-metrics.png",
      responsiveSrc: "/projects/ticket/responsive/evaluation-metrics-768w.webp",
      responsiveSrcSet: "/projects/ticket/responsive/evaluation-metrics-480w.webp 480w, /projects/ticket/responsive/evaluation-metrics-768w.webp 768w, /projects/ticket/responsive/evaluation-metrics-1280w.webp 1280w, /projects/ticket/responsive/evaluation-metrics-1920w.webp 1920w",
      sizes: "(max-width: 768px) calc(100vw - 32px), (max-width: 1023px) 72vw, 780px",
      width: 1920,
    },
  },
  {
    slug: "devflow",
    no: "03",
    type: "AI TOOLING / AGENT WORKFLOW",
    title: "DevFlow Copilot",
    shortTitle: "DevFlow",
    summary:
      "面向开发工作流的 AI 工具，提供 Provider 路由、Prompt 模板、状态管理、日志诊断和历史记录。",
    contribution:
      "Provider、Prompt、Tool Call 与 Run Evidence 链路。",
    question:
      "一次 AI Run 中的 Prompt、Provider 和 Tool Call 如何被记录、回放和审核？",
    stack:
      "Java 17 · Spring Boot · Vue 3 · TypeScript · Provider Router · Flyway",
    tone: "lime",
    tags: ["Provider Router", "PromptOps", "Tool Call", "Run Evidence"],
    lens: "AI 工具 / Agent 工作流",
    proof: "工作流证据聚合",
    repo: `https://github.com/${owner}/${devFlowRepo}`,
    readme: devFlowLink("README.md"),
    action:
      "https://github.com/jameswilson87156-del/devflow-copilot/actions/runs/30552289460",
    status: devFlowStatus,
    homepageEvidenceClaim: "FRONTEND TEST + BUILD PASS",
    challenge:
      "AI Coding Demo 很容易变成聊天套壳。项目需要展示一次生成为什么发生、使用了哪个 Prompt Version、Provider 是否降级、调用了什么工具、生成结果如何进入人工审核。",
    headings: {
      problem: "不只保存结果，\n还要保存生成过程。",
      system: "一次 Run 的十二步可回放证据。",
      decisions: "让 Prompt、Provider、Tool 与 Review 同源。",
      evidence: "Run 证据、测试与当前提交边界。",
    },
    ownership: {
      summary:
        "我负责 PromptOps 定位、工作流边界、验收口径和公开证据核对；Codex/Claude 辅助实现与整理，所有能力声明以当前提交和可打开证据为准。",
      confirmed: [
        "确认 Prompt Version、Provider Router、Tool Call 与 Review 的证据链。",
        "确认默认 local-rule 与可选 OpenAI-compatible Provider 边界。",
        "确认 Human Review 不自动改代码、不提交 Git、不部署。",
        "核对当前 HEAD、CI 与旧 metrics snapshot 的提交差异。",
      ],
      cannotClaim: [
        "不能声称当前是复杂多 Agent Runtime。",
        "不能把关键词 / 简单相似度 Knowledge Base 写成 Vector DB。",
        "不能把旧 metrics snapshot 数量绑定为当前 HEAD 精确事实。",
      ],
      evidenceHref: devFlowLink("docs/resume-evidence.md"),
    },
    systemSteps: [
      "选择 Prompt Template + Version",
      "校验并渲染变量",
      "创建 GENERATING 记录",
      "创建 Agent Run + Prompt Render Step",
      "可选关键词 Knowledge 检索",
      "Provider Router 选择执行路径",
      "失败时记录 fallback reason",
      "写入 Generation Trace",
      "记录 Tool Call",
      "结果进入 READY_FOR_REVIEW",
      "Review: PENDING / SAVED / CONFIRMED / REJECTED",
      "不改代码、不提交 Git、不部署",
    ],
    decisions: [
      {
        title: "默认 local-rule，真实 Provider 可选",
        body:
          "无 API Key 也能稳定回放工作流；OpenAI-compatible Provider 只在显式配置时启用。",
        tradeoff:
          "未为了展示而伪造真实模型调用；默认结果不能被描述为 LLM 推理质量。",
        failureCheck:
          "Provider 路由测试验证不可用、超时与允许降级时记录 fallback reason。",
        evidenceLinks: [
          {
            label: "打开 ProviderRoutingSafetyTest",
            href: devFlowLink(
              "backend/src/test/java/com/devflow/copilot/service/provider/ProviderRoutingSafetyTest.java",
            ),
          },
          {
            label: "打开真实 Provider 验证边界",
            href: devFlowLink("docs/real-provider-verification.md"),
          },
        ],
      },
      {
        title: "一次 Run 聚合全部证据",
        body:
          "AgentStep 关联 Prompt、Provider、Generation、Tool Call 与 Human Review。",
        tradeoff:
          "未把证据散落成互不关联的日志页面；代价是需要稳定的 Run 标识与实体关系。",
        failureCheck:
          "AgenticWorkflowIntegrationTest 回放步骤关联与最终审核状态。",
        evidenceLinks: [
          {
            label: "打开 AgenticWorkflowIntegrationTest",
            href: devFlowLink(
              "backend/src/test/java/com/devflow/copilot/AgenticWorkflowIntegrationTest.java",
            ),
          },
          {
            label: "打开架构说明",
            href: devFlowLink("docs/architecture.md"),
          },
        ],
      },
      {
        title: "Prompt Version 必须持久化",
        body:
          "Run 记录具体 Template 与 Version，而不是只保留最终渲染文本。",
        tradeoff:
          "多保存版本与渲染上下文会增加数据结构，但可以解释同一输入为何产生不同结果。",
        failureCheck:
          "变量缺失或模板不匹配时，渲染测试阻止进入正常生成链路。",
        evidenceLinks: [
          {
            label: "打开 PromptTemplateRenderIntegrationTest",
            href: devFlowLink(
              "backend/src/test/java/com/devflow/copilot/PromptTemplateRenderIntegrationTest.java",
            ),
          },
          {
            label: "打开 PromptOps 架构",
            href: devFlowLink("docs/architecture.md"),
          },
        ],
      },
      {
        title: "Human Review 只改变审核状态",
        body:
          "生成结果进入 READY_FOR_REVIEW，再由 PENDING、SAVED、CONFIRMED 或 REJECTED 表达人工结论。",
        tradeoff:
          "未让确认动作直接写代码或触发部署，减少不可逆自动化风险。",
        failureCheck:
          "REJECTED 只保留审核结果与证据，不执行文件修改、Git commit 或部署。",
        evidenceLinks: [
          {
            label: "打开 GenerationWorkflowIntegrationTest",
            href: devFlowLink(
              "backend/src/test/java/com/devflow/copilot/GenerationWorkflowIntegrationTest.java",
            ),
          },
          {
            label: "打开简历证据边界",
            href: devFlowLink("docs/resume-evidence.md"),
          },
        ],
      },
      {
        title: "Knowledge Base 保持关键词基线",
        body:
          "当前仅使用关键词 / 简单相似度作为可解释的辅助检索。",
        tradeoff:
          "未声称 Vector DB、Embedding 或复杂 RAG；能力范围较窄但可复现。",
        failureCheck:
          "未命中知识时仍可进入 Provider 或 local-rule 路径，Trace 必须记录检索结果为空。",
        evidenceLinks: [
          {
            label: "打开简历证据边界",
            href: devFlowLink("docs/resume-evidence.md"),
          },
          {
            label: "打开架构说明",
            href: devFlowLink("docs/architecture.md"),
          },
        ],
      },
      {
        title: "不包装成复杂多 Agent Runtime",
        body:
          "Agent Run 是工作流证据聚合模型，不代表多个自治 Agent 之间的协商与规划。",
        tradeoff:
          "放弃夸张命名，换取与当前代码、测试和页面一致的可验证表述。",
        failureCheck:
          "前端 view-model 测试只验证 Run Evidence 展示，不证明自治 Agent 行为。",
        evidenceLinks: [
          {
            label: "打开 runEvidenceViewModel.test",
            href: devFlowLink("frontend/tests/runEvidenceViewModel.test.ts"),
          },
          {
            label: "打开简历证据边界",
            href: devFlowLink("docs/resume-evidence.md"),
          },
        ],
      },
    ],
    failureCases: [
      {
        label: "PRIMARY · PROVIDER FALLBACK",
        title: "Provider 失败时仍保留可解释 Run",
        setup:
          "OpenAI-compatible Provider 被显式选择，但调用失败且配置允许降级。",
        expected:
          "记录 Provider 选择、失败原因与 fallback reason，再进入可审核结果。",
        observed:
          "路由转入 local-rule，Generation Trace 与 Agent Run 仍关联，结果进入 READY_FOR_REVIEW。",
        lesson:
          "降级不是隐藏失败，而是把失败原因作为 Run 证据的一部分。",
        boundary:
          "默认 local-rule 不代表真实 LLM；受控 Provider 验证不代表生产稳定性或广泛兼容。",
        evidenceLinks: [
          {
            label: "打开 Provider 路由安全测试",
            href: devFlowLink(
              "backend/src/test/java/com/devflow/copilot/service/provider/ProviderRoutingSafetyTest.java",
            ),
          },
          {
            label: "打开真实 Provider 验证边界",
            href: devFlowLink("docs/real-provider-verification.md"),
          },
        ],
      },
      {
        label: "REVIEW REJECTED",
        title: "人工拒绝不会修改代码",
        setup: "生成结果进入 READY_FOR_REVIEW 后选择 REJECTED。",
        expected: "保存审核结论与 Trace，不触发代码或部署动作。",
        observed: "状态进入 REJECTED，证据链保留，仓库文件与 Git 不被自动修改。",
        lesson: "Human Review 是状态门禁，不是隐式执行器。",
        boundary: "项目没有自动提交 Git 或生产部署能力。",
        evidenceLinks: [
          {
            label: "打开生成工作流测试",
            href: devFlowLink(
              "backend/src/test/java/com/devflow/copilot/GenerationWorkflowIntegrationTest.java",
            ),
          },
        ],
      },
    ],
    evidence: [
      devFlowStatus,
      {
        claim: "FRONTEND TEST + BUILD PASS",
        scope: `${devFlowRepo} main @ ${devFlowSha.slice(0, 7)} · npm test + npm run build`,
        evidenceLabel: "GitHub Actions frontend job",
        evidenceHref:
          "https://github.com/jameswilson87156-del/devflow-copilot/actions/runs/30552289460",
        repositorySha: devFlowSha,
        verifiedAt,
        boundary: "验证前端测试与构建，不代表浏览器兼容性或生产部署。",
        verificationType: "ci",
      },
      {
        claim: "BACKEND MAVEN VERIFY PASS",
        scope: `${devFlowRepo} main @ ${devFlowSha.slice(0, 7)} · mvn -B verify`,
        evidenceLabel: "GitHub Actions backend job",
        evidenceHref:
          "https://github.com/jameswilson87156-del/devflow-copilot/actions/runs/30552289460",
        repositorySha: devFlowSha,
        verifiedAt,
        boundary: "验证该提交的后端测试与打包，不代表容器部署成功。",
        verificationType: "ci",
      },
    ],
    caseEvidence: [
      devFlowStatus,
      {
        claim: "12-STEP RUN REPLAY",
        scope: "Prompt Version → Provider → Trace → Tool → Review",
        evidenceLabel: "Architecture",
        evidenceHref: devFlowLink("docs/architecture.md"),
        repositorySha: devFlowSha,
        verifiedAt,
        boundary: "工作流证据链，不代表复杂多 Agent Runtime。",
        verificationType: "documentation",
      },
      {
        claim: "FRONTEND TEST + BUILD PASS",
        scope: `${devFlowRepo} @ ${devFlowSha.slice(0, 7)}`,
        evidenceLabel: "GitHub Actions frontend job",
        evidenceHref:
          "https://github.com/jameswilson87156-del/devflow-copilot/actions/runs/30552289460",
        repositorySha: devFlowSha,
        verifiedAt,
        boundary: "不代表已部署或已完成全部浏览器兼容验收。",
        verificationType: "ci",
      },
      {
        claim: "BACKEND MAVEN VERIFY PASS",
        scope: `${devFlowRepo} @ ${devFlowSha.slice(0, 7)}`,
        evidenceLabel: "GitHub Actions backend job",
        evidenceHref:
          "https://github.com/jameswilson87156-del/devflow-copilot/actions/runs/30552289460",
        repositorySha: devFlowSha,
        verifiedAt,
        boundary: "不代表容器运行或生产可用。",
        verificationType: "ci",
      },
    ],
    sourceGroups: [
      {
        title: "SOURCE",
        items: [
          {
            label: "Repository README",
            description: "运行方式、工作流范围与当前能力边界。",
            href: devFlowLink("README.md"),
            kind: "source",
          },
        ],
      },
      {
        title: "TEST",
        items: [
          {
            label: "PromptTemplateRenderIntegrationTest",
            description: "Prompt Version、变量校验与渲染失败。",
            href: devFlowLink(
              "backend/src/test/java/com/devflow/copilot/PromptTemplateRenderIntegrationTest.java",
            ),
            kind: "test",
          },
          {
            label: "ProviderRoutingSafetyTest",
            description: "Provider 选择、失败与 fallback reason。",
            href: devFlowLink(
              "backend/src/test/java/com/devflow/copilot/service/provider/ProviderRoutingSafetyTest.java",
            ),
            kind: "test",
          },
          {
            label: "AgenticWorkflowIntegrationTest",
            description: "Agent Run、Step、Tool 与 Review 关联。",
            href: devFlowLink(
              "backend/src/test/java/com/devflow/copilot/AgenticWorkflowIntegrationTest.java",
            ),
            kind: "test",
          },
          {
            label: "runEvidenceViewModel.test",
            description: "前端 Run Evidence 结构与边界。",
            href: devFlowLink("frontend/tests/runEvidenceViewModel.test.ts"),
            kind: "test",
          },
        ],
      },
      {
        title: "DOCUMENT",
        items: [
          {
            label: "architecture",
            description: "PromptOps、Provider、Tool 与 Review 实体关系。",
            href: devFlowLink("docs/architecture.md"),
            kind: "document",
          },
          {
            label: "resume-evidence",
            description: "可声称能力、local-rule、Knowledge 与自动化边界。",
            href: devFlowLink("docs/resume-evidence.md"),
            kind: "document",
          },
          {
            label: "real-provider-verification",
            description: "受控真实 Provider 验证及不能外推的结论。",
            href: devFlowLink("docs/real-provider-verification.md"),
            kind: "document",
          },
          {
            label: "metrics_snapshot @ 3b54c08",
            description: `旧快照固定在 ${devFlowMetricsSha.slice(0, 7)} 且采集时工作树非干净；数量不绑定当前 ${devFlowSha.slice(0, 7)}。`,
            href: blob(
              devFlowRepo,
              devFlowMetricsSha,
              "docs/metrics/metrics_snapshot.md",
            ),
            kind: "document",
          },
        ],
      },
      {
        title: "CI",
        items: [
          {
            label: "GitHub Actions #30552289460",
            description: `提交 ${devFlowSha.slice(0, 7)} 的 frontend 与 backend jobs。`,
            href: "https://github.com/jameswilson87156-del/devflow-copilot/actions/runs/30552289460",
            kind: "ci",
          },
        ],
      },
    ],
    boundaries: [
      "默认使用本地 Demo 数据和 local-rule fallback，不把它写成真实 LLM 推理。",
      "Knowledge Base 是关键词 / 简单相似度，不声称 Vector DB。",
      "Agent Run 是证据聚合工作流，不声称复杂多 Agent Runtime。",
      `metrics_snapshot 固定在旧提交 ${devFlowMetricsSha.slice(0, 7)} 且采集时工作树非干净，旧数量不绑定当前 ${devFlowSha.slice(0, 7)}。`,
      "Human Review 不自动修改代码、提交 Git 或部署生产环境。",
    ],
    coverImage: coverImage(
      "/projects/devflow/trace.png",
      "DEVFLOW / RUN EVIDENCE",
      "DevFlow Copilot 作品集封面，包含 Agent Run、Trace 和审核证据切片",
      "Editorial cover composition built from the local DevFlow evidence screens.",
    ),
    primaryImage: {
      alt: "DevFlow Copilot Agent Run Trace Evidence 页面",
      description: "Run history, trace steps and review evidence for one agent workflow.",
      frameKind: "hero",
      height: 900,
      label: "RUN TRACE / EVIDENCE",
      objectPosition: "54% 44%",
      originalSrc: "/projects/devflow/trace.png",
      responsiveSrc: "/projects/devflow/responsive/trace-768w.webp",
      responsiveSrcSet: "/projects/devflow/responsive/trace-480w.webp 480w, /projects/devflow/responsive/trace-768w.webp 768w, /projects/devflow/responsive/trace-1280w.webp 1280w, /projects/devflow/responsive/trace-1440w.webp 1440w",
      sizes: "(max-width: 768px) calc(100vw - 32px), (max-width: 1360px) calc(100vw - 80px), 1255px",
      width: 1440,
    },
    secondaryImage: {
      alt: "DevFlow Copilot AI Coding Workbench 真实运行页面",
      description: "Task configuration, generated artifact and review-ready context.",
      frameKind: "evidence",
      height: 900,
      label: "AI CODING WORKBENCH",
      objectPosition: "50% 42%",
      originalSrc: "/projects/devflow/workbench.png",
      responsiveSrc: "/projects/devflow/responsive/workbench-768w.webp",
      responsiveSrcSet: "/projects/devflow/responsive/workbench-480w.webp 480w, /projects/devflow/responsive/workbench-768w.webp 768w, /projects/devflow/responsive/workbench-1280w.webp 1280w, /projects/devflow/responsive/workbench-1440w.webp 1440w",
      sizes: "(max-width: 768px) calc(100vw - 32px), (max-width: 1360px) calc(100vw - 80px), 1255px",
      width: 1440,
    },
  },
];

export const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<string, Project>;
