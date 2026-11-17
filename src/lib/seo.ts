import { useEffect } from "react";

const SITE_URL = "https://sawa-united.net";

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.rel = rel;
    document.head.appendChild(tag);
  }
  tag.href = href;
}

type SeoOptions = {
  title: string;
  description: string;
  lang: string;
  path?: string;
  noIndex?: boolean;
};

export function useSeo({ title, description, lang, path = "", noIndex = false }: SeoOptions) {
  useEffect(() => {
    const url = `${SITE_URL}/${path}`;
    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", lang === "ar" ? "ar_EG" : lang === "fr" ? "fr_FR" : "en_US");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertLink("canonical", path.endsWith(".html") ? url : `${SITE_URL}/`);
    document.documentElement.setAttribute("data-route", path || "home");
  }, [title, description, lang, path, noIndex]);
}
