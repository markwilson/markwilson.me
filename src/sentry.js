import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://1028473895cf4a1b9979b6a00f0b2052@o1356489.ingest.sentry.io/6660188",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

export { init };
