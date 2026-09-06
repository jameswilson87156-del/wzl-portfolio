# 个人作品集与简历调研记录（2026-09-06）

## 调研目的

为 WZL 个人网站确定一套适合 Java 全栈与 AI 应用求职的作品集标准。目标是让招聘者在很短时间内看懂候选人的方向、项目贡献和可验证证据，同时保留高级视觉和有节制的交互。

## 参考来源与共同结构

### 工程简历写法

- [Michigan Engineering · Resumes, CVs and Cover Letters](https://career.engin.umich.edu/resumes-cvs-cover-letters/) 将简历要求归纳为清晰、简洁、一致、针对岗位定制，并建议把项目写成行动导向的 impact statement。
- [Michigan Engineering · Sample Impact Statements](https://career.engin.umich.edu/sample-impact-statements/) 使用 **Action → Context → Result** 结构：先说做了什么，再说明使用的工具、复杂度或环境，最后说明结果或目的。
- [Michigan Engineering · Sample Resume Content](https://career.engin.umich.edu/sample-resume-content/) 的项目条目先写项目标题、角色和时间，再用短句说明具体贡献，而不是罗列抽象技能。

由此确定网站内容规则：每个案例首屏先给出问题、个人贡献和验证结果；指标必须能回到仓库、测试或文档，不能用未经验证的生产数据替代结果。

### 软件工程师作品集

- [Ajay Darisi 的作品集](https://darisi.in/) 将首屏定位写成“解决什么类型的问题”，并把每个项目按 **Problem / Role / Outcome / Stack** 展开；主页明确列出精选项目数量和可访问的 live product。
- [Divyanshu Ahirrao 的作品集](https://divyanshuahirrao.com/) 将个人定位、开放状态、技术方向和精选项目放在首屏，并为项目提供独立的 case file，而不是只放图片墙。
- [Project Compass 的 GitHub README](https://github.com/Zion8a/project-compass/blob/master/README.md) 把产品目标、功能、测试策略、失败调查、CI、部署和已知限制放在同一个可检查链路中；README 明确区分“作品集演示”与生产能力。
- [System to Portfolio](https://github.com/berendsshalai/berendsshalai-project-systemtoportfolio) 将真实系统转化为 **Narrative → Architecture Evidence → Quality Proof → Interface → GitHub / Live Site** 的连续路径，并强调公开边界、可复现检查和渐进式提交。

这些案例共同说明：高质量工程作品集的高级感来自信息组织和证据密度，交互用于帮助阅读，而不是掩盖项目内容。

## 对当前 WZL 网站的映射

### 已经具备

- 两个主项目（CommerceFlow、Enterprise Ticket）加一个辅助项目（DevFlow），数量足以支撑简历，不需要继续堆项目。
- 首屏已经有求职方向、项目 rail、`BUILD · VERIFY · EXPLAIN` 叙事和 `STATIC CASE STUDIES` 边界提示。
- 案例页已经具备 Problem / Ownership、System Path、Decisions、Failure Case、Evidence 和 Boundaries 章节。
- 项目链接、源码、测试和验证日期已经有独立的数据结构。

### 本轮优化方向

1. 在项目卡片中增加一行简洁的 reviewer scan 信息：关注点、案例证明的能力、公开状态。
2. 在项目区标题下直接说明案例阅读方式，降低首次访问者的理解成本。
3. 保持两个主项目的视觉权重，DevFlow 继续作为 supporting project。
4. 继续使用克制的 hover、focus 和 scroll 动效，确保键盘访问、减少动效设置和移动端阅读正常。
5. GitHub 推送后再更新公开 commit SHA、验证日期和截图，不能提前把本地未发布改动写成公共事实。

## 简历对应关系

网站案例与简历项目条目应互相指向，但不重复整段文字：

- 简历用 2–3 条 Action / Context / Result 短句，突出最相关的工程贡献。
- 网站用完整的 Problem / Decision / Failure / Evidence 叙事，回答面试官的追问。
- 简历和网站都必须区分本人确认负责的部分、AI 协作部分和当前不能声称的能力。
- 在 GitHub 同步完成前，只能把本地测试写入内部验收记录；公开页面继续引用已公开且可打开的提交。

## 验收目标

- 首屏在 10 秒内说明求职方向和两个主项目。
- 项目卡片在一次扫读中同时看到项目类型、个人关注点和证据状态。
- 案例页第一屏可以进入系统链路或证据章节。
- 所有公开数字、commit、测试和部署说法都有可打开来源。
- 本地测试、生产构建、静态路由、移动端和 `prefers-reduced-motion` 检查通过。
