# 王震龙工程作品集

面向 **Java 后端 / AI 应用开发** 实习方向的证据优先工程作品集。Vue 3 全栈交付、RAG、Agent 工作流和 PromptOps 是辅助能力，不作为第三个平级求职方向。

网站展示三个可验证案例：

- CommerceFlow AI Mall：事务链路、订单幂等、库存一致性与 AI 事实链路。
- Enterprise Ticket RAG Copilot：检索、Citation、评测、失败样本与 Human Review。
- DevFlow Copilot：PromptOps、Provider Router、Tool Call 与 Run Observability。

页面中的数字、CI、源码、截图和边界说明以公开证据为准；不声称虚假用户、虚假性能、虚假生产环境或未验证的大模型效果。

## 本地开发

```bash
npm ci
npm run dev
```

`npm run dev` 启动 Vinext/Vite 本地开发服务，仅用于开发和 HMR。

## 静态构建

```bash
npm run build
```

完整构建流程为：

```text
vinext build
→ scripts/prepare-static-release.mjs
→ scripts/verify-static-release.mjs
→ dist/client
```

静态发布契约：

- `next.config.ts` 使用 `output: "export"` 与 `trailingSlash: true`。
- 正式发布目录固定为 `dist/client`。
- 同一次构建中的 `dist/client/index.rsc` 与 `dist/client/.rsc` 必须字节一致。
- `dist/client/static-release-manifest.json` 必须存在。
- 不允许 source map 进入静态发布目录。

可单独验证：

```bash
npm run verify:static
```

## 本地静态预览

```bash
npm start
# 等价于
npm run preview:static
```

`scripts/static-preview-server.mjs` 只用于本地静态验收，不是生产服务器。运行预览前必须先完成 `npm run build`。本项目不把 `vinext start` 作为发布方式。

## 最终部署架构

目标架构是：

```text
npm run build
→ dist/client
→ 阿里云服务器
→ Nginx 静态托管
→ wzl8.top
```

当前仓库仅完成静态发布契约与本地验证，**尚未执行生产部署、Nginx 安装、DNS 或 HTTPS 配置**。

本作品集：

- 不使用数据库或 D1。
- 不提供登录、聊天或 API Route。
- 不需要生产常驻 Node.js 服务。
- 不使用 Cloudflare Worker 或 OpenAI Sites 作为正式部署目标。
- 不依赖 `env.ASSETS`、Wrangler、Miniflare 或 workerd。

## 内容与边界

- 网站不是在线简历，不提供简历下载。
- 不放头像，不显示求职城市。
- 联系方式保留 Email、GitHub 与经本人确认的微信号。
- 个人贡献、AI 协作与未实现范围在案例页中明确区分。
- Phase 1D.2B 已完成本地图片性能、Accessibility 与 SEO 收口，并保存 24 份 Lighthouse JSON 与 24 份 HTML。
- Phase 1E 的视觉、截图展示系统、克制动效与 ImageViewer True 1:1 修复已完成并封板。
- TypeScript、npm test 29/29 与静态构建门禁已通过。
- Lighthouse 最终本地结果：Desktop 100/100/100/100；Mobile 98/100/100/100。
- 阿里云 loopback-only staging 与本地 SSH 隧道验收已完成；这不等同于公网生产部署。
- 公网 80/443、DNS 与 HTTPS 仍未开放；当前不声称已完成正式公网生产发布。
- `NVDA_NOT_VERIFIED`、`ANDROID_EMULATOR_NOT_VERIFIED`、`IPHONE_SAFARI_NOT_VERIFIED`：真实辅助技术与设备发布验收仍待暂存 URL 可访问后执行。
