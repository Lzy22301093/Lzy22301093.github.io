(() => {
  const activate = (items, panels, key, value) => {
    items.forEach((item) => item.classList.toggle("active", item.dataset[key] === value));
    panels.forEach((panel) => panel.classList.toggle("active", panel.dataset[`${key}Panel`] === value));
  };

  const moduleTabs = [...document.querySelectorAll(".module-tab")];
  const modulePanels = [...document.querySelectorAll(".module-panel")];
  moduleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const value = tab.dataset.module;
      moduleTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });
      modulePanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === value));
    });
  });

  document.querySelectorAll(".rail-items a").forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").slice(1);
      const panel = document.getElementById(id);
      const module = panel?.dataset.panel;
      const tab = document.querySelector(`.module-tab[data-module="${module}"]`);
      if (tab && !tab.classList.contains("active")) tab.click();
    });
  });

  const resultTabs = [...document.querySelectorAll(".result-tab")];
  const resultPanels = [...document.querySelectorAll(".result-content")];
  resultTabs.forEach((tab) => tab.addEventListener("click", () => activate(resultTabs, resultPanels, "result", tab.dataset.result)));

  const interviewSteps = [...document.querySelectorAll(".interview-step")];
  const interviewPanels = [...document.querySelectorAll(".interview-content")];
  interviewSteps.forEach((step) => step.addEventListener("click", () => activate(interviewSteps, interviewPanels, "interviewStep", step.dataset.interviewStep)));

  document.querySelectorAll(".filter-chips button, .segmented button").forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.parentElement;
      parent.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  const toast = document.querySelector(".toast");
  let toastTimer;
  document.querySelectorAll(".demo-action").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      clearTimeout(toastTimer);
      toast.classList.add("show");
      toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
    });
  });

  const startDemo = document.querySelector(".start-demo");
  startDemo?.addEventListener("click", () => {
    interviewSteps[1].click();
    document.querySelector(".module-stage")?.scrollIntoView({ behavior: "smooth", block: "start" });
    toast.querySelector("span").textContent = "已切换到演示面试界面；真实语音面试需要运行完整项目";
    clearTimeout(toastTimer);
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3400);
  });

  if (window.lucide) window.lucide.createIcons();
})();
