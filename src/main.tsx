import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

export const mountWidget = ({ containerId }: { containerId: string }) => {
  const container = document.getElementById(containerId)!;
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};
