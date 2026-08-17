document.documentElement.classList.add("js");

const stages = {
  discover: {
    kicker: "DISCOVER & APPLY",
    title: "Start with the household, then guide the next step.",
    description: "A mobile-ready experience helps people explore potential programs, create a household profile and submit a guided application with contextual help.",
    points: ["Benefits discovery and pre-screening", "Adaptive, multi-program application", "Accessibility and language support"],
    label: "Application workspace",
    step: "STEP 2 OF 5",
    question: "Tell us about the people in your household",
    helper: "We will reuse this information when a program asks the same question.",
    note: "4 answers carried forward"
  },
  verify: {
    kicker: "VERIFY",
    title: "Gather evidence once and make its status visible.",
    description: "Digital documents and authorized data sources can be evaluated through a shared verification service, with exceptions routed for worker review.",
    points: ["Evidence request and receipt tracking", "Data-match orchestration", "Human-directed document review"],
    label: "Verification workspace",
    step: "EVIDENCE REVIEW",
    question: "Income verification match received",
    helper: "Source, response date and validation details remain attached to the item.",
    note: "No resident follow-up needed"
  },
  determine: {
    kicker: "DETERMINE",
    title: "Apply policy through traceable, versioned rules.",
    description: "Program logic evaluates household circumstances and records the factors used for eligibility and benefit calculations.",
    points: ["Program-specific rules and budgets", "Decision factor traceability", "Exception and supervisory review"],
    label: "Determination workspace",
    step: "RULE EVALUATION",
    question: "Eligibility factors are ready for review",
    helper: "Each result links to the policy version and supporting household data.",
    note: "Decision record assembled"
  },
  deliver: {
    kicker: "DELIVER",
    title: "Explain the decision and coordinate the handoff.",
    description: "Decision records, notices and downstream exchanges move together so households and program partners receive consistent information.",
    points: ["Plain-language notice assembly", "Enrollment or issuance exchange", "Channel and delivery tracking"],
    label: "Decision workspace",
    step: "DECISION READY",
    question: "Review the household notice package",
    helper: "Program decisions and effective dates are prepared for delivery.",
    note: "3 downstream events queued"
  },
  maintain: {
    kicker: "MAINTAIN",
    title: "Keep household information current across time.",
    description: "Reported changes, renewals and recertifications reuse known information while policy and verification services identify what needs attention.",
    points: ["Report-a-change workflows", "Prefilled renewal journeys", "Proactive deadline outreach"],
    label: "Renewal workspace",
    step: "RENEWAL IN PROGRESS",
    question: "Confirm what has changed since last review",
    helper: "Existing household information is shown for confirmation or update.",
    note: "11 fields prefilled"
  }
};

const lenses = {
  experience: {
    copy: "Follow digital completion, customer effort and renewal continuity to identify where people need clearer guidance.",
    measures: ["Application completion", "Evidence request frequency", "Renewal continuity", "Assisted-channel demand"]
  },
  operations: {
    copy: "Track queue age, worker touches and processing time to see where work is waiting or returning for additional review.",
    measures: ["Time to first productive action", "Median processing time", "Worker touches per case", "Queue and exception aging"]
  },
  quality: {
    copy: "Connect decision factors, verification sources and review findings to support accuracy improvement and policy stewardship.",
    measures: ["Verification reuse", "Decision correction rate", "Quality review findings", "Payment accuracy indicators"]
  }
};

const setText = (id, value) => {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
};

document.querySelectorAll(".stage-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const stage = stages[button.dataset.stage];
    if (!stage) return;
    document.querySelectorAll(".stage-tab").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    setText("stage-kicker", stage.kicker);
    setText("stage-title", stage.title);
    setText("stage-description", stage.description);
    setText("stage-ui-label", stage.label);
    setText("stage-ui-step", stage.step);
    setText("stage-ui-question", stage.question);
    setText("stage-ui-helper", stage.helper);
    setText("stage-ui-note", stage.note);
    const list = document.getElementById("stage-points");
    if (list) list.innerHTML = stage.points.map((point) => `<li>${point}</li>`).join("");
  });
});

document.querySelectorAll(".metric-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const lens = lenses[button.dataset.lens];
    if (!lens) return;
    document.querySelectorAll(".metric-tab").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    setText("lens-copy", lens.copy);
    const measures = document.getElementById("lens-measures");
    if (measures) measures.innerHTML = lens.measures.map((measure) => `<span>${measure}</span>`).join("");
  });
});

const menuButton = document.querySelector(".menu-toggle");
const menu = document.getElementById("primary-nav");
if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .08, rootMargin: "0px 0px -30px" });

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
setText("year", new Date().getFullYear());
