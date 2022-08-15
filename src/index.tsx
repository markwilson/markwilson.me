import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";

const Home = lazy(() => import("./pages/Home"));

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Suspense fallback={"Loading..."}>
    <Home />
  </Suspense>
);
