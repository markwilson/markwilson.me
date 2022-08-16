import { createRoot } from "react-dom/client";
import PageNotFound from "./PageNotFound";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<PageNotFound />);
