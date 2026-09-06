# 作品集交互调研与实施方向 — 2026-09-06

## 这次要解决的问题

现在的首页已经能说明技术栈、两个主项目和证据边界，但阅读路径仍然偏“静态目录”：访客看到标题后，需要自己猜项目之间的关系，再向下滚动寻找证明。

本轮交互的目标是让访客在第一屏就感受到一条可理解的工程链路：

```text
身份定位 → 选择项目 → 预览工程信号 → 进入案例 → 阅读证据
```

交互应该帮助招聘方更快理解项目，不应该用动画遮住项目事实，也不应该把作品集变成需要学习规则的游戏。

## 参考案例拆解

| 参考 | 观察到的逻辑 | 可以迁移到本作品集的部分 | 不直接照搬的部分 |
| --- | --- | --- | --- |
| [Brittany Chiang](https://brittanychiang.com/) | 身份、项目/经历索引和证明入口关系清晰，跳转成本低 | 第一屏给出明确的项目索引，点击后进入对应证据 | 不复制视觉皮肤和文案 |
| [Rauno Freiberg](https://rauno.me/) | 开场靠一句有重量的定位和克制的导航建立节奏 | 用排版和留白建立“工程判断力”的第一印象 | 不引入复杂横向滚动或装饰性布局 |
| [Bruno Simon](https://bruno-simon.com/) | 用一个记忆点很强的互动让访客产生探索动机 | 保留一个轻量的“指针追踪工程信号”，让项目链路有回应 | 不在首页加入 3D 场景、强制操作或重 WebGL |
| [Rebeca Paula case study](https://www.mateuspaula.dev/work/rebeca-paula) | 悬停项目会改变 Hero 上下文，点击后进入带过渡的案例层；交互状态会锁定并支持键盘/移动端 | 悬停或键盘聚焦项目时，同步显示该项目的工程信号；点击仍是普通锚点跳转 | 不做遮挡内容的全屏弹窗，先保证普通链接和浏览器返回行为 |
| [DataMorph — This Website](https://thedatamorph.com/projects/this-site/) | 静态内容优先，只在值得的地方使用 JavaScript；滚动显现、声明式标记和指针粒子服务于内容 | 沿用已有 IntersectionObserver、声明式 `data-*` 标记和轻量指针光晕 | 不为了一个效果引入 GSAP、Lenis 或 Canvas 框架 |
| [SEVONA portfolio case study](https://www.sevona.tech/work/personal-portfolio) | 动效应该证明某件事是真实存在的；项目少而证据完整比堆技能条更可信 | 让“TRACE”指向订单一致性、检索复核等真实工程主题；保留证据卡片 | 不使用假的熟练度百分比或与事实无关的计数动画 |
| [Syed Faseeh Uddin portfolio case study](https://faseeh.in/projects/portfolio-new/) | 不同 section 有方向性的滚动编排，悬停预览和滚动速度共同形成叙事 | 借鉴“每一段运动都有叙事目的”，让项目链路和证据段落形成 BUILD → VERIFY → EXPLAIN 节奏 | 不把 3D Hero、滚动锁定和高成本 WebGL 当作前置条件 |

### GitHub 源码级核对

这次不只看截图，还核对了公开仓库中的实现方式：

- [Brittany Chiang v4](https://github.com/bchiang7/v4) 的 `nav.js` 根据滚动方向在 `up / down` 之间切换导航，并在滚动后增加半透明背景和阴影；`menu.js` 还处理了 Escape、点击外部、窗口缩放和键盘焦点回收。这里适合迁移的是“导航服务阅读方向”，不是整套视觉皮肤。
- [PortfolioInspired](https://github.com/naphiertech/PortfolioInspired) 的 `NavigationDock.tsx` 使用很小的指针偏移制造磁吸感，`SnapSectionWrapper.tsx` 把分段状态集中管理，并为 reduced-motion 提供分支。这里适合借鉴状态边界；当前站点暂不引入 snap 滚动和新的动画运行时。
- [portfolio-interactions](https://github.com/PeteUgwu/portfolio-interactions) 把移动端菜单和项目详情 modal 做成独立交互。这个方向适合内容很少的个人站，但本作品集的案例需要保留可复制的 URL、浏览器返回和证据段落，所以继续使用普通链接和章节导航。

由此确定本轮的“更深”不是堆更多效果，而是让导航、项目选择和证据阅读拥有连续的状态反馈：向下阅读时导航让出空间，向上回读时恢复；项目入口仍然把访客带回真实案例和证据。

## 采用的方向：Evidence-driven interactive opening

中文可以叫“证据驱动的工程系统开场”。它不是模仿某个作品集的外观，而是把几种有效逻辑合成一套适合 Java 全栈与 AI 应用项目的阅读系统：

1. **开场先定位。** 先显示“Java 全栈 × AI 应用开发”和三个方向标签，标题在首屏内完成阅读。
2. **项目索引先给选择。** CommerceFlow 和 Ticket Copilot 是两个入口，每个入口同时给出一个短工程信号。
3. **预览只改变上下文。** 悬停或键盘聚焦项目时，Hero 的状态栏显示对应链路，目标项目卡片出现细微的边缘提示；内容位置不跳动。
4. **点击进入普通案例。** 锚点跳转保留浏览器原生行为，不增加“进入网站”式的门槛。
5. **滚动负责证明。** 项目进入视口时，已有 signal chain 逐步显现；证据卡片说明提交、验证方式、日期和边界。

## 交互状态机

| 状态 | 触发 | 页面反馈 | 键盘 / 移动端降级 |
| --- | --- | --- | --- |
| `idle` | 初次打开 | 标题、项目索引和默认提示可直接阅读 | 无需任何点击即可看到全部核心内容 |
| `preview` | 鼠标悬停或 Tab 聚焦项目 | 显示 `ACTIVE SIGNAL`、链路和项目色边缘提示 | 键盘聚焦完全等价；移动端保留链路文本 |
| `navigate` | 点击项目入口 | 原生平滑锚点进入项目卡片 | 保留浏览器返回和复制链接能力 |
| `read` | 项目/证据进入视口 | signal chain 和证据段落按顺序显现 | `prefers-reduced-motion` 下直接显示最终状态 |
| `reset` | 鼠标离开、焦点移出或路由卸载 | 清除当前项目高亮 | 不影响页面内容和滚动位置 |

本轮已经落地 `idle → preview → navigate` 的第一版：Hero 项目索引现在支持 pointer hover、键盘 focus、工程链路预览和目标项目边缘提示。案例页也增加了项目专属的 `READING SIGNAL`、系统/证据快速入口和移动端章节菜单。首页导航新增 `idle / up / down` 滚动状态：向下滚动超过阈值时收起，反向滚动时恢复；它使用很小的客户端组件同步状态，不引入第三方动画依赖。

## 两个项目各自的交互信号

这些标签是阅读提示，不是新的测试结论或部署声明：

- **CommerceFlow AI Mall：** `REQUEST → VERIFY → COMMIT`，提示访客从请求幂等、库存条件判断到事务提交去阅读订单事实。
- **Enterprise AI Ticket Copilot：** `RETRIEVE → REVIEW → EXPLAIN`，提示访客从检索证据、人工复核到回答解释去阅读 AI 工作流。

两个项目仍然分别链接到自己的案例页、仓库和证据；不会共享环境变量、数据库或部署结论。

## 开场编排

开场遵循“先读懂，再互动”的节奏：

```text
0–160ms      身份和状态标签出现
160–720ms    三行定位标题依次进入
700–1,780ms  扫描线和酸性标记完成一次轻提示
完成后       项目索引可悬停 / 聚焦，内容不被锁定
```

访客不需要点击、等待或关闭 Loader 才能看到项目。所有首屏文案在静态 HTML 中存在，脚本失败时仍能读取完整内容。

## 已落地与下一轮

### 已落地：案例页的“证据导航”

- 案例页 section 导航与滚动位置同步，显示 `摘要 / 系统 / 决策 / 失败 / 证据 / 边界` 当前段落。
- 桌面端保留六段横向索引，移动端使用原生 `details` 菜单；截图放大、决策展开和 source index 仍保持原有语义。
- 案例首屏的 `READING SIGNAL` 提供系统与证据快速入口，普通锚点可复制、可返回。

### 下一轮：低成本记忆点

- 在桌面端加入更细的 pointer-to-signal 光晕或点阵，移动端关闭。
- 评估是否需要一段“BUILD → VERIFY → EXPLAIN”滚动编排；如果它不能帮助理解证据，就不加入。
- 继续保持零新增运行时依赖，除非测量结果证明现有 CSS 和原生 API 不足。

### 本轮新增实现

- `app/_components/ScrollAwareHeader.tsx`：以 `requestAnimationFrame` 合并滚动事件，输出 `data-scroll-direction` 和 `data-scrolled`，首屏初始状态与服务端 HTML 一致。
- `app/_components/MobileNav.tsx`：用原生 `details` 做手机端菜单，支持项目、证据、关于、联系和 GitHub 入口；点击链接后收起，Escape 和点击菜单外也会收起。
- `app/page.tsx`：首页主导航接入滚动感知容器和移动端入口，项目入口和证据索引保持原有链接语义。
- `app/globals.css`：增加 sticky header 的半透明背景、阴影和收起/恢复过渡，以及移动端菜单面板；`prefers-reduced-motion: reduce` 下不隐藏导航。

## 不采用的模式

- 首屏强制点击、Loader 或滚动锁定。
- 用 WebGL/3D 先抢注意力，再让访客寻找项目事实。
- 自定义鼠标替换系统光标，导致键盘和触屏体验不一致。
- 虚构实时访问量、评分、性能数字或技能熟练度条。
- 把“本地 Showcase”“CI 通过”“文档说明”改写成生产部署或线上流量证明。

## 验收标准

- 桌面端和 390px 手机宽度没有横向溢出。
- 首屏标题和两个项目入口在静态 HTML 中可读，1.5 秒内无需脚本也能看到主要内容。
- 鼠标悬停和键盘 `Tab` 聚焦产生同一条预览链路。
- 移动端不依赖 hover；链路文本默认可读。
- `prefers-reduced-motion: reduce` 时不依赖动画，所有内容直接可见。
- `npm test`、`npm run lint`、`git diff --check` 通过。
- 不新增外部运行时依赖，不改变三个案例页的证据字段，不混用两个业务项目的环境信息。

## 当前边界

本调研和原型只修改本地作品集克隆，目标是让你可以在本地预览并继续打磨。没有执行 GitHub push、wzl8.top 更新、DNS 修改、阿里云部署、证书申请或任何密钥收集。公开发布仍需要单独确认。

## 本轮验证记录

- `npm test`：30 / 30 通过；静态导出包含 66 个文件，根 RSC 与别名字节一致。
- `npm run lint`：0 errors；保留 1 条既有的 `img` LCP 建议，不影响构建。
- `git diff --check`：通过。
- CDP 桌面宽度实测：导航在顶部为 `idle`，滚动到 340px 后为 `down + data-scrolled=true`，反向回读时恢复为 `up`；sticky 定位有效。
- CDP 390px 实测：首页移动菜单可展开五个入口，项目跳转后自动关闭，Escape 与点击菜单外关闭；展开时继续滚动不会让导航消失。
- CDP 390px 实测：首页与三个案例页内容宽度保持在 390px 内，横向溢出只来自被裁剪的装饰光晕和轨道，不来自标题、摘要、元信息或交互控件。
