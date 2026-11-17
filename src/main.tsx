import { Component, StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

class RootErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "32px",
            background: "#082a23",
            color: "#f6f1e7",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "24px" }}>مجموعة سوا المتحدة — SAWA United Group</h1>
            <p style={{ marginTop: "12px", opacity: 0.75 }}>
              حدث خطأ غير متوقع أثناء تحميل الصفحة. يرجى تحديث الصفحة.
            </p>
            <a
              href="/"
              style={{
                display: "inline-block",
                marginTop: "18px",
                padding: "10px 22px",
                borderRadius: "999px",
                background: "#d8a06a",
                color: "#181310",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              إعادة التحميل / Reload
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function mount() {
  const container = document.getElementById("root");
  if (!container) return;
  createRoot(container).render(
    <StrictMode>
      <RootErrorBoundary>
        <App />
      </RootErrorBoundary>
    </StrictMode>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount, { once: true });
} else {
  mount();
}
