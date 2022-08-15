import { createRoot } from "react-dom/client";
import Layout from "./Layout";
import "./index.css";
import { lazy } from "react";

const NotFoundPage = lazy(() => import("./pages/NotFound"));

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Layout>
    <NotFoundPage />
  </Layout>
);
