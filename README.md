# LangChain4j 1.23.0 学习站 · 仓库入口

这是学习站的源码仓库。站点本体在 [`langchain4j-learn/`](langchain4j-learn/)，可以直接当静态网站部署。

- **本地看站**：双击 [`langchain4j-learn/index.html`](langchain4j-learn/index.html)，或在仓库根执行 `python -m http.server 8080` 后访问 <http://localhost:8080/langchain4j-learn/>
- **部署**：见 [DEPLOY.md](DEPLOY.md)（GitHub Pages / Vercel / Netlify / 自建服务器）
- **更新记录**：见 [CHANGELOG.md](CHANGELOG.md)
- **自检**：`node tools/check-site.cjs` 与 `node tools/check-sources.cjs --strict`

## 目录结构

```
langchain4j-learn/         站点本体（发布时把这个目录作为站点根）
├── index.html             首页（学习进度、章节入口、更新记录）
├── 404.html               站内 404（自包含样式，任意深度可用）
├── robots.txt
├── chapters/              第 00–08 章（09–15 规划中）
├── appendix/              附录 A–E
└── assets/                base.css / site.js / nav.js / search-index.js / favicon.svg

tools/                     零依赖 Node 脚本
├── check-site.cjs         静态检查（链接、锚点、nav 一致性、meta、发布物）
├── check-sources.cjs      校验每处 file:line 能否在 1.23.0 源码里定位，并检查路径大小写
└── build-search-index.cjs 从各页正文生成全文搜索索引

langchain4j-1.23.0/        上游源码副本（仅本地核对出处用，不入库）
```

## 内容约定

- 全部内容对应 **LangChain4j 1.23.0** + **JDK 17**，默认用 **OpenAI 兼容端点**接 DeepSeek；也可换 Ollama。
- 页面上的每个版本号、默认值、配置项、抛错点都带 `file:line` 出处标签。
- 站点零构建、不联网、不依赖 CDN，`file://` 直接打开即可阅读。
- 章节清单一律改 `langchain4j-learn/assets/nav.js`；正文改动后重跑 `node tools/build-search-index.cjs`。
- 主题色是「深海蓝 + 琥珀金」：`--brand` 走深蓝，`--accent` 走琥珀。

## 拉取上游源码（本地核对出处）

```powershell
curl.exe -L -o langchain4j-1.23.0.tar.gz https://github.com/langchain4j/langchain4j/archive/refs/tags/1.23.0.tar.gz
tar -xzf langchain4j-1.23.0.tar.gz
```

`langchain4j-1.23.0/` 已在 `.gitignore` 中忽略，不要把整份源码提交进本站仓库。

## 当前进度

已可读：00–08 章 + 附录 A–E（14 页）。规划中：09 RAG 进阶、10 Agent 与工作流、11 MCP、12 可观测性与测试、13 生产化、14 综合案例、15 迁移与选型。

## 来源与许可

教程基于 [langchain4j](https://github.com/langchain4j/langchain4j) 1.23.0 的源码与官方文档整理，引用部分遵循上游 Apache-2.0 许可。
