import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE_CONFIG, generateMetaTags, structuredData } from "../lib/seo";

// SEO Head Component for managing meta tags and structured data
export const SEOHead = ({
  title,
  description,
  image,
  keywords,
  type = "website",
  structuredDataContent,
  canonical,
}) => {
  const location = useLocation();
  const fullUrl = `${SITE_CONFIG.url}${location.pathname}`;

  const metaTags = generateMetaTags({
    title,
    description,
    image,
    url: canonical || fullUrl,
    type,
    keywords,
  });

  return (
    <Helmet>
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="keywords" content={metaTags.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="UTF-8" />

      {/* Canonical URL for duplicate content prevention */}
      <link rel="canonical" href={canonical || fullUrl} />

      {/* Open Graph Tags for Social Sharing */}
      <meta property="og:title" content={metaTags.ogTags["og:title"]} />
      <meta
        property="og:description"
        content={metaTags.ogTags["og:description"]}
      />
      <meta property="og:image" content={metaTags.ogTags["og:image"]} />
      <meta property="og:url" content={metaTags.ogTags["og:url"]} />
      <meta property="og:type" content={metaTags.ogTags["og:type"]} />
      <meta property="og:site_name" content={metaTags.ogTags["og:site_name"]} />

      {/* Twitter Card Tags */}
      <meta
        name="twitter:card"
        content={metaTags.twitterTags["twitter:card"]}
      />
      <meta
        name="twitter:title"
        content={metaTags.twitterTags["twitter:title"]}
      />
      <meta
        name="twitter:description"
        content={metaTags.twitterTags["twitter:description"]}
      />
      <meta
        name="twitter:image"
        content={metaTags.twitterTags["twitter:image"]}
      />

      {/* Security Headers */}
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="theme-color" content="#E60012" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />

      {/* Structured Data (JSON-LD) */}
      {structuredDataContent && (
        <script type="application/ld+json">
          {JSON.stringify(structuredDataContent)}
        </script>
      )}

      {/* Preconnect to external resources for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />

      {/* Preload critical resources */}
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
      />
    </Helmet>
  );
};

export default SEOHead;
