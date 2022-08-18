import "./main.css";

import { init as initSentry } from "./sentry";
import { fadeInPortraitImage } from "./portrait";
import { fadeInText } from "./text";
import { startProgressBar } from "./progress-bar";

initSentry();
fadeInPortraitImage();
fadeInText();
startProgressBar(() => (window.location.href = "/"));
