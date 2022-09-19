const FADE_IN_DELAY = 1000;

const fontsFeaturesAvailable = () =>
  "fonts" in document && "check" in document.fonts && "ready" in document.fonts;

function fadeInFontForQuerySelector(fontName, querySelector) {
  if (document.fonts.check(fontName)) {
    return;
  }

  const elements = document.querySelectorAll(querySelector);
  for (const element of elements) {
    element.style.opacity = 0;
  }

  document.fonts.ready.then(() => {
    setTimeout(() => {
      for (const element of elements) {
        element.style.transition = "opacity 0.5s ease-in-out";
        element.style.opacity = 1;
      }
    }, FADE_IN_DELAY);
  });
}

function fadeInText() {
  if (!fontsFeaturesAvailable()) {
    return;
  }

  fadeInFontForQuerySelector("1rem Eczar", "h1, h2, h3");
  fadeInFontForQuerySelector("1rem Ropa Sans", "p, dt, dd");
}

export { fadeInText };
