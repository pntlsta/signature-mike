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