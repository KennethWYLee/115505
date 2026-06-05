const project = {
  "id": "115505",
  "slug": "ntub-115505-social-impact-planner",
  "repo": "115505",
  "title": "社福企劃助手 Impact Planner",
  "shortName": "Impact Planner",
  "subtitle": "把服務需求轉成可執行、可衡量的社福企劃",
  "eyebrow": "115505 專業化展示版",
  "source": "五專第115505組 社福企劃助手系統手冊",
  "mark": "IP",
  "accent": "#1d4ed8",
  "accent2": "#ea580c",
  "accent3": "#16a34a",
  "dark": "#111827",
  "tabs": [
    "企劃總覽",
    "需求盤點",
    "方案設計",
    "預算 KPI",
    "AI 草稿"
  ],
  "metrics": [
    {
      "label": "進行中企劃",
      "value": "8",
      "note": "補助案與服務方案"
    },
    {
      "label": "受益輪廓",
      "value": "12",
      "note": "族群需求模型"
    },
    {
      "label": "KPI 完整度",
      "value": "84%",
      "note": "產出、結果、影響"
    },
    {
      "label": "預算風險",
      "value": "2",
      "note": "人力與材料需補強"
    }
  ],
  "visual": {
    "mode": "impact",
    "nodes": [
      [
        "需求",
        "問題與族群",
        14,
        30
      ],
      [
        "目標",
        "改變理論",
        40,
        18
      ],
      [
        "服務",
        "活動與資源",
        67,
        32
      ],
      [
        "KPI",
        "產出與成果",
        42,
        68
      ],
      [
        "提案",
        "補助文件",
        76,
        70
      ]
    ],
    "links": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        1,
        3
      ]
    ]
  },
  "panels": [
    {
      "title": "邏輯模型",
      "text": "將需求、投入、活動、產出、短中長期成果串成可審查的方案架構。",
      "tag": "Logic model"
    },
    {
      "title": "補助書草稿",
      "text": "AI 依組織背景、服務對象與 KPI 產出章節草稿，再由企劃人員修訂。",
      "tag": "Drafting"
    },
    {
      "title": "預算與風險",
      "text": "自動檢查人力、材料、行政費比例與衡量指標是否缺漏。",
      "tag": "Control"
    }
  ],
  "workflow": [
    "建立服務議題與目標族群",
    "整理問題證據與利害關係人",
    "設計活動、服務流程與資源需求",
    "編列預算與 KPI",
    "產出企劃書草稿與審查清單"
  ],
  "form": {
    "title": "新增社福企劃",
    "button": "建立企劃",
    "fields": [
      {
        "name": "topic",
        "label": "議題",
        "type": "text",
        "value": "高齡者數位陪伴與防詐教育"
      },
      {
        "name": "target",
        "label": "服務對象",
        "type": "select",
        "options": [
          "高齡者",
          "兒少",
          "身心障礙者",
          "新住民家庭"
        ],
        "value": "高齡者"
      },
      {
        "name": "outcome",
        "label": "預期成果",
        "type": "text",
        "value": "提升數位安全意識與社交連結"
      }
    ]
  },
  "recordsTitle": "企劃案件",
  "records": [
    {
      "title": "高齡者數位陪伴",
      "meta": "KPI 9/11 完成 · 預算 38 萬",
      "status": "修訂中"
    },
    {
      "title": "兒少課後支持",
      "meta": "需求證據已補齊 · 志工排班待確認",
      "status": "待審"
    },
    {
      "title": "食物銀行流程優化",
      "meta": "邏輯模型完整 · 可產出草稿",
      "status": "可輸出"
    }
  ],
  "insights": [
    "社福企劃不只需要文字漂亮，更需要需求證據、KPI 與預算一致。",
    "AI 草稿應標示待人工確認段落，避免產生不存在的服務數據。",
    "審查清單需涵蓋服務倫理、個資、風險與永續維運。"
  ],
  "automation": [
    "需求摘要",
    "KPI 缺漏檢查",
    "預算比例提醒",
    "企劃書章節草稿"
  ],
  "governance": [
    "不捏造統計",
    "標示資料來源",
    "個案資料去識別",
    "人工定稿"
  ],
  "events": [
    "新增高齡者服務企劃",
    "AI 補齊活動流程草稿",
    "預算檢查發現人力費偏低"
  ]
};

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
const state = {
  activeTab: 0,
  events: [...project.events],
  records: project.records.map((record) => ({ ...record })),
  metricBoost: 0,
  advisorText: ""
};

function pill(text, type = "ai") {
  return `<span class="pill ${type}">${text}</span>`;
}

function statusType(status) {
  if (/完成|穩定|正常|活躍|已確認|可輸出|已排程/.test(status)) return "good";
  if (/待|需|修訂|接近|處理中|進行中|分析中|審核中/.test(status)) return "warn";
  return "ai";
}

function toast(message) {
  const box = qs("#toast");
  box.textContent = message;
  box.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => box.classList.remove("show"), 2400);
}

function addEvent(message) {
  state.events.unshift(message);
  state.events = state.events.slice(0, 8);
}

function renderChrome() {
  qs("#nav").innerHTML = project.tabs.map((tab, index) => `
    <button class="${index === state.activeTab ? "active" : ""}" data-tab="${index}">${tab}</button>
  `).join("");
  qsa("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = Number(button.dataset.tab);
      render();
    });
  });
  qs("#viewTitle").textContent = project.tabs[state.activeTab];
  qs("#statusLine").innerHTML = [
    pill("系統正常", "good"),
    pill("免登入全權限", "ai"),
    pill(`事件 ${state.events.length}`, "warn")
  ].join("");
}

function metricGrid() {
  return `<div class="metric-grid">${project.metrics.map((metric, index) => {
    const value = index === 0 && state.metricBoost ? String(Number.parseInt(metric.value, 10) + state.metricBoost || metric.value) : metric.value;
    return `<article class="metric"><span>${metric.label}</span><strong>${value}</strong><p class="muted">${metric.note}</p></article>`;
  }).join("")}</div>`;
}

function visualPanel() {
  return `<section class="panel"><div class="panel-head"><h2>系統視覺模型</h2><span>${project.source}</span></div><canvas id="visualCanvas" class="visual" width="980" height="420"></canvas></section>`;
}

function cards(items) {
  return `<div class="cards">${items.map((item) => `
    <article class="card">
      <div class="record-head"><strong>${item.title}</strong>${pill(item.tag || "模組", "ai")}</div>
      <small>${item.text}</small>
    </article>
  `).join("")}</div>`;
}

function eventList() {
  return `<div class="events">${state.events.map((event, index) => `
    <article class="record"><div class="record-head"><strong>${index + 1}. ${event}</strong>${pill(index === 0 ? "最新" : "紀錄", index === 0 ? "warn" : "ai")}</div><small>模擬營運紀錄，供公開展示使用。</small></article>
  `).join("")}</div>`;
}

function overview() {
  return `
    <section class="view">
      ${metricGrid()}
      <div class="grid two">
        ${visualPanel()}
        <section class="panel"><div class="panel-head"><h2>專業化模組</h2><span>從學生構想到正式產品流程</span></div>${cards(project.panels)}</section>
      </div>
      <div class="grid two">
        <section class="panel"><div class="panel-head"><h2>核心洞察</h2><span>設計判斷</span></div>${insightList(project.insights)}</section>
        <section class="panel"><div class="panel-head"><h2>近期事件</h2><span>操作留痕</span></div>${eventList()}</section>
      </div>
    </section>
  `;
}

function workflow() {
  return `
    <section class="view">
      <div class="grid two">
        <section class="panel">
          <div class="panel-head"><h2>主要流程</h2><span>可執行工作流</span></div>
          <div class="timeline">${project.workflow.map((step, index) => `<div class="step"><span>${index + 1}</span><div><strong>${step}</strong><p class="muted">已整理成公開展示版的互動流程。</p></div></div>`).join("")}</div>
        </section>
        <section class="panel">
          <div class="panel-head"><h2>${project.form.title}</h2><span>模擬建立流程</span></div>
          <form id="mainForm">${project.form.fields.map(fieldTemplate).join("")}<button type="submit">${project.form.button}</button></form>
        </section>
      </div>
      <section class="panel"><div class="panel-head"><h2>流程狀態</h2><span>建立後會寫入事件紀錄</span></div>${eventList()}</section>
    </section>
  `;
}

function fieldTemplate(field) {
  if (field.type === "select") {
    return `<label>${field.label}<select name="${field.name}">${field.options.map((option) => `<option ${option === field.value ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
  }
  return `<label>${field.label}<input name="${field.name}" value="${field.value}"></label>`;
}

function records() {
  return `
    <section class="view">
      <div class="grid two">
        <section class="panel"><div class="panel-head"><h2>${project.recordsTitle}</h2><span>業務資料</span></div><div class="records">${state.records.map(recordTemplate).join("")}</div></section>
        <section class="panel"><div class="panel-head"><h2>分析摘要</h2><span>資料驅動決策</span></div>${insightList(project.insights)}<div class="actions"><button data-action="analyze">重新分析</button><button data-action="approve">核准第一筆待辦</button></div></section>
      </div>
      ${visualPanel()}
    </section>
  `;
}

function recordTemplate(record, index) {
  return `
    <article class="record">
      <div class="record-head"><div><strong>${record.title}</strong><small>${record.meta}</small></div>${pill(record.status, statusType(record.status))}</div>
      <div class="bar" style="--bar:var(--accent2);--value:${Math.max(28, 92 - index * 21)}%"><span></span></div>
    </article>
  `;
}

function automation() {
  return `
    <section class="view">
      <div class="grid two">
        <section class="panel"><div class="panel-head"><h2>AI / 自動化能力</h2><span>展示版模擬運算</span></div><div class="grid two">${project.automation.map((item, index) => `<article class="card"><strong>${item}</strong><small>狀態：${index % 2 ? "待人工確認" : "已產生建議"}</small></article>`).join("")}</div></section>
        <section class="panel">
          <div class="panel-head"><h2>智慧建議</h2><span>依目前資料產生</span></div>
          <textarea id="advisorInput" rows="5">請根據目前系統狀態提出下一步優化建議。</textarea>
          <div class="actions"><button data-advisor="risk">風險</button><button data-advisor="next">下一步</button><button data-advisor="report">報告摘要</button></div>
          <div id="advisorResult" class="card"><strong>建議摘要</strong><small>${state.advisorText || project.insights[0]}</small></div>
        </section>
      </div>
      <section class="panel"><div class="panel-head"><h2>治理原則</h2><span>公開展示版保護界線</span></div><div class="grid three">${project.governance.map((item) => `<article class="card"><strong>${item}</strong><small>正式系統需保留設定、稽核與人工確認流程。</small></article>`).join("")}</div></section>
    </section>
  `;
}

function governance() {
  return `
    <section class="view">
      <div class="grid two">
        <section class="panel"><div class="panel-head"><h2>治理與稽核</h2><span>可公開展示，不含真實個資</span></div><div class="grid two">${project.governance.map((item) => `<article class="card"><strong>${item}</strong><small>此項已納入公開展示版設計界線。</small></article>`).join("")}</div></section>
        <section class="panel"><div class="panel-head"><h2>事件紀錄</h2><button class="download" id="downloadBtn">下載摘要</button></div>${eventList()}</section>
      </div>
      <section class="panel"><div class="panel-head"><h2>部署準備</h2><span>GitHub Pages</span></div><div class="grid three"><article class="card"><strong>純靜態</strong><small>無後端、資料庫、API key 或真實服務連線。</small></article><article class="card"><strong>免登入</strong><small>管理端、使用端與展示端能力合併開放。</small></article><article class="card"><strong>可部署</strong><small>推送到 main branch 後可設定 Pages / root。</small></article></div></section>
    </section>
  `;
}

function insightList(items) {
  return `<div class="insights">${items.map((item) => `<article class="record"><strong>${item}</strong><small>依學生文件延伸出的產品化判斷。</small></article>`).join("")}</div>`;
}

function render() {
  renderChrome();
  const views = [overview, workflow, records, automation, governance];
  qs("#app").innerHTML = views[state.activeTab]();
  bindCurrentView();
  drawVisual();
}

function bindCurrentView() {
  const form = qs("#mainForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const first = project.form.fields[0];
      const value = new FormData(form).get(first.name);
      state.metricBoost += 1;
      addEvent(`${project.form.button}：${value}`);
      toast("工作已建立並寫入事件紀錄。");
      render();
    });
  }
  qsa("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.action === "approve") {
        const target = state.records.find((record) => /待|需|修訂|處理|審核/.test(record.status));
        if (target) target.status = "已確認";
        addEvent("人工審核已更新第一筆待辦資料");
      } else {
        addEvent("資料已重新分析並更新洞察摘要");
      }
      toast("狀態已更新。");
      render();
    });
  });
  qsa("[data-advisor]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.advisor;
      const options = {
        risk: project.insights[1] || project.insights[0],
        next: `建議優先完成「${project.workflow[1]}」與「${project.workflow[2]}」，並保留人工確認節點。`,
        report: `${project.shortName} 目前已具備 ${project.panels.map((p) => p.title).join("、")} 等核心能力。`
      };
      state.advisorText = options[mode];
      addEvent(`AI 顧問產生「${button.textContent}」建議`);
      toast("AI 顧問已產生建議。");
      render();
    });
  });
  const download = qs("#downloadBtn");
  if (download) {
    download.addEventListener("click", () => {
      const content = [project.title, "", "近期事件:", ...state.events.map((event) => "- " + event)].join("\n");
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = project.slug + "-summary.txt";
      a.click();
      URL.revokeObjectURL(url);
      toast("摘要檔已產生。");
    });
  }
}

function drawVisual() {
  const canvas = qs("#visualCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const css = getComputedStyle(document.body);
  const accent = css.getPropertyValue("--accent").trim();
  const accent2 = css.getPropertyValue("--accent2").trim();
  const accent3 = css.getPropertyValue("--accent3").trim();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  if (project.visual.mode === "game") {
    drawGame(ctx, width, height, accent, accent2, accent3);
    return;
  }
  ctx.strokeStyle = "rgba(20, 35, 55, 0.12)";
  for (let x = 0; x < width; x += 42) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += 42) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }
  const points = project.visual.nodes.map(([title, sub, x, y]) => ({ title, sub, x: width * x / 100, y: height * y / 100 }));
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(37, 99, 235, 0.25)";
  for (const [from, to] of project.visual.links) {
    ctx.beginPath();
    ctx.moveTo(points[from].x, points[from].y);
    ctx.lineTo(points[to].x, points[to].y);
    ctx.stroke();
  }
  points.forEach((point, index) => {
    ctx.fillStyle = index % 3 === 0 ? accent : index % 3 === 1 ? accent2 : accent3;
    roundRect(ctx, point.x - 88, point.y - 31, 176, 62, 10);
    ctx.fill();
    ctx.fillStyle = index % 3 === 2 ? "#101820" : "#fff";
    ctx.font = "700 20px Microsoft JhengHei, Arial";
    ctx.fillText(point.title, point.x - 68, point.y - 4);
    ctx.font = "14px Microsoft JhengHei, Arial";
    ctx.fillText(point.sub, point.x - 68, point.y + 20);
  });
}

function drawGame(ctx, width, height, accent, accent2, accent3) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#111827");
  gradient.addColorStop(1, "#2b1111");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < 9; i += 1) ctx.fillRect(70 + i * 95, 95 + (i % 3) * 28, 48, 210);
  ctx.fillStyle = accent3;
  ctx.fillRect(120, 330, 740, 10);
  ctx.fillStyle = accent2;
  ctx.fillRect(210, 240, 58, 88);
  ctx.fillStyle = accent;
  ctx.fillRect(675, 218, 74, 110);
  ctx.fillStyle = "#fff";
  ctx.font = "700 24px Microsoft JhengHei, Arial";
  ctx.fillText("玩家：格擋準備", 170, 70);
  ctx.fillText("敵人 AI：追擊", 610, 70);
  meter(ctx, 170, 90, 260, "HP", 82, accent);
  meter(ctx, 610, 90, 260, "Stamina", 64, accent3);
}

function meter(ctx, x, y, w, label, value, color) {
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.fillRect(x, y, w, 12);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w * value / 100, 12);
  ctx.fillStyle = "#fff";
  ctx.font = "14px Microsoft JhengHei, Arial";
  ctx.fillText(`${label} ${value}%`, x, y + 34);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

render();
