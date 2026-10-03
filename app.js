document.addEventListener("DOMContentLoaded", () => {
  const refreshIcons = () => window.lucide && window.lucide.createIcons();

  const toast = document.getElementById("toast");
  let toastTimer = null;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  };

  refreshIcons();

  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".nav");
  menuButton?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(Boolean(open)));
  });
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  const modal = document.getElementById("demo-info-modal");
  const openModal = () => {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__close")?.focus();
  };
  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
  };
  document.querySelectorAll(".demo-info-button").forEach((button) => button.addEventListener("click", openModal));
  modal?.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  const demoTabs = document.querySelectorAll("[data-demo-tab]");
  const demoPanels = document.querySelectorAll("[data-demo-panel]");
  const activateDemo = (name) => {
    demoTabs.forEach((tab) => {
      const active = tab.dataset.demoTab === name;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    demoPanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.demoPanel === name));
    refreshIcons();
  };
  demoTabs.forEach((tab) => tab.addEventListener("click", () => activateDemo(tab.dataset.demoTab)));
  document.querySelectorAll("[data-next-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activateDemo(button.dataset.nextTab);
      document.querySelector(".demo-shell")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("已切换到定向简历演示");
    });
  });

  const sourceDetails = {
    resume: {
      title: "简历_林知远.pdf",
      quote: "“负责企业知识库问答产品的检索与生成链路，将 Top-5 命中率从 71% 提升至 84%。”",
      locator: "定位：工作经历 / 云杉智能 / 成果第 1 条"
    },
    project: {
      title: "项目复盘_知识库.md",
      quote: "“上线混合检索与重排后，Top-5 命中率提升 13 个百分点，答案引用准确率达到 84%。”",
      locator: "定位：结果与复盘 / 第 4 段"
    },
    interview: {
      title: "模拟面试复盘.docx",
      quote: "“回答技术结构完整，指标意识较好；需要进一步量化稳定性、成本和人工接管率。”",
      locator: "定位：综合评价 / 改进建议"
    },
    portfolio: {
      title: "作品说明_架构篇.md",
      quote: "“任务拆为可观察节点后，失败任务可从检查点恢复，平均处理时长由 8.4 分钟降至 3.1 分钟。”",
      locator: "定位：Agent 编排设计 / 可恢复性"
    }
  };
  const sourceDetail = document.getElementById("source-detail");
  document.querySelectorAll(".source-item").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".source-item").forEach((candidate) => candidate.classList.remove("is-active"));
      item.classList.add("is-active");
      const detail = sourceDetails[item.dataset.source];
      if (!detail || !sourceDetail) return;
      sourceDetail.innerHTML = `
        <div class="source-detail__label">当前证据</div>
        <strong>${detail.title}</strong>
        <p>${detail.quote}</p>
        <span>${detail.locator}</span>
      `;
    });
  });

  document.querySelectorAll(".evidence-item").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".evidence-item").forEach((candidate) => candidate.classList.remove("is-selected"));
      item.classList.add("is-selected");
      showToast("已定位该画像条目的证据来源");
    });
  });

  const updateProposalState = (accepted) => {
    const card = document.querySelector(".proposal-card");
    const count = document.querySelector(".proposal-count");
    if (card) {
      card.style.opacity = "0.62";
      card.querySelectorAll("button").forEach((button) => button.disabled = true);
      const banner = document.createElement("div");
      banner.className = "principle-box";
      banner.innerHTML = accepted
        ? '<i data-lucide="circle-check-big"></i><div><strong>提案已确认</strong><p>已模拟写入个人画像，并同步到简历生成上下文。</p></div>'
        : '<i data-lucide="circle-x"></i><div><strong>提案已拒绝</strong><p>原画像保持不变，本次拒绝已记录在演示状态中。</p></div>';
      card.appendChild(banner);
    }
    if (count) {
      count.textContent = accepted ? "已确认" : "已拒绝";
      count.className = accepted ? "tag tag--green proposal-count" : "tag tag--coral proposal-count";
    }
    showToast(accepted ? "演示：画像提案已确认写入" : "演示：提案已拒绝，原画像未改变");
    refreshIcons();
  };
  document.querySelector(".proposal-accept")?.addEventListener("click", () => updateProposalState(true));
  document.querySelector(".proposal-reject")?.addEventListener("click", () => updateProposalState(false));

  document.querySelectorAll(".suggestion-apply").forEach((button) => {
    button.addEventListener("click", () => {
      button.disabled = true;
      button.classList.remove("button--secondary");
      button.classList.add("button--primary");
      button.innerHTML = '<i data-lucide="check-check"></i>已应用';
      showToast("已模拟采纳建议，生成简历 v4");
      refreshIcons();
    });
  });
  document.querySelector(".resume-generate")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.innerHTML = '<i data-lucide="loader-circle"></i>生成中';
    refreshIcons();
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = '<i data-lucide="wand-sparkles"></i>重新生成';
      refreshIcons();
      showToast("演示：已基于画像 v12 生成简历 v4");
    }, 850);
  });

  const animateNumber = (element, target) => {
    let value = 0;
    const tick = () => {
      value = Math.min(target, value + 2);
      element.textContent = String(value);
      if (value < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  document.querySelector(".match-analyze")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const score = document.querySelector(".score-ring strong");
    button.disabled = true;
    button.innerHTML = '<i data-lucide="loader-circle"></i>分析中';
    if (score) score.textContent = "0";
    refreshIcons();
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = '<i data-lucide="scan-search"></i>重新分析';
      if (score) animateNumber(score, 86);
      refreshIcons();
      showToast("演示：JD 与个人画像匹配分析完成");
    }, 760);
  });

  const interviewQuestions = [
    {
      question: "你的知识库项目里如何判断 RAG 的检索质量？除了最终答案准确率，还会关注哪些指标？",
      followup: "请结合具体项目说明指标定义、采集方式和优化动作。",
      answer: "我会把检索质量与生成质量拆开评估。检索侧关注 Top-K 命中率、召回覆盖率和 MRR；生成侧关注引用准确率、事实一致性与拒答合理性。项目中我们使用人工标注测试集做离线回归，再采集线上点击与追问率做近似反馈。"
    },
    {
      question: "当 Agent 工作流中的工具调用超时变多时，你会如何定位问题并控制用户等待时间？",
      followup: "请说明监控指标、降级策略和与前端流式体验的配合。",
      answer: "我会先拆分排队、模型、工具与网络耗时，按工具维度观察 P50、P95、超时率和重试率。用户侧采用流式进度和阶段性结果，系统侧对非关键工具降级，对可重试错误做有限退避重试，并保留检查点，避免整条任务重跑。"
    },
    {
      question: "为什么把 AI 写回个人画像设计成提案，而不是直接更新？请从产品和工程风险两方面回答。",
      followup: "可以结合用户确认、证据链与版本回滚展开。",
      answer: "产品上，用户拥有事实写入权，避免模型误判污染长期画像；工程上，提案模式允许 schema 校验、证据关联和差异预览。确认后才写入并生成新版本，拒绝则保持原值，出现问题也可以回滚到此前版本。"
    }
  ];
  let interviewIndex = 0;
  const interviewQuestion = document.getElementById("interview-question");
  const interviewFollowup = document.getElementById("interview-followup");
  const interviewAnswer = document.getElementById("interview-answer");
  const interviewCounter = document.getElementById("interview-index");
  const interviewProgress = document.getElementById("interview-progress-bar");
  const renderInterview = () => {
    const item = interviewQuestions[interviewIndex];
    if (interviewQuestion) interviewQuestion.textContent = item.question;
    if (interviewFollowup) interviewFollowup.textContent = item.followup;
    if (interviewAnswer) interviewAnswer.textContent = item.answer;
    if (interviewCounter) interviewCounter.textContent = String(interviewIndex + 1);
    if (interviewProgress) interviewProgress.style.width = `${((interviewIndex + 1) / interviewQuestions.length) * 100}%`;
    document.querySelector(".interview-next").innerHTML = interviewIndex === interviewQuestions.length - 1
      ? '查看面试报告<i data-lucide="file-check-2"></i>'
      : '下一题<i data-lucide="arrow-right"></i>';
    refreshIcons();
  };
  document.querySelector(".interview-next")?.addEventListener("click", () => {
    if (interviewIndex === interviewQuestions.length - 1) {
      showToast("演示：面试报告已生成，准备度 82 分");
      interviewIndex = 0;
    } else {
      interviewIndex += 1;
    }
    renderInterview();
  });
  document.querySelector(".interview-start")?.addEventListener("click", (event) => {
    interviewIndex = 0;
    renderInterview();
    event.currentTarget.innerHTML = '<i data-lucide="mic-2"></i>演示进行中';
    refreshIcons();
    showToast("演示：模拟语音面试已开始");
    setTimeout(() => {
      event.currentTarget.innerHTML = '<i data-lucide="play"></i>开始演示';
      refreshIcons();
    }, 1800);
  });
  document.querySelector(".interview-accept")?.addEventListener("click", (event) => {
    event.currentTarget.textContent = "已确认";
    event.currentTarget.disabled = true;
    showToast("演示：面试反馈已作为画像提案确认");
  });

  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.querySelector(".chat-input input");
  const promptReplies = {
    "把差距转成 5 道面试追问": "可以。建议围绕“大规模文档索引如何设计”“检索命中率下降怎么排查”“模型分层的决策阈值”“长耗时工具的降级策略”“跨团队灰度上线如何控风险”准备，并用 STAR 结构补充结果。",
    "帮我改写知识库项目第一条": "改写建议：负责企业知识库检索与生成链路，设计关键词、向量与重排融合方案，将 Top-5 命中率由 71% 提升至 84%，并以引用准确率与人工抽检持续验证答案可信度。",
    "生成一页求职信": "求职信草稿会突出你的 Agent、RAG 与评测能力，以“从指标发现问题到工程优化取得结果”为主线，并明确表达对目标岗位稳定性与成本责任的匹配。"
  };
  const appendMessage = (type, content) => {
    if (!chatMessages) return;
    const wrapper = document.createElement("div");
    wrapper.className = `message message--${type}`;
    wrapper.innerHTML = type === "user"
      ? `<div class="message-bubble">${content}</div><div class="avatar avatar--small">林</div>`
      : `<div class="avatar avatar--small avatar--assistant"><i data-lucide="sparkles"></i></div><div class="message-bubble"><p>${content}</p></div>`;
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    refreshIcons();
  };
  const sendPrompt = (prompt) => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;
    appendMessage("user", cleanPrompt);
    if (chatInput) chatInput.value = "";
    setTimeout(() => {
      appendMessage("assistant", promptReplies[cleanPrompt] || "这是静态演示中的预设回复。真实产品会基于个人画像、目标简历与 JD 的相关上下文生成可追溯结果。");
    }, 320);
  };
  document.querySelectorAll("[data-prompt]").forEach((button) => button.addEventListener("click", () => sendPrompt(button.dataset.prompt)));
  document.querySelector(".send-button")?.addEventListener("click", () => sendPrompt(chatInput?.value || ""));
  chatInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendPrompt(chatInput.value);
  });

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav a");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.style.color = link.getAttribute("href") === `#${entry.target.id}` ? "var(--green-dark)" : "";
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => observer.observe(section));
});
