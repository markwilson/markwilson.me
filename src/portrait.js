function fadeInPortraitImage() {
  const imgs = document.querySelectorAll(".portrait img");
  if (!imgs.length) {
    return;
  }

  const img = imgs[0];
  const { parentElement } = img;
  if (img.naturalWidth) {
    img.opacity = "1";
    return;
  }

  const loadingElement = document.createElement("div");
  loadingElement.style.width = "200px";
  loadingElement.style.height = "200px";
  loadingElement.style.backgroundColor = "white";
  loadingElement.style.margin = "0 auto";
  loadingElement.style.display = "inline-block";
  loadingElement.style.borderRadius = "1rem";
  loadingElement.style.boxShadow = "0 2px 4px 1px rgba(255, 255, 255, 0.25)";

  parentElement.appendChild(loadingElement);
  parentElement.removeChild(img);
  img.addEventListener("load", () => {
    img.style.opacity = "0";
    parentElement.appendChild(img);
    parentElement.removeChild(loadingElement);
    setTimeout(() => {
      img.style.transition = "opacity 0.5s ease-in-out";
      img.style.opacity = "1";
    }, 100);
  });
}

export { fadeInPortraitImage };
