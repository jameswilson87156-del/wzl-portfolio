# Phase 2A — Portfolio Positioning Audit

> 这是修改前的只读审计记录。本文档先于产品文案与层级修改生成；本节不包含代码变更建议以外的实施结果。

## 1. Git 与范围基线

- 当前分支：release/portfolio-v1-freeze
- 当前 HEAD：76710bcccc90b902bb247a64a464d339f7a292df
- 审计时工作树：clean
- 最近三次提交：
  - 76710bc feat: prepare portfolio for wzl8.top
  - e20ed47 test: make image derivative contract self-contained
  - c6fdc26 feat: freeze engineering portfolio v1
- 本轮范围：只修改本地定位、项目分类、技术栈层级、About 与 SEO；不部署、不修改远程、不写入 Git 历史。

## 2. 首页当前信息层级

来源：app/page.tsx。

1. 当前主标题：把业务问题，做成可验证的工程系统。
2. 当前副标题/身份块：王震龙 · 软件工程本科 · 2027 届，并以 Java 后端 / AI 应用开发 作为加粗方向；正文为使用 Java、Vue 3 与 AI 能力完成业务链路、失败处理、测试和 CI 验证。
3. 当前首屏小型身份标签：JAVA BACKEND × AI APPLICATIONS；上方状态为 2027 GRAD · OPEN TO INTERNSHIP。
4. 当前方向与项目辅助文案：项目链接为 查看 CommerceFlow 案例、查看验证证据；导航为 项目、证据、GitHub、联系我。
5. 当前项目顺序：CommerceFlow AI Mall、Enterprise Ticket RAG Copilot、DevFlow Copilot，顺序已经符合 Java 业务系统 → AI 决策支持 → AI Run 可观测的叙事顺序。
6. 当前项目分类与标签：
   - CommerceFlow：JAVA TRANSACTION SYSTEM；下单幂等、库存一致性、AI businessFacts
   - Ticket：RAG DECISION SUPPORT；Keyword Retrieval、Citation、16 Synthetic Cases
   - DevFlow：PROMPTOPS / RUN OBSERVABILITY；Prompt Version、Tool Call、Run Evidence
7. 当前 About：没有独立的 About 区域；当前只有 / ENGINEERING METHOD、BUILD/VERIFY/EXPLAIN 三项和协作披露，以及 Contact 区域。
8. 当前联系入口：app/_components/ContactActions.tsx；首页保留 Email、微信与 GitHub 入口，不应新增联系方式。

## 3. 数据、SEO 与合规来源

- 项目数据来源：app/portfolio-data.ts；三个 slug 为 commerceflow、ticket、devflow。
- 首页 metadata：app/page.tsx，当前 title 为 王震龙 · Java 后端 / AI 应用开发作品集；当前 description 为 面向 Java 后端 / AI 应用开发实习的证据优先工程作品集。；canonical 已指向 https://wzl8.top/。
- 根布局 metadata：app/layout.tsx，提供 metadataBase、默认 title 与项目页 title template。
- 项目详情页 metadata：app/projects/commerceflow/page.tsx、app/projects/ticket/page.tsx、app/projects/devflow/page.tsx；正式项目路径保持不变。
- 站点配置：app/site-config.ts，origin 为 https://wzl8.top，ICP 为 豫ICP备2026032125号-1。
- robots：public/robots.txt；sitemap：public/sitemap.xml；均只声明首页与三个正式项目路径。
- 合规 footer：app/_components/SiteComplianceFooter.tsx，ICP 入口从 SITE_CONFIG 读取。
- 当前视觉与 Viewer：app/globals.css 与 app/projects/_components/ImageViewer.tsx；本轮只在首页增加克制的信息层级样式，不改 Viewer 行为与原图。

## 4. 响应式与验证基线

- 主要响应式断点位于 app/globals.css：max-width: 1023px、max-width: 700px、max-width: 440px，并有更窄屏幕的既有规则。
- 当前构建与测试入口来自 package.json：
  - npx tsc --noEmit
  - npm run lint
  - npm test
  - npm run build
- npm test 会先构建，再运行 rendered HTML、static release、安全补丁、toolchain cleanup 与 release contract 测试。
- 当前仓库未配置独立截图 npm script；本轮使用现有本地静态预览与 Playwright/Chromium 验收，不覆盖既有正式截图目录。

## 5. Phase 2A 建议

1. 将首屏主标题收敛为 Java 后端开发 × AI 应用开发，身份文字保留学生与届次信息。
2. 将全栈降为 Full-stack Delivery 方向标签，作为交付能力而非首要定位。
3. 保留项目原有顺序，将项目卡片分类与短摘要改为 Java Backend、AI Application、AI Tooling 三条清晰主线。
4. 新增小型 About 与分组三栏技术栈区域，采用事实性技术词，不加入“精通”、虚构经历、生产级能力或未经验证的量化结果。
5. 统一首页、根布局和三个项目详情页的 SEO title/description/OpenGraph，保留 canonical、sitemap、robots、ICP 与正式路径。
6. 保持深色视觉、字体、动画、Reduced Motion、Contact 与 ImageViewer 不变；只增加必要的标签和内容层级样式。
7. 修改后在四个目标视口、三个项目页、404、Contact、ICP 和 Viewer 上进行本地验收，并在独立的 .local/phase-2a-positioning-refresh/screenshots 输出对比截图。

## 6. 审计结论

现有工程已经具备证据优先的项目顺序和联系方式，主要问题是首页第一眼仍以抽象方法论作为主标题，About 缺失，项目分类与技术栈未形成 Java 后端 × AI 应用的明确求职层级。本轮建议做局部内容与信息架构优化，不进行路由、构建、依赖、服务端或视觉系统重写。