function startProgressBar(onComplete) {
  const progressBars = document.getElementsByClassName("progress-bar");
  if (!progressBars.length) {
    return;
  }

  const progressBar = progressBars[0];

  let counter = 0;
  const timer = setInterval(() => {
    counter++;

    if (counter > 5) {
      clearInterval(timer);
      onComplete();

      return;
    }

    progressBar.style.width = 20 * counter + "%";
  }, 1000);
}

export { startProgressBar };
