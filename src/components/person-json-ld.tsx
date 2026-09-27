import { roles } from "@/lib/content";
import { site, socials } from "@/lib/site";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.legalName,
    jobTitle: site.role,
    url: site.url,
    image: `${site.url}/shawn-tan.jpeg`,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressCountry: "SG", addressLocality: site.location },
    sameAs: [socials.github.href, socials.linkedin.href, socials.instagram.href],
    //~ include `worksFor` when valid
    alumniOf: roles.map((r) => ({
      "@type": "Organization",
      name: r.company,
      url: r.href,
    })),
    knowsAbout: [
      "Python",
      "JavaScript",
      "TypeScript",
      "React",
      "Vue.js",
      "Next.js",
      "SQL",
      "Marketing Automation",
      "Product Management",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
