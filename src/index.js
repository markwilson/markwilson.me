import "./main.css";

import { init as initSentry } from "./sentry";
import { fadeInPortraitImage } from "./portrait";
import { fadeInHeadings } from "./headings";
import { startProgressBar } from "./progress-bar";

// initSentry();
fadeInPortraitImage();
fadeInHeadings();
startProgressBar(() => (window.location.href = "/"));
