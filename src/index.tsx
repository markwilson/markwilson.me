import "./loader.css";

const root = document.getElementById("root") as HTMLDivElement;
setTimeout(() => {
  if (root.childElementCount === 0) {
    root.innerHTML = '<p id="loader">Loading &hellip;</p>';
  }
}, 1500);

// document.fonts isn't fully supported yet
declare global {
  interface Document {
    fonts: FontFaceSet;
  }
}

declare global {
  interface FontFaceSet {
    load: (arg0:string) => Promise<any>;
  }
}

import(/* webpackChunkName: "bootstrap" */ "./bootstrap").then((module) => {
  const bootstrap = module.default;

  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load("400 2rem Roboto"),
      document.fonts.load("300 1.6rem Roboto"),
    ]).then(() => {
      bootstrap();
    });
  } else {
    bootstrap();
  }
});

export default null;
