const content = window.siteContent;

function renderOpeningText() {
  document.getElementById("hero-opening").innerHTML = `
    <p class="hero__opening-title">Convite aos alunos</p>
    <p class="hero__opening-text">${content.openingText}</p>
  `;
}

function renderHeroStats() {
  document.getElementById("hero-stats").innerHTML = content.heroStats
    .map(
      (item, index) => `
        <article class="stat-card reveal" style="--delay:${index * 90}ms">
          <p class="stat-card__value">${item.value}</p>
          <p class="stat-card__label">${item.label}</p>
          <p class="stat-card__detail">${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderWorkshops() {
  document.getElementById("workshops-grid").innerHTML = content.workshops
    .map(
      (workshop, index) => `
        <article class="panel reveal" style="--delay:${(index % 2) * 90}ms">
          <div class="panel__top">
            <span class="panel__index">${String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 class="panel__title">${workshop.title}</h3>
              <p class="panel__meta">${workshop.date} | 18:30 as 21:10</p>
            </div>
          </div>
          <div class="panel__content">
            <p class="panel__list-title">${workshop.track}</p>
            <p>${workshop.delivery}</p>
            <ul class="panel__list">
              ${workshop.topics.map((topic) => `<li>${topic}</li>`).join("")}
            </ul>
          </div>
        </article>
      `
    )
    .join("");
}

function renderTimeline() {
  document.getElementById("timeline-grid").innerHTML = content.workshops
    .map(
      (workshop, index) => `
        <article class="timeline-card reveal" style="--delay:${index * 80}ms">
          <span class="timeline-card__step">Oficina ${index + 1}</span>
          <p class="timeline-card__title">${workshop.track}</p>
          <h3 class="timeline-card__date">${workshop.date}</h3>
          <p class="timeline-card__detail">Das 18:30 as 21:10</p>
        </article>
      `
    )
    .join("");
}

function renderParticipation() {
  document.getElementById("participation-grid").innerHTML = content.participation
    .map(
      (item, index) => `
        <article class="metric-card reveal" style="--delay:${index * 80}ms">
          <p class="metric-card__label">${item.label}</p>
          <h3 class="metric-card__value">${item.value}</h3>
          <p class="metric-card__detail">${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function applyApplicationLinks() {
  document.querySelectorAll("[data-application-link]").forEach((link) => {
    link.setAttribute("href", content.applicationUrl);
  });
}

function bindMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Abrir menu" : "Fechar menu");
    nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
      document.body.classList.remove("menu-open");
    });
  });
}

function updateHeaderOffset() {
  const header = document.querySelector(".site-header");
  document.documentElement.style.setProperty("--header-offset", `${header.offsetHeight + 28}px`);
}

function enableReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function init() {
  renderOpeningText();
  renderHeroStats();
  renderWorkshops();
  renderTimeline();
  renderParticipation();
  applyApplicationLinks();
  bindMenu();
  updateHeaderOffset();
  enableReveal();
}

window.addEventListener("resize", updateHeaderOffset);
window.addEventListener("DOMContentLoaded", init);
