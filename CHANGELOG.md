# 更新记录

站点版本与所讲解的框架版本分开记：框架版本固定在 **LangChain4j 1.23.0**，站点版本见下。

## v1.8.0 — 2026-11-07

完成最后三章的教程化，全站 00–15 + 00A + 附录 A–E 全部按「先跑 → 再拆 → 再练」重写。

### 教程化改写

- 13 生产化：从「模型为什么会失控」开始，按超时、重试、限流、降级、成本、安全六步加边界，
  最后给上线检查清单。
- 14 综合案例：按九步搭一个知识库客服服务——建工程、入库、检索、工具、记忆、SSE、鉴权限流、
  测试、部署；每一步都能单独验证。
- 15 迁移与选型：从 Spring AI 与 LangChain4j 的边界讲起，给出概念/API 对照、版本选择、
  迁移步骤与检查清单。
- 全站不再以 API 条目罗列为主，每章都有最小可跑、逐步拆解、常见错误与练习。

## v1.7.0 — 2026-11-07

继续把 11–12 章重写成教程。

### 教程化改写

- 11 MCP：从「为什么工具要放到另一个进程」开始，选 stdio / Streamable HTTP，连客户端，
  用 `McpToolProvider` 过滤并接进 AI Service，再用社区模块把 `@Tool` 暴露成 MCP Server；
  最后讲白名单、密钥与 stdout/stderr 坑。
- 12 可观测性、测试与评测：从「出问题时最想知道什么」出发，依次加监听器、Micrometer 指标、
  Observation trace、请求断言、Judge 与 CI 回归集。
- 两章都补了常见错误与练习验收标准。

## v1.6.0 — 2026-11-07

继续把 09–10 章重写成教程。

### 教程化改写

- 09 RAG 进阶：从「追问召回为空 / 串库 / 排序不对」三个真实问题出发，逐个引入查询改写、路由、
  动态 topK 与阈值、RRF 聚合、ScoringModel 重排；最后讲怎么用回归集判断是否变好。
- 10 Agent 与工作流：从「一个 Agent 不够用」开始，先把 AI Service 变成 Agent，再用 AgenticScope 传结果，
  依次串行、并行、循环、条件分支，最后判断什么时候需要 Supervisor。
- 两章都补了「常见错误与排查」和练习验收标准。

## v1.5.0 — 2026-11-07

继续把 07–08 章重写成教程。

### 教程化改写

- 07 Memory：从「模型不记得上一轮」开始，手动历史 → 窗口记忆 → 淘汰规则 → 接进 AI Service →
  `@MemoryId` 多用户隔离 → 自定义 `ChatMemoryStore`，最后做多用户客服记忆练习。
- 08 RAG 基础：从一份退款文档开始，按「加载 → 切分 → 本地 embedding → 入库 → 检索 → AI Service」
  七步走完最小 RAG，每一步都有可运行代码与常见错误。
- 两章都使用本地 embedding / 内存向量库，避免新人在第一步就被 API Key 与外部服务卡住。

## v1.4.0 — 2026-11-07

继续把 05–06 章重写成教程。

### 教程化改写

- 05 结构化输出：从「为什么字符串返回难解析」开始，让接口直接返回 record；再讲 JSON Schema 能力、
  列表/枚举/嵌套、业务校验、OutputGuardrail 与流式边界。
- 06 Tool Calling：从「模型不能直接执行 Java」开始，跑通订单查询，再讲工具描述、用户身份、
  失败回传、执行顺序、工具循环上限，最后做订单 + 退款双工具练习。
- 两章都保留「常见错误与排查」和练习验收标准。

## v1.3.0 — 2026-11-07

继续把 03–04 章重写成教程。

### 教程化改写

- 03 Prompt 与消息：从「为什么不能把提示词写成一段话」开始，依次认识五类消息、模板变量、
  默认值与日期注入、图片输入；最后做一个带系统提示的客服助手。
- 04 AI Services：从手写 `ChatRequest` 的重复讲起，写第一个接口，再逐步接上记忆、工具与流式；
  明确「多个参数必须用 `@UserMessage` + `@V`」「同步与流式模型二选一」等新手易错点。
- 两章都改成「先跑 → 再拆 → 再练」的节奏，并补了错误排查与练习验收标准。

## v1.2.0 — 2026-11-07

开始把站点从「API 手册」重写成「面向新人的教程」，先完成 01–02 章。

### 教程化改写

- 01 环境与依赖：从空目录开始，先确认 JDK/Maven，再写完整 `pom.xml`、第一个 `Main`，每步都有验证命令。
  新增「第一次一定会遇到的 4 个错误」与命令行问答练习。
- 02 ChatModel：从最短 `chat(String)` 出发，逐步拆成消息与参数、同步与流式、多轮列表、温度与长度。
  最后做一个多轮命令行助手，并给出「怎么判断自己学会了」。
- 两章都改成「先跑 → 再拆 → 再练」的节奏，不再是 API 条目罗列。

## v1.1.0 — 2026-11-07

新增 00A「ChatClient 信息流实验室」，并完成一轮全站源码复核。

### 交互页

- L1 最小调用 9 节点、L2 工程化 14 节点、L3 生产化 22 节点。
- 可播放、单步、切换场景，每一步回跳对应章节与源码。
- 主题与站点一致：深海蓝 + 琥珀金；支持 `prefers-reduced-motion`。

### 源码复核修正

- 02/03：`ChatOptions` 改为 `ChatRequestParameters`；模板只有 `{{name}}` 是变量，单花括号不需要转义；消息类型补 `CustomMessage`。
- 01：RAG 默认检索/增强归 `langchain4j-core`；`langchain4j` 放 AI Services、记忆实现与文档加载/切分；DeepSeek baseUrl 的 `/v1` 改为厂商相关。
- 04/05：单个无注解参数才作为用户消息；JSON Schema 仅在模型支持 `RESPONSE_FORMAT_JSON_SCHEMA` 时启用；字段描述用 `@Description`；`TokenStream` 不自动解析 POJO。
- 06：`@Tool` 返回 `ToolExecutionResult` 会被 JSON 序列化，不读取 `isError`；同步/TokenStream 默认顺序执行工具；异常回传原始消息；`IMMEDIATE` 需要 AI Service 返回 `Result`。
- 08/09：RAG 组件补 `ContentInjector`，`ContentRetriever` 必须由用户提供；`minScore` 是向量库查询条件；切分单位是字符；多查询 + 重排必须配 `querySelector`。
- 10/11/12：只有设置 `outputKey` 的 Agent 才写 `AgenticScope`；并行不自动汇总；循环两个参数都有默认值；MCP/可观测性下一章链接修正；Judge 用词从「必须」改为「建议」。
- 13/14/15：流式超时在 `OpenAiStreamingChatModel` 上配置；`RoutingChatModel` 只路由不 failover；AI Service 不能同时配同步与流式模型；工具用户身份从 `chatMemoryId()` 读；beta 版本引用修正。
- 附录：`TextSegment` 不含向量；`EmbeddingStoreIngestor` 归 core；`langchain4j-mcp` 只是客户端；移除不存在的 `ToolContext` 迁移说法；默认值与方法行号引用修正。

## v1.0.0 — 2026-11-07

内容全部完成：00–15 章 + 附录 A–E，共 21 页。

### 新增

- 14 综合案例：知识库 + 工具 + 记忆 + 流式。入库、检索、`InvocationContext` 工具、`TokenStream` 到 SSE、
  接口层鉴权/限流、测试与部署配置。
- 15 迁移与选型：Spring AI ↔ LangChain4j 概念与 API 对照、0.x → 1.x 步骤、稳定/beta 版本边界、迁移检查清单。

### 站点

- 全站 21 页可读，搜索、主题、进度、目录与出处胶囊完整可用。
- `check-site` 12/12 通过，`check-sources --strict` 104 条出处全部可定位。
- 浏览器巡检 21 页无 console 错误。

## v0.6.0 — 2026-11-07

新增 13「生产化：超时、重试、限流与成本」。

### 内容

- 超时：`OpenAiChatModel.timeout(...)` 同时覆盖连接与读取；默认 15s / 60s。
- 重试：`maxRetries` 默认 2（首次 + 2 次重试），只对 429/5xx 等可重试错误有意义。
- 并发：入口租户限流、模型/工具并发分开、流式连接生命周期。
- 降级：`ChatModel` 外层主备路由、熔断与告警。
- 成本：`tokenUsage()`、`maxOutputTokens`、RAG topK 与缓存。
- 安全：密钥、日志脱敏、工具白名单与最小权限。
- 上线检查清单。

## v0.5.0 — 2026-11-07

新增 12「可观测性、测试与评测」。

### 内容

- `ChatModelListener` 的请求/响应/错误回调，以及 `OpenAiChatModel.listeners(...)` 接入。
- `MicrometerMetricsChatModelListener`：`gen_ai.client.operation.duration` 与 `gen_ai.client.token.usage`。
- `ObservationChatModelListener`：把模型调用接进 Micrometer Observation / tracing。
- 请求断言：`LangChain4jAssertions.assertThat(ChatRequest)` 与捕获请求的假模型。
- `langchain4j-test` 的 Judge：自然语言 criterion、RAG `basedOnContents(...)`。
- 回归集与 CI：检索指标与生成指标分开，固定 judge 版本，控制评测成本。

## v0.4.0 — 2026-11-07

新增 11「MCP：客户端、服务端与工具治理」。

### 内容

- 传输：stdio、Streamable HTTP、WebSocket 与 Docker stdio 的适用边界。
- 客户端：`DefaultMcpClient`、客户端 key、协议版本自动探测与初始化超时。
- 工具治理：`McpToolProvider` 的白名单、谓词过滤、改名与多 Server 失败策略。
- 服务端：社区模块 `langchain4j-community-mcp-server`，用 `@Tool` 暴露能力，`-parameters` 与 stderr 日志要求。
- 安全：工具白名单、header 密钥、工具结果不可信、分级超时。

## v0.3.0 — 2026-11-07

新增 10「Agent 与工作流」，把单次工具循环扩展到多 Agent 编排。

### 内容

- `@Agent` 声明式 Agent 与 `AgenticServices.agentBuilder(...)`。
- `AgenticScope`：`outputKey` 写状态，下游 `@V` 读状态。
- 四种工作流：`sequenceBuilder`、`parallelBuilder`、`loopBuilder`、`conditionalBuilder`。
- `loopBuilder` 的 `maxIterations` + `exitCondition` 双边界。
- `supervisorBuilder` 与 `langchain4j-agentic-patterns` 的规划模式边界。
- 生产化：模型/工具超时仍在底层配置，工作流层用循环边界、监听器与 HITL。

## v0.2.0 — 2026-11-07

新增 09「RAG 进阶」，把基础 RAG 的四段流水线升级成可替换策略。

### 内容

- 查询转换：`CompressingQueryTransformer` 处理多轮追问，`ExpandingQueryTransformer` 生成多查询（默认 3 个变体）。
- 路由：`DefaultQueryRouter` 全量分发 vs `LanguageModelQueryRouter` 按描述选路。
- 检索参数：`dynamicMaxResults` / `dynamicMinScore`，默认 topK 3、minScore 0.0。
- 聚合与重排：`DefaultContentAggregator` 的 RRF 融合，`ReRankingContentAggregator` + `ScoringModel` 重排。
- `DefaultRetrievalAugmentor` 串起四段，并通过 `AiServices.retrievalAugmentor(...)` 接入业务接口。
- 评测：recall@k、MRR、context precision 与基线意识。

## v0.1.0 — 2026-11-07

新站开张：00–08 共 9 个正文章节已可读，加 5 个附录。

### 内容

- 00 学习地图：三条学习主线、章节依赖、前置知识、无 API Key 能学到哪一步。
- 01 环境与依赖：`langchain4j-bom`、`langchain4j`、`langchain4j-open-ai`，OpenAI 兼容端点接 DeepSeek，Ollama 备选。
- 02 ChatModel：`ChatModel` / `StreamingChatModel`、`ChatRequest`、`ChatResponse`、`ChatRequestParameters`。
- 03 Prompt 与消息：System / User / AI / Tool 消息、`PromptTemplate`、多模态 `ImageContent`。
- 04 AI Services：`AiServices.create`、`@SystemMessage` / `@UserMessage` / `@V`、记忆与工具接入、`TokenStream`。
- 05 结构化输出：返回类型驱动的 JSON Schema、POJO / record、枚举与嵌套对象、校验与重试。
- 06 Tool Calling：`@Tool`、`@P`、`InvocationContext`、`ToolExecutionResult`、并行调用与异常回传。
- 07 Memory：`MessageWindowChatMemory`、`ChatMemoryStore`、`@MemoryId` 多用户隔离。
- 08 RAG 基础：`DocumentLoader`、`DocumentSplitter`、`EmbeddingModel`、`EmbeddingStore`、`EmbeddingStoreIngestor`、`ContentRetriever`。
- 附录 A 术语表、B 报错速查、C API 速查、D 源码地图、E 迁移与版本。

### 站点

- 新主题「深海蓝 + 琥珀金」：`--brand` 深蓝，`--accent` 琥珀。
- 零构建静态站，沿用 `data-src` 出处胶囊、全文搜索、阅读进度、主题切换与响应式目录。
- 搜索索引按 nav 分组拆块；章节编号进入搜索匹配文本。
- `check-site` 与 `check-sources --strict` 全部通过；出处均可在 `langchain4j-1.23.0/` 定位。

### 规划中

- 09 RAG 进阶：查询改写、重排、多路召回
- 10 Agent 与工作流
- 11 MCP
- 12 可观测性、测试与评测
- 13 生产化
- 14 综合案例
- 15 迁移与选型
