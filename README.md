# 王震龙 · 测试开发作品集

面向 **测试开发实习**，兼顾 AI 测试与 Agent 评测。页面优先展示可重复执行的测试、逐条结果、失败样本与公开 CI 证据。

**求职方向：测试开发 / AI 测试 / Agent 评测。** Java 后端开发是既有工程背景，不替代测试开发岗位经历。

## 测试开发主项目

1. **Gitea Quality Lab**：在隔离 Docker Compose 中测试 Gitea 28.2 / SQLite；GitHub Actions 运行记录显示 24 个测试框架单元测试和 16 个 API/UI/持久化集成用例通过。测试通过不表示发现了同等数量的产品缺陷。
2. **PromptOps Studio**：26 条固定合成用例驱动确定性 Mock Agent；每轮 26 条均执行，Agent 行为断言 24 通过、2 失败（`agent-014` 工具误选、`agent-015` 重复调用）。它不是实际模型质量分数。

PromptOps 的本地 30 分钟 Soak 完成 60/60 轮；本地 k6 完成 8,103 个订单/退款工作流，活跃 VU 峰值为 1。这些是隔离本地演练，不代表大并发容量或生产系统验证。

## 工程背景案例

CommerceFlow、Enterprise AI Ticket Copilot 和 DevFlow Copilot 保留为后端、业务状态、接口契约和 AI 工作流的工程背景案例。其原有指标继续使用各自的合成/本地范围说明。

个人项目不写成任职经历，也不声称生产容量、企业生产监控、真实模型准确率或团队内缺陷闭环成果。

## 正式网站与部署架构

当前公开测试开发作品集以 [wzl8.top](https://wzl8.top/) 为主站；[Vercel 站点](https://ai-agent-portfolio-hub.vercel.app/) 作为备用作品集入口。

`wzl8.top` 已发布测试开发作品集，展示 Gitea Quality Lab 与 PromptOps Studio 的自动化测试、Mock 评测和本地验证证据。它由独立 Nginx 静态站托管，不通过本仓库自动部署。

Vercel 站点由 `jameswilson87156-del/ai-agent-portfolio-hub` 仓库发布。本仓库保存 `wzl8.top` 所用的静态站点源码、构建校验和发布产物结构。

`wzl8.top` 的发布链路：

~~~
npm run build
→ dist/client
→ 阿里云服务器
→ Nginx 静态托管
→ HTTPS
→ wzl8.top
~~~

已验证：

- 测试开发版于 2026-10-29 发布到 `wzl8.top`，来源为仓库 `main` 静态构建，源提交 `a73f0425f08e7f12990b5e55405583c19becc1c6`。
- GitHub Actions run [40747710012](https://github.com/jameswilson87156-del/wzl-portfolio/actions/runs/40747710012) 成功，验证该源提交的 lint、类型检查、生产依赖审计和静态构建/契约测试；它与独立的域名发布操作分开。
- 发布后检查了首页、三个案例页、RSC 路由、图片、favicon、robots、sitemap 和 404；浏览器验收覆盖 1440×1000、390×844 与 320×780，页面无水平溢出、页面/控制台错误或同源失败请求，移动菜单导航通过。
- Nginx 配置检查通过；保留旧静态 release 作为回滚目标。未修改 DNS，发布仓库不保存服务器密钥、主机映射或上传凭据。
- ICP：豫ICP备2026032125号-1。
- GitHub 公共仓库：https://github.com/jameswilson87156-del/wzl-portfolio

以上状态不延伸声称已有生产业务流量、真实外部用户或生产级 AI 模型质量；ICP 信息也不等同于公安联网备案。NVDA、真实 iPhone Safari 及其他未明确验证的设备不在已验证范围内。

## 本地开发

~~~
npm ci
npm run dev
~~~

npm run dev 启动 Vinext/Vite 本地开发服务，仅用于开发和 HMR。

## 静态构建

~~~
npm run build
~~~

完整构建流程：

~~~
vinext build
→ scripts/prepare-static-release.mjs
→ scripts/verify-static-release.mjs
→ dist/client
~~~

静态发布目录固定为 dist/client。发布门禁包括：

- next.config.ts 使用 output: "export" 与 trailingSlash: true。
- 同一次构建中的 dist/client/index.rsc 与 dist/client/.rsc 必须字节一致。
- dist/client/static-release-manifest.json 必须存在。
- 不允许 source map 进入静态发布目录。

可单独执行：

~~~
npm run verify:static
~~~

## 验证状态

- `npm ci` 使用现有 lockfile 安装。
- 本分支 `npm test` 已完成：静态生产构建与 30 条契约测试通过；`npx tsc --noEmit` 通过。
- `npm run lint` 退出码为 0，0 errors、1 warning；该 warning 来自保留自适应 `srcSet` 的静态项目截图 `<img>`。
- `npm audit --omit=dev` 报告 0 个漏洞。完整开发依赖审计仍有 4 个由 Vinext 0.0.50 引入的问题（2 high、2 moderate）；修复版本需要跨主版本迁移 Vinext 与 RSC/React 依赖，尚未升级。
- 本地 Chrome 浏览器验收覆盖 1440px、390px、320px 与 DevFlow 案例页；页面无横向溢出，控制台错误 0。该证据来自本地静态预览。
- `.github/workflows/site-quality.yml` 在分支推送或面向 main 的 PR 上执行 lint、类型检查、生产依赖审计和静态构建/契约测试。
- 测试开发改版已通过 PR [#1](https://github.com/jameswilson87156-del/wzl-portfolio/pull/1) 合入 `main`；源代码质量门禁与 `wzl8.top` 发布验收分别记录。仓库没有自动部署配置，域名发布经过独立静态 release 流程完成。GitHub 账户 Website 指向 Vercel 作品集，个人资料 README 同时链接到 `wzl8.top`。
- canonical、sitemap、robots 与 ICP 页脚由现有静态验收覆盖。

Lighthouse 数据如被引用，仅代表既有本地测试结果，不等于当前公网实时结果。

## 内容与事实边界

- 本项目不是在线简历，不提供简历下载。
- 不展示头像或求职城市。
- 联系方式保留 Email、GitHub 与经本人确认的微信号。
- 个人贡献、AI 协作和未实现范围在案例页面中明确区分。
- 不把 AI 生成代码包装为独立手写，也不把 synthetic evaluation 当作真实生产效果。
- 不在仓库文档中暴露服务器 IP、SSH 信息、Nginx 私有路径、证书路径、部署密码或 Token。
