import { useEffect, useState } from "react";

export type Route = "home" | "projects" | "privacy" | "notfound";

const routePaths: Record<Route, string> = {
  home: "#/",
  projects: "#/projects",
  privacy: "#/privacy",
  notfound: "#/404",
};

let pendingAnchor: string | null = null;

export function routeToPath(route: Route) {
  return routePaths[route];
}

function parseRoute(): Route {
  const rawHash = window.location.hash;
  const hash = rawHash.replace(/^#\/?/, "").split("?")[0];
  const path = window.location.pathname.toLowerCase();

  // Hash routing wins: it lets visitors move away from /projects.html
  // even when the physical entry path stays the same.
  if (rawHash && rawHash !== "#") {
    if (!hash) return "home";
    if (hash.startsWith("projects")) return "projects";
    if (hash.startsWith("privacy")) return "privacy";
    if (hash.startsWith("404") || hash.startsWith("not-found")) return "notfound";
    if (hash === "en" || hash === "fr" || hash === "ar") return "home";
    return "notfound";
  }

  const cleanPath = path.replace(/\/+$/, "");
  if (
    cleanPath === "" ||
    cleanPath === "/index.html" ||
    cleanPath === "/index.php" ||
    cleanPath === "/default.php" ||
    cleanPath === "/ar" ||
    cleanPath === "/en" ||
    cleanPath === "/fr"
  ) {
    return "home";
  }
  if (cleanPath.endsWith("/privacy.html") || cleanPath.endsWith("privacy.html") || cleanPath === "/privacy") {
    return "privacy";
  }
  if (cleanPath.endsWith("/projects.html") || cleanPath.endsWith("projects.html") || cleanPath === "/projects") {
    return "projects";
  }

  return "notfound";
}

function scrollToPending() {
  if (!pendingAnchor) return;
  window.requestAnimationFrame(() => {
    if (!pendingAnchor) return;
    const el = document.getElementById(pendingAnchor);
    pendingAnchor = null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });
}

export function navigateToProjects(sector?: string) {
  window.location.hash = sector ? `#/projects?sector=${encodeURIComponent(sector)}` : "#/projects";
}

export function readSectorFromHash(): string | null {
  const query = window.location.hash.split("?")[1];
  if (!query) return null;
  return new URLSearchParams(query).get("sector");
}

export function navigateTo(route: Route, anchor?: string) {
  const currentHash = window.location.hash;
  const target = routePaths[route];
  const onTargetRoute = currentRoute === route;

  if (route === "home" && anchor) {
    if (onTargetRoute && currentHash === target) {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (onTargetRoute && (currentHash === "" || currentHash === "#")) {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    pendingAnchor = anchor;
    window.location.hash = target;
    return;
  }

  if (currentHash === target) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  window.location.hash = target;
}

let currentRoute: Route = "home";

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => {
    try {
      return parseRoute();
    } catch {
      return "home";
    }
  });

  currentRoute = route;

  useEffect(() => {
    const onChange = () => {
      const next = parseRoute();
      const changed = next !== currentRoute;
      currentRoute = next;
      setRoute(next);
      if (pendingAnchor) {
        scrollToPending();
        return;
      }
      // Only return to the top when the page actually changes; ignoring
      // duplicate hashchange/popstate events protects anchor scrolling.
      if (changed) {
        window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
      }
    };
    window.addEventListener("hashchange", onChange);
    window.addEventListener("popstate", onChange);
    return () => {
      window.removeEventListener("hashchange", onChange);
      window.removeEventListener("popstate", onChange);
    };
  }, []);

  return route;
}
