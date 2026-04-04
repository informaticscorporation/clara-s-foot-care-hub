import { useEffect } from "react";
import { localKeywords, targetLocations } from "@/data/localSeo";

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

export const Seo = ({ title, description, path }: SeoProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (
      selector: string,
      attribute: "name" | "property",
      key: string,
      content: string
    ) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    const origin = window.location.origin;
    const canonical = `${origin}${path}`;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="keywords"]', "name", "keywords", localKeywords.join(", "));
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    const jsonLdId = "localbusiness-jsonld";
    const existingJsonLd = document.getElementById(jsonLdId);
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    const jsonLd = document.createElement("script");
    jsonLd.id = jsonLdId;
    jsonLd.type = "application/ld+json";
    jsonLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "Clara Maria Di Nofa - Podologa",
      description,
      areaServed: targetLocations,
      telephone: "+393792020629",
      vatID: "IT04882250618",
      url: canonical,
      priceRange: "€€",
    });
    document.head.appendChild(jsonLd);

    return () => {
      jsonLd.remove();
    };
  }, [description, path, title]);

  return null;
};
