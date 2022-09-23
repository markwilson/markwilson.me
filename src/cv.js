const initCv = () => {
  const cvButton = document.getElementById("cv-button");

  const elements = {
    home: document.getElementById("blurb"),
    cv: document.getElementById("cv"),
  };

  if (!cvButton || !elements.home || !elements.cv) {
    return;
  }

  let showingCv = false;

  const showRelevantContent = () => {
    let showElement = elements.home;
    let hideElement = elements.cv;

    let buttonText = "CV";

    if (showingCv) {
      showElement = elements.cv;
      hideElement = elements.home;

      buttonText = "Close CV";
    }

    showElement.style.display = "block";
    hideElement.style.display = "none";

    cvButton.innerHTML = buttonText;
  };

  cvButton.addEventListener("click", () => {
    showingCv = !showingCv;

    showRelevantContent();
  });

  showRelevantContent();
};

export { initCv };
