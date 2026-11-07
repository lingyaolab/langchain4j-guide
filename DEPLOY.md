# 部署指南

站点是零构建的纯静态文件。**发布时把 `langchain4j-learn/` 这一个目录**作为站点根即可，不需要 npm、不需要编译。

## 发布物清单

| 文件 / 目录 | 用途 |
| --- | --- |
| `langchain4j-learn/index.html` | 站点入口 |
| `langchain4j-learn/404.html` | 站内 404（自包含样式，任意深路径可用） |
| `langchain4j-learn/.nojekyll` | 关闭 GitHub Pages 的 Jekyll |
| `langchain4j-learn/robots.txt` | 控制抓取 |
| `langchain4j-learn/assets/` | 样式、脚本、搜索索引、favicon |
| `langchain4j-learn/chapters/`、`appendix/` | 全部正文 |

以下内容**不发布**：

- `.github/`、`tools/`
- `langchain4j-1.23.0/`：上游源码副本，只用于本地核对 `file:line`

## 本地预览

```powershell
cd langchain4j-guide
python -m http.server 8080
# 打开 http://localhost:8080/langchain4j-learn/
```

也可以直接双击 `langchain4j-learn/index.html`；`file://` 下搜索与主题仍可用，但个别浏览器会限制 `fetch`，建议用本地 HTTP 服务验证搜索索引。

## GitHub Pages

仓库已带 `.github/workflows/deploy-pages.yml`：

1. 推到 `main`
2. 仓库 Settings → Pages → Source 选择 **GitHub Actions**
3. 工作流会先重建搜索索引、跑 `check-site`，再上传 `langchain4j-learn/`

如果使用自定义域名，在 `langchain4j-learn/` 下新建 `CNAME`，内容写域名。

## Vercel

- Framework Preset：**Other**
- Root Directory：`langchain4j-learn`
- Build Command：留空
- Output Directory：`.`（或留空）

## Netlify

- Base directory：`langchain4j-learn`
- Build command：留空
- Publish directory：`langchain4j-learn`

## 自建服务器（Nginx）

```nginx
server {
  listen 80;
  server_name learn.example.com;
  root /srv/langchain4j-learn;
  index index.html;

  location / {
    try_files $uri $uri/ $uri.html =404;
  }

  error_page 404 /404.html;
}
```

## 发布前自检

```powershell
node tools/build-search-index.cjs
node tools/check-site.cjs
node tools/check-sources.cjs --strict
```

- `check-site`：链接、锚点、nav 与 h2 一致、meta、发布物、搜索索引覆盖
- `check-sources`：每条 `file:line` 都能在 `langchain4j-1.23.0/` 下定位

## 版本更新

1. 改 `langchain4j-learn/assets/nav.js` 的 `version`
2. 正文与附录按新版本回源
3. 重跑上面三条命令
4. 在 `CHANGELOG.md` 记录改动
