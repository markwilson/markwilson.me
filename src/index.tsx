import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Layout>
    <App />
  </Layout>
);
