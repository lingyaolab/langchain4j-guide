/* 00A ChatClient 信息流实验室：L1 最小调用 → L2 工程化 → L3 生产化（零依赖） */
(function () {
  "use strict";

  var root = document.getElementById("fd");
  if (!root) return;

  var NODES = {
    input: { name: "Input", title: "用户输入", input: "问题字符串或模板变量", output: "PromptTemplate / Prompt", next: "Prompt", link: "03-prompt.html", linkText: "03 Prompt 与消息" },
    prompt: { name: "Prompt", title: "组装 Prompt", input: "system + user + 变量", output: "Prompt（消息列表）", next: "ChatRequest", link: "03-prompt.html", linkText: "03 Prompt 与消息" },
    request: { name: "ChatRequest", title: "构造请求", input: "messages + ChatRequestParameters", output: "ChatRequest", next: "ChatModel", link: "02-chatmodel.html", linkText: "02 ChatModel" },
    model: { name: "ChatModel", title: "模型推理", input: "ChatRequest", output: "ChatResponse（文本 / tool_calls）", next: "AI Service 工具循环", link: "02-chatmodel.html", linkText: "02 ChatModel" },
    toolLoop: { name: "ToolLoop", title: "AI Service 工具循环", input: "ChatResponse.tool_calls", output: "执行工具或直接返回", next: "ToolExecution", link: "04-ai-services.html", linkText: "04 AI Services" },
    tool: { name: "ToolExecution", title: "执行 @Tool", input: "工具名 + 参数 + InvocationContext", output: "ToolExecutionResult", next: "ChatModel 2", link: "06-tools.html", linkText: "06 Tool Calling" },
    model2: { name: "ChatModel 2", title: "带工具结果再推理", input: "上下文 + 工具结果", output: "最终 ChatResponse", next: "TokenStream / Response", link: "06-tools.html", linkText: "06 Tool Calling" },
    stream: { name: "TokenStream", title: "取结果或流式", input: "ChatResponse / TokenStream", output: "String / POJO / SSE 增量", next: "Output", link: "04-ai-services.html", linkText: "04 AI Services" },
    output: { name: "Output", title: "返回调用方", input: "String / POJO / SSE", output: "HTTP 响应或前端", next: "Controller / 前端", link: "14-capstone.html", linkText: "14 综合案例" },

    aiService: { addedAt: 2, name: "AI Service", title: "声明式接口", input: "Java 接口 + 注解", output: "动态代理实现", next: "Prompt", link: "04-ai-services.html", linkText: "04 AI Services" },
    memory: { addedAt: 2, name: "ChatMemory", title: "记忆", input: "memoryId + 历史消息", output: "注入上下文", next: "Prompt", link: "07-memory.html", linkText: "07 Memory" },
    rag: { addedAt: 2, name: "RAG", title: "ContentRetriever", input: "查询 + topK / 阈值", output: "召回内容拼进提示词", next: "Prompt", link: "08-rag-basics.html", linkText: "08 RAG 基础" },
    structured: { addedAt: 2, name: "Structured", title: "结构化输出", input: "JSON Schema + 模型输出", output: "POJO / record", next: "Output", link: "05-structured-output.html", linkText: "05 结构化输出" },
    observation: { addedAt: 2, name: "Listener", title: "可观测性", input: "请求 / 响应 / 错误", output: "日志、指标、trace", next: "监控系统", link: "12-observability-testing.html", linkText: "12 可观测性" },

    agentic: { addedAt: 3, name: "Agentic", title: "多 Agent 工作流", input: "AgenticScope", output: "sequence / parallel / loop", next: "AI Service", link: "10-agents.html", linkText: "10 Agent 与工作流" },
    mcp: { addedAt: 3, name: "MCP Client", title: "接入外部工具", input: "MCP Server 能力清单", output: "McpToolProvider", next: "ToolLoop", link: "11-mcp.html", linkText: "11 MCP" },
    mcpServer: { addedAt: 3, name: "MCP Server", title: "暴露自己的能力", input: "@Tool 方法", output: "stdio / HTTP MCP 服务", next: "外部 Agent", link: "11-mcp.html", linkText: "11 MCP" },
    guardrail: { addedAt: 3, name: "Guardrail", title: "输入/输出护栏", input: "用户输入或模型输出", output: "放行 / 重写 / 拒绝", next: "AI Service", link: "04-ai-services.html", linkText: "04 AI Services" },
    metrics: { addedAt: 3, name: "Metrics", title: "成本与延迟", input: "token 用量、耗时", output: "Micrometer 指标", next: "告警", link: "12-observability-testing.html", linkText: "12 可观测性" },
    judge: { addedAt: 3, name: "Judge", title: "质量评测", input: "回答 + 标准", output: "通过 / 失败与理由", next: "发布门禁", link: "12-observability-testing.html", linkText: "12 可观测性" },
    prod: { addedAt: 3, name: "Timeout/Retry", title: "生产边界", input: "429 / 5xx / 慢响应", output: "重试、降级、限流", next: "ChatModel", link: "13-production.html", linkText: "13 生产化" },
    deploy: { addedAt: 3, name: "Deploy", title: "部署", input: "密钥、配置、容器", output: "可观测的在线服务", next: "用户", link: "14-capstone.html", linkText: "14 综合案例" },
  };

  var LEVELS = {
    minimal: {
      label: "MINIMAL CALL",
      level: "L1",
      blurb: "L1 只有 9 个节点：输入组装成 Prompt，ChatRequest 进入 ChatModel；AI Service 处理工具循环，最后从 TokenStream/Response 取结果。",
      ids: ["input","prompt","request","model","toolLoop","tool","model2","stream","output"],
    },
    service: {
      label: "SERVICE",
      level: "L2",
      blurb: "L2 在 L1 上新增 5 个节点：AI Service、ChatMemory、RAG、StructuredOutput、Listener。业务接口开始接管编排。",
      ids: ["input","aiService","memory","rag","prompt","request","model","toolLoop","tool","model2","stream","structured","observation","output"],
    },
    production: {
      label: "PRODUCTION",
      level: "L3",
      blurb: "L3 再加 8 个外围节点：Agentic、MCP Client/Server、Guardrail、Metrics、Judge、Timeout/Retry、Deploy。它们分布在编排、工具面、观测与发布层。",
      ids: ["input","aiService","memory","rag","prompt","request","model","toolLoop","tool","mcp","model2","stream","structured","observation","agentic","guardrail","metrics","judge","prod","output","mcpServer","deploy"],
    },
  };

  var modeButtons = root.querySelectorAll(".fd-mode");
  var rail = document.getElementById("fd-rail");
  var blurb = document.getElementById("fd-blurb");
  var stepEl = document.getElementById("fd-step");
  var titleEl = document.getElementById("fd-title");
  var inputEl = document.getElementById("fd-input");
  var outputEl = document.getElementById("fd-output");
  var nextEl = document.getElementById("fd-next-node");
  var linkEl = document.getElementById("fd-link");
  var counterEl = document.getElementById("fd-counter");
  var labelEl = document.getElementById("fd-scenario-label");
  var levelEl = document.getElementById("fd-level");
  var jsonEl = document.getElementById("fd-json");
  var eventsEl = document.getElementById("fd-events");
  var packetEl = document.getElementById("fd-packet");
  var barEl = document.getElementById("fd-bar");
  var railWrap = root.querySelector(".fd-rail-wrap");
  var current = "minimal";
  var index = 0;
  var timer = null;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function nodes() {
    return LEVELS[current].ids.map(function (id) {
      return NODES[id];
    });
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function stopPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    playBtn.setAttribute("aria-pressed", "false");
    playBtn.textContent = "▶ 播放";
  }

  function paintRail() {
    rail.innerHTML = "";
    nodes().forEach(function (n, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "fd-node";
      b.dataset.i = String(i);
      var badge = n.addedAt
        ? '<span class="fd-badge l' + n.addedAt + '">+L' + n.addedAt + "</span>"
        : "";
      b.innerHTML =
        '<span class="fd-idx">' +
        pad2(i + 1) +
        "</span>" +
        badge +
        '<span class="fd-name">' +
        n.name +
        '</span><span class="fd-out">' +
        n.output +
        "</span>";
      b.addEventListener("click", function () {
        stopPlay();
        select(i);
      });
      rail.appendChild(b);
    });
  }

  function positionPacket() {
    var active = rail.querySelector(".fd-node.active");
    if (!active || !railWrap) {
      packetEl.classList.remove("on");
      return;
    }
    var wr = railWrap.getBoundingClientRect();
    var ar = active.getBoundingClientRect();
    packetEl.style.left = ar.left - wr.left + ar.width / 2 - 4 + "px";
    packetEl.classList.add("on");
  }

  function paintEvents() {
    if (!eventsEl) return;
    eventsEl.innerHTML = "";
    var from = Math.max(0, index - 6);
    nodes()
      .slice(from, index + 1)
      .forEach(function (n) {
        var chip = document.createElement("span");
        chip.className = "fd-event";
        chip.textContent = n.name;
        eventsEl.appendChild(chip);
      });
  }

  function select(i) {
    index = Math.max(0, Math.min(nodes().length - 1, i));
    var list = rail.querySelectorAll(".fd-node");
    for (var k = 0; k < list.length; k++) {
      list[k].classList.toggle("active", k === index);
      list[k].classList.toggle("done", k < index);
      if (k === index) list[k].setAttribute("aria-current", "step");
      else list[k].removeAttribute("aria-current");
    }
    var n = nodes()[index];
    var len = nodes().length;
    stepEl.textContent = "步骤 " + (index + 1) + " / " + len;
    counterEl.textContent = pad2(index + 1) + " / " + pad2(len);
    barEl.style.width = ((index + 1) / len) * 100 + "%";
    titleEl.textContent = n.title;
    inputEl.textContent = n.input;
    outputEl.textContent = n.output;
    nextEl.textContent = n.next;
    jsonEl.textContent = JSON.stringify(
      {
        step: index + 1,
        node: n.name,
        addedAt: n.addedAt || 1,
        input: n.input,
        output: n.output,
        next: n.next,
      },
      null,
      2
    );
    paintEvents();
    linkEl.innerHTML = '对应章节：<a href="' + n.link + '">' + n.linkText + "</a>";
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === len - 1;
    var active = list[index];
    if (active) {
      var left = active.offsetLeft - (rail.clientWidth - active.offsetWidth) / 2;
      if (rail.scrollWidth > rail.clientWidth + 4) {
        rail.scrollTo({
          left: Math.max(0, left),
          behavior: reduce ? "auto" : "smooth",
        });
      }
    }
    requestAnimationFrame(positionPacket);
  }

  function renderScenario(key) {
    stopPlay();
    current = key;
    index = 0;
    modeButtons.forEach(function (b) {
      b.setAttribute(
        "aria-pressed",
        b.dataset.scenario === key ? "true" : "false"
      );
    });
    blurb.textContent = LEVELS[key].blurb;
    labelEl.textContent = LEVELS[key].label;
    levelEl.textContent = LEVELS[key].level;
    eventsEl.innerHTML = "";
    jsonEl.textContent = "";
    paintRail();
    select(0);
  }

  var prevBtn = document.getElementById("fd-prev");
  var nextBtn = document.getElementById("fd-next");
  var playBtn = document.getElementById("fd-play");
  var resetBtn = document.getElementById("fd-reset");

  prevBtn.addEventListener("click", function () {
    stopPlay();
    select(index - 1);
  });
  nextBtn.addEventListener("click", function () {
    stopPlay();
    select(index + 1);
  });
  resetBtn.addEventListener("click", function () {
    stopPlay();
    select(0);
  });
  playBtn.addEventListener("click", function () {
    if (timer) {
      stopPlay();
      return;
    }
    if (index >= nodes().length - 1) select(0);
    playBtn.setAttribute("aria-pressed", "true");
    playBtn.textContent = "❚❚ 暂停";
    timer = setInterval(function () {
      if (index >= nodes().length - 1) {
        stopPlay();
        return;
      }
      select(index + 1);
    }, 1400);
  });

  modeButtons.forEach(function (b) {
    b.addEventListener("click", function () {
      renderScenario(b.dataset.scenario);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (!root.contains(document.activeElement)) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      stopPlay();
      select(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      stopPlay();
      select(index - 1);
    }
  });

  rail.addEventListener("scroll", positionPacket, { passive: true });
  window.addEventListener("resize", positionPacket);

  var requested = new URLSearchParams(location.search).get("scenario");
  renderScenario(LEVELS[requested] ? requested : "minimal");
})();
