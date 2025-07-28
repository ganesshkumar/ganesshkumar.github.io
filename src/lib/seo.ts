import { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  image?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ldSchema?: Record<string, any>;
}

export function generateSEOMetadata({
  title,
  description,
  canonicalUrl,
  type = 'website',
  publishedTime,
  modifiedTime,
  keywords = [],
  image = SITE_CONFIG.author.image,
  ldSchema
}: SEOProps): Metadata {
  const metadata: Metadata = {
    title,
    description,
    keywords: [
      "Ganessh Kumar",
      "Software Engineer", 
      "Microsoft",
      "Full Stack Developer",
      "AI Solutions",
      "Web Applications",
      ...keywords
    ],
    authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.author.name,
    publisher: SITE_CONFIG.author.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: canonicalUrl,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 256,
          height: 256,
          alt: `${title} - ${SITE_CONFIG.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      site: SITE_CONFIG.author.twitter,
      creator: SITE_CONFIG.author.twitter,
      images: [image],
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };

  // Add published/modified time for articles
  if (type === 'article' && publishedTime) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (metadata.openGraph as any).publishedTime = publishedTime;
    if (modifiedTime) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (metadata.openGraph as any).modifiedTime = modifiedTime;
    }
  }

  // Add structured data if provided
  if (ldSchema) {
    metadata.other = {
      'application/ld+json': JSON.stringify(ldSchema),
    };
  }

  return metadata;
}

export function generatePersonLDSchema(props: {
  canonicalUrl: string;
  title: string;
  description: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: '@type';
}) {
  const { canonicalUrl, title, description, publishedTime, modifiedTime, type = 'ProfilePage' } = props;
  
  return {
    "@context": "https://schema.org",
    "@type": type,
    url: canonicalUrl,
    ...(publishedTime && { datePublished: publishedTime }),
    dateModified: modifiedTime || new Date().toISOString().split("T")[0],
    headline: title,
    name: title,
    description,
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.url}/author/ganesshkumar/#Person`,
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.url,
      jobTitle: "Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Microsoft"
      },
      image: {
        "@type": "ImageObject",
        "@id": SITE_CONFIG.author.image,
        url: SITE_CONFIG.author.image,
        height: 256,
        width: 256,
      },
      sameAs: [
        `https://github.com/${SITE_CONFIG.author.github}`,
        `https://linkedin.com/in/${SITE_CONFIG.author.linkedin}`,
        `https://twitter.com/${SITE_CONFIG.author.twitter.replace('@', '')}`,
      ]
    },
    author: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.url}/author/ganesshkumar/#Person`,
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.url,
      image: {
        "@type": "ImageObject",
        "@id": SITE_CONFIG.author.image,
        url: SITE_CONFIG.author.image,
        height: 256,
        width: 256,
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": SITE_CONFIG.url,
      name: SITE_CONFIG.author.name,
      logo: {
        "@type": "ImageObject",
        "@id": SITE_CONFIG.author.image,
        url: SITE_CONFIG.author.image,
        height: 256,
        width: 256,
      },
    },
  };
}

export function generateArticleLDSchema(props: {
  canonicalUrl: string;
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
}) {
  const { canonicalUrl, title, description, publishedTime, modifiedTime, image = SITE_CONFIG.author.image } = props;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    url: canonicalUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime || new Date().toISOString().split("T")[0],
    headline: title,
    name: title,
    description,
    image: {
      "@type": "ImageObject",
      url: image,
      height: 256,
      width: 256,
    },
    author: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.url}/author/ganesshkumar/#Person`,
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.url,
      image: {
        "@type": "ImageObject",
        "@id": SITE_CONFIG.author.image,
        url: SITE_CONFIG.author.image,
        height: 256,
        width: 256,
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": SITE_CONFIG.url,
      name: SITE_CONFIG.author.name,
      logo: {
        "@type": "ImageObject",
        "@id": SITE_CONFIG.author.image,
        url: SITE_CONFIG.author.image,
        height: 256,
        width: 256,
      },
    },
  };
}
