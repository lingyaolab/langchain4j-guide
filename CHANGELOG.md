# 更新记录

站点版本与所讲解的框架版本分开记：框架版本固定在 **LangChain4j 1.23.0**，站点版本见下。

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
