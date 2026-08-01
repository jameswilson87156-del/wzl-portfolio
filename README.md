# 王震龙工程作品集

面向 **Java 全栈与 AI 应用开发** 实习方向的证据优先工程作品集。

**主定位：Java 全栈开发 × AI 应用开发**

项目以 Java 后端能力为核心，使用 Spring Boot 3、MySQL、Redis 与 Vue 3 完成前后端交付，同时展示 AI 工具、检索工作流、Provider Router、PromptOps、Human Review、Trace 与失败降级等应用工程实践。

AI 工具和 Agent 仅指应用工作流与证据聚合，不声称模型训练、算法研究或复杂自治多 Agent Runtime。

## 项目

项目顺序与网站一致：

1. **CommerceFlow AI Mall**
   - Java 业务系统，覆盖商品、订单与库存。
   - 重点展示幂等、库存竞争、数据一致性与异常回滚。
   - Vue 3 前端与 Java 后端完成全栈交付。

2. **Enterprise AI Ticket Copilot**
   - 当前默认检索方式为 Keyword Retrieval。
   - 展示 Citation、Human Review、Trace 与 synthetic evaluation evidence。
   - 不声称已经实现 Vector DB、Hybrid Retrieval 或 Rerank。

3. **DevFlow Copilot**
   - 展示 Provider Router、PromptOps、Tool Call 与 Run Evidence。
   - Agent Run 指应用工作流中的证据聚合，不代表复杂多 Agent Runtime。

项目页面中的数字、CI、源代码、截图和边界说明以公开证据为准；不声称虚假用户、虚假性能、生产级 AI 模型质量或未验证的外部效果。

## 正式网站与部署架构

正式网站：https://wzl8.top

当前已验证的正式公网访问链路：

~~~
npm run build
→ dist/client
→ 阿里云服务器
→ Nginx 静态托管
→ HTTPS
→ wzl8.top
~~~

已确认：

- 正式域名可访问。
- HTTPS 正常。
- Nginx 静态托管正常。
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

- npx tsc --noEmit：PASS。
- npm run lint：PASS，0 errors。
- npm test：30/30 PASS。
- npm run build：PASS。
- git diff --check：PASS。
- ImageViewer True 1:1：已验证原图 1920×1200、100% 实际尺寸与滚动位置重置。
- 移动端 320px 与 390px：无页面级横向溢出。
- canonical、sitemap、robots 与 ICP 页脚：已纳入静态验收。

Lighthouse 数据如被引用，仅代表既有本地测试结果，不等于当前公网实时结果。

## 内容与事实边界

- 本项目不是在线简历，不提供简历下载。
- 不展示头像或求职城市。
- 联系方式保留 Email、GitHub 与经本人确认的微信号。
- 个人贡献、AI 协作和未实现范围在案例页面中明确区分。
- 不把 AI 生成代码包装为独立手写，也不把 synthetic evaluation 当作真实生产效果。
- 不在仓库文档中暴露服务器 IP、SSH 信息、Nginx 私有路径、证书路径、部署密码或 Token。
