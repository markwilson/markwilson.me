import { createRoot } from "react-dom/client";
import Layout from "./Layout";
import PageNotFound from "./PageNotFound";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Layout>
    <PageNotFound />
  </Layout>
);
