import "./loader.css";

const root = document.getElementById("root") as HTMLDivElement;
setTimeout(() => {
  if (root.childElementCount === 0) {
    root.innerHTML = "<p id=\"loader\">Loading &hellip;</p>";
  }
}, 1500);

import(/* webpackChunkName: "main" */ "./index").then((module) => {
  const bootstrap = module.default;
  bootstrap();
});

export default null;
