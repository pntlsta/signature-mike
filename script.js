(() => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const btn = document.getElementById("navBtn");
  const nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      nav.classList.toggle("nav--open");
    });
  }
})();

/* =========================================
   Signature Mike Show - No Duplicate Slides
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const stacks = Array.from(document.querySelectorAll(".show-stack"));

  if (!stacks.length) return;

  const stackData = stacks.map((stack, stackIndex) => {
    const slides = Array.from(stack.querySelectorAll(".show-stack__slide"));
    const interval = parseInt(stack.dataset.interval, 10) || 3500;
    const start = parseInt(stack.dataset.start, 10) || 0;

    slides.forEach((slide) => slide.classList.remove("is-active"));

    return {
      stack,
      slides,
      interval,
      currentIndex: slides.length ? start % slides.length : 0,
      stackIndex
    };
  });

  function getSlideSrc(slide) {
    const img = slide.querySelector("img");
    return img ? img.getAttribute("src") : "";
  }

  function getActiveSources(exceptStackIndex = null) {
    const activeSources = new Set();

    stackData.forEach((data) => {
      if (data.stackIndex === exceptStackIndex) return;

      const activeSlide = data.slides[data.currentIndex];
      const src = activeSlide ? getSlideSrc(activeSlide) : "";

      if (src) {
        activeSources.add(src);
      }
    });

    return activeSources;
  }

  function showSlide(data, nextIndex) {
    if (!data.slides.length) return;

    data.slides[data.currentIndex].classList.remove("is-active");
    data.currentIndex = nextIndex;
    data.slides[data.currentIndex].classList.add("is-active");
  }

  function findNextAvailableSlide(data) {
    const activeSources = getActiveSources(data.stackIndex);
    const totalSlides = data.slides.length;

    for (let step = 1; step <= totalSlides; step++) {
      const candidateIndex = (data.currentIndex + step) % totalSlides;
      const candidateSlide = data.slides[candidateIndex];
      const candidateSrc = getSlideSrc(candidateSlide);

      if (!activeSources.has(candidateSrc)) {
        return candidateIndex;
      }
    }

    return (data.currentIndex + 1) % totalSlides;
  }

  function initializeSlides() {
    const usedSources = new Set();

    stackData.forEach((data) => {
      if (!data.slides.length) return;

      let selectedIndex = data.currentIndex;

      for (let step = 0; step < data.slides.length; step++) {
        const candidateIndex = (data.currentIndex + step) % data.slides.length;
        const candidateSrc = getSlideSrc(data.slides[candidateIndex]);

        if (!usedSources.has(candidateSrc)) {
          selectedIndex = candidateIndex;
          usedSources.add(candidateSrc);
          break;
        }
      }

      data.currentIndex = selectedIndex;
      data.slides[data.currentIndex].classList.add("is-active");
    });
  }

  initializeSlides();

  stackData.forEach((data) => {
    if (data.slides.length <= 1) return;

    setInterval(() => {
      const nextIndex = findNextAvailableSlide(data);
      showSlide(data, nextIndex);
    }, data.interval);
  });
});

/* =========================================
   Sponsor Bar - Rotating Advertisement
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const SPONSORS = [
    {
      name: "F&M Bank",
      detail: "Community Banking · Augusta, GA",
      logo: "assets/SPONSOR_LOGOS/fnm-bank.png"
    },
    {
      name: "Taylor BMW",
      detail: "Sales & Service · Evans, GA",
      logo: "assets/SPONSOR_LOGOS/taylor-bmw.png"
    },
    {
      name: "Hardwood Floors & More",
      detail: "Flooring & Installation · Evans, GA",
      logo: "assets/SPONSOR_LOGOS/hfm.png"
    }
  ];

  const ROTATE_MS = 10000;

  if (!SPONSORS.length || document.querySelector(".sponsor-bar")) return;

  const bar = document.createElement("aside");
  bar.className = "sponsor-bar";
  bar.setAttribute("aria-label", "Signature Mike sponsors");

  const inner = document.createElement("div");
  inner.className = "container sponsor-bar__inner";

  const label = document.createElement("p");
  label.className = "sponsor-bar__label";
  label.innerHTML =
    '<span class="sponsor-bar__label-lead">Signature Mike is </span>Sponsored by';

  const track = document.createElement("div");
  track.className = "sponsor-bar__track";

  const dots = document.createElement("div");
  dots.className = "sponsor-bar__dots";

  const slides = [];
  const buttons = [];

  SPONSORS.forEach((sponsor, index) => {
    const slide = document.createElement("article");
    slide.className = "sponsor-slide";

    const logo = document.createElement("img");
    logo.className = "sponsor-slide__logo";
    logo.src = sponsor.logo;
    logo.alt = sponsor.name + " logo";

    const text = document.createElement("div");
    text.className = "sponsor-slide__text";

    const name = document.createElement("span");
    name.className = "sponsor-slide__name";
    name.textContent = sponsor.name;

    const detail = document.createElement("span");
    detail.className = "sponsor-slide__detail";
    detail.textContent = sponsor.detail;

    text.append(name, detail);
    slide.append(logo, text);
    track.append(slide);
    slides.push(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "sponsor-bar__dot";
    dot.setAttribute("aria-label", "Show " + sponsor.name);
    dot.addEventListener("click", () => goTo(index, true));
    dots.append(dot);
    buttons.push(dot);
  });

  inner.append(label, track, dots);
  bar.append(inner);
  document.body.append(bar);
  document.body.classList.add("has-sponsor-bar");

  let current = 0;
  let timer = null;

  function goTo(index, restartTimer) {
    slides[current].classList.remove("is-active");
    buttons[current].classList.remove("is-active");

    current = index;

    slides[current].classList.add("is-active");
    buttons[current].classList.add("is-active");

    if (restartTimer) startRotation();
  }

  function startRotation() {
    clearInterval(timer);
    if (slides.length <= 1) return;

    timer = setInterval(() => {
      goTo((current + 1) % slides.length, false);
    }, ROTATE_MS);
  }

  goTo(0, false);
  startRotation();

  // Pause while a visitor is reading the ad
  bar.addEventListener("mouseenter", () => clearInterval(timer));
  bar.addEventListener("mouseleave", startRotation);
});