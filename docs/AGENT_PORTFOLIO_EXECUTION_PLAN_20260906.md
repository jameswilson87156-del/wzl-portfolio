# Portfolio Agent 执行路线 — 2026-09-06

## 任务定义

把个人作品集做成一份可以放进简历和求职链接里的工程展示入口，让招聘方在第一分钟内看懂：

1. 我是谁，目标岗位是什么；
2. CommerceFlow AI Mall 和 Enterprise AI Ticket Copilot 分别解决什么工程问题；
3. 我具体负责什么；
4. 哪些结论可以由源码、测试、CI、文档和截图核验；
5. 哪些内容仍然只是本地 Showcase、合成评测或候选计划。

这条路线服务的是个人静态作品集，不把两个业务项目改造成线上业务，也不把本地证据包装成生产部署。

## 范围与硬边界

### 本轮要做

- 继续优化 `D:/workhome/wzl-portfolio-redesign-20260906-r3` 的首页、项目卡片和三个案例页；
- 保持 CommerceFlow、Ticket Copilot、DevFlow 的仓库、截图、证据和状态独立；
- 让首页负责快速定位，让案例页负责深入阅读，让证据索引负责核验；
- 用真实截图和真实仓库链接建立视觉和内容关系；
- 在本地完成构建、测试、静态发布和桌面/移动端验收；
- 先整理本地提交，再由用户明确决定是否推送 GitHub；
- 把开源贡献保持为独立的候选路线，只有在维护者确认范围后才开始外部协作。

### 本轮不做

- 不部署 CommerceFlow 或 Ticket Copilot 的阿里云 staging；
- 不修改 `wzl8.top` DNS，不申请正式证书，不切换正式域名；
- 不购买云资源，不导入真实数据，不收集或写入任何 API Key、数据库密码、Redis 密码、SSH 私钥、OIDC Token 或浏览器 Cookie；
- 不执行 `git reset --hard`、`git checkout --`、`git clean`，不覆盖未提交修改；
- 不执行 GitHub push、Fork、Issue 评论或 Pull Request，除非该外部写入被单独明确授权；
- 不把候选开源任务、合成评测、CI 通过或本地 Showcase 写成 merged、production 或真实业务效果。

## 调研结论：要学什么，不照搬什么

本轮使用 agent-reach 的 Exa 搜索和 GitHub 只读核对，参考了公开作品集、案例页和仓库文档。采用的是阅读逻辑和证据组织方式，不复制视觉资产、文案或代码。

| 参考 | 观察到的有效模式 | 迁移到本站 | 明确不照搬 |
| --- | --- | --- | --- |
| [Brittany Chiang v4](https://brittanychiang.com/) / [source](https://github.com/bchiang7/v4) | 身份、项目索引和证明入口关系紧凑，访客很快知道先看什么 | Hero 先说明岗位方向，两个主项目先给入口，GitHub 和案例链接保持可见 | 不复制个人品牌视觉和文案 |
| [Rauno Freiberg](https://rauno.me/) | 少量导航、强排版和留白可以形成记忆点 | 继续使用编辑式排版、深色开场和有限的交互信号 | 不引入复杂横向滚动或强制体验 |
| [Bruno Simon](https://bruno-simon.com/) | 一个明确的互动记忆点比许多小动画更有效 | 保留项目预览、指针光晕和链路反馈，让互动服务于工程主题 | 不引入 3D 游戏、WebGL 或滚动锁定 |
| [Project Compass](https://github.com/Zion8a/project-compass) | README 同时交代架构、测试、部署和限制，作品更容易被复核 | 案例页继续把源码、测试、提交、验证日期和边界放在同一阅读路径 | 不把 README 里的说明升级成生产数据 |
| [Software Survivor architecture portfolio](https://softwaresurvivor.com/portfolio) | 深案例和精选工作分层；只有足够证据的项目才展开架构细节 | 两个业务项目做完整案例，DevFlow 做辅助案例，避免三个项目平均用力 | 不编造客户规模或商业结果 |
| [Mission Control case study](https://prestonbezant.me/projects/apple-design-challenge/) | 先列多个 mental model，再公开选择、风险和验证假设；运行中的 Agent 需要中断和渐进披露 | 案例页明确问题、取舍、失败回放和人工复核；AI 工作流展示可解释状态 | 不把设计假设写成用户研究结论 |
| [NaniToka portfolio](https://github.com/NaniToka/toka.portfolio) | 项目可以按 Problem / Solution / Stack 分层，并用键盘可达的交互切换 | 保留问题、角色、证据三段式；交互继续使用普通链接、章节导航和可访问状态 | 不为卡片增加复杂 Modal 或依赖新的动画运行时 |
| [Amara Hulslander — Alexa+ Developer Studio](https://amara.design/portfolio/amazon-alexa-ai-agentic-developer-experience-foundations/) | Agent 工作流在关键阶段放验证点，并按决策风险分配人工确认 | Ticket Copilot 案例突出检索来源、人工复核、Trace 和失败降级 | 不宣称真实用户指标或跨组织结果 |

### 由调研确定的产品判断

作品集的“高级感”来自判断力和证据秩序，不来自动效数量。首页必须先回答定位和项目选择；案例页必须回答问题、角色、取舍和证据；每个漂亮的截图旁边都要有适用边界。

### 第二轮核对后的补强

第二轮使用公开工程文档和性能/可访问性资料复核了这条路线：

- [GitHub README 文档](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)强调仓库首页要说明项目做什么、为什么有用、如何开始以及如何获得帮助；因此案例入口必须能把读者带到对应 README、运行说明和证据文件，而不是只展示截图。
- [Microsoft ADR 指南](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)把问题背景、备选方案、决定、取舍、影响和状态视为可复核的决策记录；因此案例页中的关键决定要保留“选择了什么、放弃了什么、承担了什么代价、当前结论处于什么状态”。
- [web.dev 性能指南](https://web.dev/performance)把 LCP、CLS 和交互响应作为用户体验的基础信号；因此本地收口不只检查截图和路由，还要避免首屏透明阻塞、布局跳动和无必要的客户端运行时。
- [W3C 键盘焦点技术](https://www.w3.org/WAI/WCAG20/versions/techniques/wcag20-techniques-20081211-letter.pdf)强调键盘用户必须能够看到焦点；因此项目 rail、移动菜单、章节导航和图片查看器都必须保留清晰的 `:focus-visible` 路径。

这些资料没有改变总体方向，只把路线的证据和体验闸门补得更明确：**先让人看懂，再让人核验；先让页面稳定，再让动效出现。**

## 当前基线

当前本地仓库已经完成：

- Hero 定位：`Java 全栈开发 × AI 应用开发`；
- CommerceFlow、Ticket Copilot 的首屏项目索引和工程信号；
- `BUILD → VERIFY → EXPLAIN` 的阅读节奏；
- 滚动感知导航、移动端原生菜单和键盘聚焦状态；
- 三个项目的编辑式视觉封面，封面使用真实项目截图进行组合；
- 案例页的摘要、系统路径、决策、失败、证据、边界和 source index；
- 原始证据 PNG 保持不变，案例页仍然可以打开原图；
- 首屏标题首帧可读，动效不再用透明状态阻塞第一印象。

当前验证结果：

- 本地生产构建：`LOCAL_PASS`；
- `npm.cmd test`：30 项全部通过；
- `npm.cmd run lint`：0 errors，保留 1 条已有的原生 `<img>` LCP 建议；
- `git diff --check`：通过；
- 本地预览：[`http://127.0.0.1:5180/#projects`](http://127.0.0.1:5180/#projects)；
- GitHub 推送：`BLOCKED`，本地提交已形成但尚未推送；
- 个人网站公开发布：`STAGING_PENDING`；
- 两个业务项目阿里云 staging：`BLOCKED`，本轮不启动。

## Agent 分阶段路线

### G0 — 事实冻结与仓库边界

**目标：** 确保页面只表达已经存在的公开证据。

**执行：**

- 维护 `portfolio-data.ts` 作为项目事实入口；
- 每个项目独立维护仓库 URL、提交、验证类型、日期和边界；
- 页面文案使用“本地 Showcase”“CI VERIFIED”“synthetic evaluation”等真实状态；
- 发现缺少证据时写 `PENDING`，不使用推测性数字。

**验收：** 不出现生产部署、真实流量、真实企业数据或外部模型效果的无证据表述。

**状态：** `LOCAL_PASS`

### G1 — 开场与项目选择

**目标：** 访客不滚动、不点击也能读懂身份和两个主项目。

**执行：**

- Hero 保留一个主定位和三个方向标签；
- 项目 rail 支持 pointer hover、键盘 focus 和移动端默认可读；
- 导航向下阅读时让出空间，向上阅读时恢复；
- 首屏动效只做位移、强调和上下文反馈，不隐藏核心文案。

**验收：** 静态 HTML 有完整标题和项目入口；首屏加载慢时仍可读；`prefers-reduced-motion` 下内容直接显示。

**状态：** `LOCAL_PASS`

### G2 — 项目封面与案例阅读

**目标：** 首页封面负责吸引阅读，案例页负责证明，不让展示图冒充证据。

**执行：**

- CommerceFlow 封面突出订单事实、库存竞争和 AI trace；
- Ticket Copilot 封面突出检索、引用、Trace 和人工复核；
- DevFlow 封面保持辅助地位，突出 Run trace、Prompt、Tool Call 和 Replay；
- 首页封面继续使用真实证据截图的组合；
- 案例页保留原始截图、尺寸、alt、来源和 ImageViewer；
- 每个项目保留自己的案例路由和源码仓库，不共享部署结论。

**验收：** 封面视觉有变化，但任何新图形都不能制造新的测试结果或生产状态。

**状态：** `LOCAL_PASS`

### G3 — 证据、可访问性和响应式收口

**目标：** 让招聘方能快速扫读，让工程师能继续核验，让移动端和键盘用户得到同等信息。

**执行顺序：**

1. 在 1440px、1280px、933px 和 390px 视口检查首页与三个案例页；
2. 检查页面首屏、项目卡片、章节导航、图片查看器、移动菜单和外链焦点；
3. 检查标题、摘要、元信息、按钮和 source index 是否有横向溢出；
4. 检查 `prefers-reduced-motion`、Escape、Tab、Enter 和浏览器返回行为；
5. 只修复会影响理解、访问或证据边界的问题，不继续堆装饰动效。

**验收：** `npm.cmd test`、`npm.cmd run lint`、`git diff --check` 通过；移动端无内容级横向溢出；所有主要内容在无脚本或 reduced-motion 下仍可读。

**补充验收：** 首屏主要标题不依赖延迟动画才出现；截图和封面不会推动正文产生跳动；按钮、项目入口、菜单、章节和查看器在键盘焦点下有可见反馈；静态 HTML 不引入不必要的第三方动画运行时。

**状态：** `LOCAL_PASS`

### G4 — 本地提交与人工审阅

**目标：** 把当前本地改动整理成可审阅的提交，不改变远端。

**执行：**

- 先输出 `git status`、`git diff --stat` 和关键文件清单；
- 检查没有 `.env`、凭据、缓存、构建临时文件或真实运行时数据；
- 可按“页面结构与交互 / 视觉封面与首屏 / 调研文档”拆分提交，也可以在用户偏好明确后合并为一个提交；
- 提交后再次运行构建和测试；
- 保留可读的提交信息和回滚点。

**验收：** 用户能够看到具体文件、具体行为和测试结果；远端 `origin/main` 不发生变化。

**状态：** `LOCAL_PASS`

### G5 — GitHub 发布闸门

**目标：** 只在明确授权后公开本地作品集改动。

**执行：**

- 用户先确认要推送哪个提交和哪个远端；
- 只推送个人作品集仓库，不推送两个业务项目的 staging 配置或秘密；
- 推送前再次确认 `git diff`、测试、远端 URL 和分支；
- 推送后读取公开仓库提交和 GitHub Actions 状态；
- 公开后页面只能引用可访问的 GitHub 链接。

**验收：** 远端提交、分支、CI 和页面链接一致；失败时只做可逆回滚，不删除数据。

**状态：** `BLOCKED`，等待明确的外部写入授权。

### G6 — 个人网站公开托管

**目标：** 在 GitHub 版本稳定后，再决定是否更新个人网站的公开静态版本。

**执行：**

- 先审查静态 `dist/client`，确认路由、图片、RSC、robots、sitemap 和 manifest；
- 选择现有个人网站托管方式，不将此动作和两个业务项目的阿里云部署混在一起；
- 发布前保留当前公开版本和本地静态包，确保可回退；
- 发布后检查首页、三个案例页、外链和移动端。

**验收：** 公开 URL 的内容与已审阅提交一致；没有新 DNS、证书或业务数据库操作。

**状态：** `STAGING_PENDING`

### G7 — 独立的开源贡献路线

**目标：** 把真实工程能力转成一次可核验的小贡献，而不是先在作品集里宣称“已开源贡献”。

**候选顺序：**

1. `modelcontextprotocol/java-sdk#687`：可运行的 Java MCP Server 示例；
2. `spring-projects/spring-ai-examples#94`：独立 Function Calling / ChatClient 示例；
3. `modelcontextprotocol/conformance#486`：标准化测试报告；
4. `modelcontextprotocol/conformance#491`：`tools/list` 确定性排序一致性。

**执行规则：** 先只读核对当前版本、贡献指南、关联 PR 和认领人；维护者确认范围前不评论、不 Fork、不写代码；确认后只选一个小任务，使用独立分支，完成测试和 README，再单独取得公开写入授权。

**验收：** 作品集只有在 Issue/PR 公开且内容可核验后，才增加真实链接、负责文件、测试结果和合并状态。

**状态：** `STAGING_PENDING`

## 当前立即执行清单

本次文档建立后，Agent 按以下顺序继续工作：

- [x] 完成参考作品集和工程案例调研；
- [x] 完成首页项目 rail、滚动导航、移动菜单和编辑式项目封面；
- [x] 修复首屏标题首帧可读性；
- [x] 本地构建、30 项测试、Lint 和 diff 检查通过；
- [x] 检查桌面媒体规则、933px 和 390px 视口；1440px / 1280px 复用同一桌面规则；
- [x] 核对首页封面与案例页原始证据的对应关系；
- [x] 核对首屏 LCP/布局稳定性/交互响应的可观察结果，并记录限制；
- [x] 输出本地提交前的文件清单和 diff 摘要；
- [x] 形成可审阅的本地提交；
- [ ] 用户明确授权后再推送 GitHub；
- [ ] GitHub 稳定后再决定个人网站公开托管；
- [ ] 开源贡献另行确认维护者边界，不与作品集发布混做。

## 回滚和风险处理

- **视觉调整出现回归：** 只回退本次明确变更的文件或本地提交，保留原始证据 PNG；不使用破坏性 Git 命令。
- **移动端出现溢出：** 优先调整容器、图片裁剪和装饰层的 overflow，不改变项目事实和路由。
- **外链或 GitHub CI 失败：** 页面保留本地证据和清晰状态，暂不升级为公开通过；记录 `PENDING`。
- **用户改变方向：** 保留调研文档和当前本地提交作为分支点，再进行新的视觉方案；不覆盖未提交修改。
- **外部发布失败：** 继续保留本地静态包和上一版本公开入口，不删除项目数据，不触碰两个业务项目运行环境。

## 最终完成定义

只有同时满足以下条件，才把个人作品集路线标记为完成：

1. 首页在桌面端和移动端首屏清楚表达求职方向；
2. CommerceFlow 与 Ticket Copilot 有独立、可复制链接的案例阅读路径；
3. 项目封面、截图、仓库、测试、CI 和边界互相对应；
4. 键盘、移动端和 reduced-motion 用户可以读取同样的核心内容；
5. 构建、测试、Lint、静态发布和链接检查通过；
6. 变更已形成可审阅的本地提交；
7. GitHub 和个人网站的公开动作经过单独确认；
8. 未把任何未经证实的部署、数据、模型效果或开源贡献写成既成事实。

## 执行日志

### 2026-09-06 — 路线建立与第一轮收口

- 使用 agent-reach 的 Exa 搜索和 GitHub 只读查询补充参考样本；`agent-reach check-update` 显示当前版本 `v1.5.0` 已是最新。
- 完成首屏标题首帧可读性修正：动效保留位移与强调，但不再把核心标题设为初始透明。
- `npm.cmd test`：30 / 30 通过；静态导出 5 个路由，发布包 67 个文件，source map 为 0。
- `npm.cmd run lint`：0 errors；保留 1 条既有的原生 `<img>` LCP 建议。
- `git diff --check`：通过；只发现 Windows 行尾提示。
- 本地预览的首页和三个案例 URL 均返回 HTTP 200；首页包含 `editorial-cover` 与 `hero-project-link` 标记。
- 对当前修改文件执行凭据模式扫描，没有发现 API Key、密码、Bearer Token、私钥或 OIDC/Redis/MySQL 密钥；工作区没有新增 `.env` 文件。
- 本地提交已形成，提交信息为 `feat: turn portfolio into evidence-first case study`；远端 `origin/main` 未改变。
- 浏览器验收覆盖桌面端完整可访问树、933px 内容宽度和既有 390px 移动端检查；首屏标题、项目入口、案例证据、键盘焦点和 reduced-motion 的最终可读状态保持有效。未宣称未经真实公开 URL 测量的 Core Web Vitals 数值。

### 2026-09-06 — 真实浏览器横向边界复核

- 在 CommerceFlow 和 Enterprise AI Ticket Copilot 案例页的真实浏览器首屏截图中发现底部横条后，先区分页面源码和测量环境：`#viewport-probe` 是浏览器验收工具临时注入的 `pre` 节点，仓库源码和构建产物均不包含它。
- 刷新并排除该探针后，两个案例页的文档滚动宽度与视口内容宽度一致；`.case-orbit` 和 `.screenshot-frame-glow` 的超出矩形均处于已有父级裁剪边界内。没有为测试探针添加生产 CSS 规则，也没有改变项目证据布局。
- Ticket Copilot 首屏同样完成了角色、问题、状态、阅读信号和证据入口的独立核对；两个案例的状态和仓库链接继续保持分开记录。

### 2026-09-06 — 首屏能力面板升级

- 将首页原来的三个轻量 outline tag 升级为三格 `capability rail`，保留 `Java Full-stack`、`AI Application` 和 `AI Tooling & Agent` 原始方向，同时补充与案例证据对应的能力透镜。
- 视觉层使用项目色、编号、细粒度 mono label、工程行为副标题和受控 hover 反馈；移动端自动改为纵向面板，不改变首屏核心 CTA 或案例入口。
- 新增渲染契约测试，锁定三格面板数量和三条事实副标题；没有引入新依赖、外部资源或未经验证的技术指标。

### 2026-09-06 — 能力面板变成可达的案例入口

- 三格能力面板改为原生锚点，分别指向 CommerceFlow、Ticket Copilot 和 DevFlow 的首页案例卡片；首屏方向判断现在可以直接落到对应证据，而不依赖鼠标悬停。
- 为入口补充可见焦点轮廓、键盘可达名称和移动端相同的跳转逻辑；保留原有项目 rail，避免把能力判断和案例阅读混成一条不可解释的交互。
- 新增渲染断言锁定三个目标锚点；没有改变项目事实、状态、仓库链接或发布边界。
