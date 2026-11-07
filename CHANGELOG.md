# 更新记录

站点版本与所讲解的框架版本分开记：框架版本固定在 **LangChain4j 1.23.0**，站点版本见下。

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
