# GitHub 开源贡献调研与执行计划

**调研日期：** 2026-09-06<br />
**对应作品集：** `D:/workhome/wzl-portfolio-redesign-20260906-r3`<br />
**范围：** Java 全栈、Spring AI、MCP、RAG、测试与工程化方向<br />
**当前策略：** 先只读调研和本地准备，不 fork、不推送、不创建 Issue/PR。

## 目标

把两个项目中已经完成的工程能力转成可被招聘方验证的公开信号：

- 电商项目重点展示 AI 工作流、业务闭环、可靠性和上线证据；
- 企业工单项目重点展示企业知识库、检索增强、工具调用、权限边界和测试证据；
- 开源贡献优先选择能够复用现有 Java/Spring/MCP 能力的文档或测试型任务，先做一件小而完整的贡献，再扩展到功能开发；
- 作品集只记录真实状态：没有公开 PR 前，不写“已贡献”；只写“候选任务/准备中”。

## 调研方法

本轮通过只读方式核对了仓库许可证、贡献指南、Issue 的负责人/标签、关联 PR 和当前技术要求。筛选时排除了已经有活跃 PR、已有认领人、需要大范围架构设计或无法确认当前版本仍适用的任务。

参考的工程表达方式包括：

- 履历 bullet 用“行动 + 背景/约束 + 结果”组织，而不是罗列技术名词；见 [Michigan Engineering Impact Statements](https://career.engin.umich.edu/sample-impact-statements/)。
- 项目案例按 Problem、Role、Outcome、Stack 组织，让读者能快速判断问题、个人贡献和证据；见 [Ajay Darisi Portfolio](https://darisi.in/)。
- 工程作品要呈现测试策略、自动化检查、部署方式、已知限制和清晰提交记录；见 [Project Compass README](https://github.com/Zion8a/project-compass/blob/master/README.md)。

## 候选贡献任务

| 优先级 | 仓库与任务 | 与我们项目的连接 | 当前风险 | 下一步 |
| --- | --- | --- | --- | --- |
| P1 | [modelcontextprotocol/java-sdk#687](https://github.com/modelcontextprotocol/java-sdk/issues/687) Java MCP Server 示例不完整、不可运行 | 直接对应企业工单项目的 Java/MCP 能力，可把“能运行的最小示例 + README + 验证步骤”做成完整工程证据 | Issue 描述引用的 SDK 版本较旧，可能已有新文档替代；必须先让维护者确认当前缺口 | 先评论确认目标模块、当前分支和是否已有重复工作；确认后本地实现最小 runnable example，并运行 `./mvnw clean test` |
| P1 | [spring-projects/spring-ai-examples#94](https://github.com/spring-projects/spring-ai-examples/issues/94) 独立 Function Calling / ChatClient 示例 | 对应两个项目里 AI 工具调用和业务动作编排，适合展示“可复现、可运行、带预期输出”的贡献 | Issue 下已有志愿者留言，不能直接抢做；还要确认示例归属模块和当前 API | 先询问维护者和留言贡献者是否仍需要；确认后只添加一个聚焦示例、README、运行命令和预期结果 |
| P2 | [modelcontextprotocol/conformance#486](https://github.com/modelcontextprotocol/conformance/issues/486) 标准化测试报告 | 与我们已经整理的测试证据、CI 和验收记录高度相关，可展示测试工程能力 | 需要 TypeScript/Node 和 CLI/报告格式设计，影响面比文档示例大 | 先提出报告格式和最小输出样例，得到维护者认可后再做小范围实现 |
| P3 | [modelcontextprotocol/conformance#491](https://github.com/modelcontextprotocol/conformance/issues/491) `tools/list` 确定性排序一致性 | 与 MCP 工具目录稳定性和可重复验证相关 | 属于协议一致性测试，涉及 frozen requirements 和多实现行为，范围较大 | 只作为后续挑战任务；先阅读当前 conformance 规则，不作为第一贡献 |

## 明确暂不选择的任务

以下任务本身有技术价值，但本轮不适合作为“新贡献入口”：

- `modelcontextprotocol/java-sdk#1067`、`#293`、`#303`：均能看到已有活跃 PR 或明显的重复实现风险；
- `spring-projects/spring-ai#1343`、`#88`：已有开放 PR，不能绕过现有贡献者重复提交；
- `langchain4j/langchain4j#2101`、`#2205`、`#967`：存在认领人、关联 PR 或跨模块范围，不满足小步验证条件；
- `alibaba/spring-ai-alibaba#4018`：已有认领和多个相关 PR，且多 Agent 示例的范围偏大；
- 任何只写“needs triage”但没有可复现步骤、当前版本和维护者确认的随机 Bug，不作为第一贡献。

## 推荐执行顺序

### 第一步：确认贡献边界

优先在 `#687` 与 `#94` 中各留下一个简短、具体的确认评论，内容包括：

1. 计划修改的文件或模块；
2. 计划加入的运行命令、预期输出和测试；
3. 是否只做文档/示例，还是需要改生产代码；
4. 询问维护者是否已经有人在做，以及当前分支/API 是否仍然适用。

这一步完成前不写代码、不发 PR，避免重复劳动。

### 第二步：本地最小实现

得到确认后只选择一个任务，使用独立分支和最小变更：

- `java-sdk#687`：Java 17+、一个可运行的 MCP Server 示例、README、验证命令、正向和失败路径说明；
- `spring-ai-examples#94`：一个独立 Function Calling 示例、最小配置、README、预期输出和对应测试。

遵循目标仓库的贡献指南。MCP Java SDK 要求 Java 17+ 并运行 `./mvnw test`；LangChain4j 类项目要求正向/负向测试和 `mvn clean test`；Spring AI Alibaba 需要通过 Maven、格式化和静态检查。没有满足目标仓库检查之前不提交。

### 第三步：审阅后再公开

本地验证通过后，先检查 diff、文档可运行性和许可证/依赖，再由用户明确授权后决定是否 fork、push 和创建 PR。公开后作品集只写可核验的 Issue/PR 链接、变更范围和测试结果。

## 与作品集的衔接

在没有公开贡献之前，作品集中的 GitHub 区块应保持为：

- “Open-source direction：Java/Spring AI/MCP”；
- “Candidate contribution：issue link + planned scope”；
- 不使用“merged”“maintainer approved”“production contribution”等未验证表述。

一旦 PR 公开，再补充四项证据：

1. Issue/PR 链接；
2. 个人负责的文件和行为变化；
3. 测试/构建命令及结果；
4. 维护者反馈或合并状态。

## 状态

- 作品集本地升级：`LOCAL_PASS`
- 研究文档和候选清单：`LOCAL_PASS`
- 维护者确认：`STAGING_PENDING`
- 外部 fork、push、Issue 评论和 PR：`BLOCKED`（当前未获公开写入授权，且应在具体范围确认后进行）

本文件不包含任何 API Key、数据库密码、Redis 密码、SSH 私钥、OIDC Token 或浏览器 Cookie。
