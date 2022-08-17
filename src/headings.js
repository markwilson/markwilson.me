function fadeInHeadings() {
  if (!"fonts" in document || document.fonts.check("3rem Eczar")) {
    return;
  }

  for (const element of document.querySelectorAll("h1, h2")) {
    element.style.opacity = 0;
  }

  document.fonts.ready.then(() => {
    setTimeout(() => {
      for (const element of document.querySelectorAll("h1, h2")) {
        element.style.transition = "opacity 0.5s ease-in-out";
        element.style.opacity = 1;
      }
    }, 1000);
  });
}

export { fadeInHeadings };
