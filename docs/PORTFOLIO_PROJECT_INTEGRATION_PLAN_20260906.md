# 两个业务项目的作品集集成计划

更新日期：2026-09-06
目标：把 CommerceFlow AI Mall 与 Enterprise AI Ticket Copilot 作为两个静态工程案例放进个人作品集网站，沿用现有网站的开场、项目卡片、案例页、证据索引和移动端交互。

## 范围

- 只修改 `D:\workhome\wzl-portfolio-redesign-20260906-r3` 这个个人作品集克隆。
- 不部署两个业务应用，不启动业务项目的阿里云 staging，不改业务项目 DNS，不申请正式证书，不迁移真实数据。
- 不要求把任何 API Key、数据库密码、Redis 密码、SSH 私钥、OIDC Token 或浏览器 Cookie 发到聊天中。
- 两个业务项目在网站上仍然保持独立的仓库链接、案例路由、截图、证据、边界和贡献说明。

## 页面结构

1. 首页 Hero：以 `Java 全栈开发 × AI 应用开发` 定位开场，两个主项目入口分别指向 CommerceFlow 与 Ticket Copilot。
2. Hero 交互索引：鼠标悬停或键盘聚焦时显示各自工程信号；CommerceFlow 为 `REQUEST → VERIFY → COMMIT`，Ticket Copilot 为 `RETRIEVE → REVIEW → EXPLAIN`。
3. 证据条：项目分别展示仓库提交、验证方式、日期和边界，不把本地 Showcase、CI 或 synthetic evaluation 写成生产部署。
4. 精选项目：两个业务项目作为主案例，DevFlow 作为辅助案例；项目段落显式标记为 `STATIC CASE STUDIES`，说明它是作品集阅读入口而不是在线业务入口。
5. 案例页：`/projects/commerceflow/` 与 `/projects/ticket/` 各自拥有摘要、系统路径、决策、失败回放、证据和 source index；截图支持响应式预览和原图查看。
6. 移动端：项目索引、章节导航和案例内容保持可读，不依赖 hover 或强制动画；`prefers-reduced-motion` 直接显示内容。

## 内容边界

- CommerceFlow：展示 Java 业务系统、订单幂等、库存一致性、MySQL 事务、Redis 限流、AI businessFacts 与确定性降级。
- Ticket Copilot：展示 keyword retrieval、Citation、Trace、Human Review、synthetic evaluation 与 local-rule fallback。
- 每条证据仍绑定各自仓库与来源；不把两个项目的环境变量、数据库、部署状态或验收结果混在一起。
- 当前个人网站展示的是仓库公开证据与本地 Showcase 截图，不声明两个业务项目已经部署到阿里云或有生产流量。

## 已完成

- 两个项目已存在于首页项目索引、证据条和精选项目列表。
- 两个项目已有独立案例路由、metadata、截图、响应式预览和 source index。
- 首页已加入轻量 project rail、滚动感知导航、移动端原生菜单和项目边缘提示。
- 项目段落已更新为 `STATIC CASE STUDIES`，明确作品集与业务部署的边界。
- 网站 `npm.cmd test`：30/30 通过；静态发布包含首页、三个案例路由、证据图片、响应式图片、sitemap、robots 与发布 manifest。
- 网站 `npm.cmd run lint`：0 errors；保留 1 条既有的 Next `<img>` LCP 优化建议。
- `git diff --check`：退出码 0，仅有 Windows 行尾提示。

## 后续执行顺序

1. 在本地浏览器分别检查首页、CommerceFlow 案例页和 Ticket 案例页的桌面/390px 移动端布局、键盘导航、图片查看和章节跳转。
2. 若需要更新截图，只从两个业务项目的公开/脱敏证据目录复制到作品集 `public/projects/<slug>/`，再重新生成响应式 WebP；不复制 `.env` 或运行时数据。
3. 只在用户确认要发布个人作品集时，审查静态 `dist/client`，再选择 GitHub 或阿里云静态托管方案；发布个人网站与部署业务应用是两条独立流程。
4. 发布后继续用现有静态验收、链接检查和回滚清单；任何个人网站发布动作都不改变两个业务项目的 staging 状态。

## 验收状态

- 个人作品集本地集成：`LOCAL_PASS`
- CommerceFlow 作品案例页：`LOCAL_PASS`
- Ticket Copilot 作品案例页：`LOCAL_PASS`
- 个人网站 GitHub/阿里云公开发布：`STAGING_PENDING`
- 两个业务项目阿里云 staging：`BLOCKED`
