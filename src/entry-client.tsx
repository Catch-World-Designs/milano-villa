import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { stripBasePath, toBrowserPath } from "./data/routes";

const legacyPath = window.location.hash.match(/^#(\/.*)$/)?.[1];

if (legacyPath) {
  window.location.replace(toBrowserPath(legacyPath));
} else {
  const root = document.getElementById("root");
  if (!root) throw new Error("The application root element is missing.");

  const app = (
    <StrictMode>
      <App initialPath={stripBasePath(window.location.pathname)} />
    </StrictMode>
  );

  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}

