import "./PageNotFound.css";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const PageNotFound = () => {
  const [redirectProgress, setRedirectProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (redirectProgress >= 100) {
        clearInterval(timer);
        window.location.href = "/";
        return;
      }

      setRedirectProgress(redirectProgress + 20);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="page">
      <h1>Page not found</h1>

      <p>Redirecting to markwilson.me</p>

      <ProgressBar
        value={redirectProgress}
        style={{ marginBottom: "var(--stack-spacing)" }}
      />

      <p>
        <a href="/">Go to markwilson.me</a>
      </p>
    </div>
  );
};

export default PageNotFound;
