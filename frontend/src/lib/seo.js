// SEO configuration and utilities

export const SITE_CONFIG = {
  title: "DESi Smart Locks UAE",
  description:
    "Advanced smart locks and security solutions in UAE. Face recognition, AES-256 encryption, 6-month battery life. Buy DESi smart locks online.",
  url: "https://desilocks.com",
  image: "/og-image.jpg",
  keywords:
    "smart locks UAE, face recognition locks, security locks Dubai, biometric locks",
  author: "DESi Smart Locks",
};

export const generateMetaTags = (pageConfig = {}) => {
  const {
    title = SITE_CONFIG.title,
    description = SITE_CONFIG.description,
    image = SITE_CONFIG.image,
    url = SITE_CONFIG.url,
    type = "website",
    keywords = SITE_CONFIG.keywords,
  } = pageConfig;

  return {
    title,
    description,
    image,
    url,
    type,
    keywords,
    ogTags: {
      "og:title": title,
      "og:description": description,
      "og:image": image,
      "og:url": url,
      "og:type": type,
      "og:site_name": "DESi Smart Locks UAE",
    },
    twitterTags: {
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": image,
    },
  };
};

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DESi Smart Locks",
    url: SITE_CONFIG.url,
    image: "/logo.png",
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dubai, UAE",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "+971-xxx-xxx-xxxx",
    },
  },

  product: (product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    url: `${SITE_CONFIG.url}/product/${product.slug}`,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "AED",
      availability: product.inStock ? "InStock" : "OutOfStock",
    },
  }),

  faqPage: (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }),

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DESi Smart Locks UAE",
    image: "/logo.png",
    "@id": SITE_CONFIG.url,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dubai, UAE",
      addressCountry: "AE",
    },
  },
};
