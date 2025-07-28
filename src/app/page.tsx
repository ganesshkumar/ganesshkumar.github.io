import ResponsiveLayout from "../components/ResponsiveLayout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import GKHeroCard from "@/components/home/GKHeroCard";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import RecentArticles from "@/components/home/RecentArticles";
import { NAVIGATION_LINKS, SITE_CONFIG } from "@/lib/constants";
import { generateSEOMetadata } from '@/lib/seo';

const pageTitle = "Ganessh Kumar - Experienced Full Stack Software Engineer";
const pageDescription = "Ganessh Kumar is a full-stack software engineer at Microsoft building AI-powered solutions and modern web applications. Passionate about React, TypeScript, Next.js, and creating tools that enhance productivity.";
const canonicalUrl = SITE_CONFIG.url;

const ldSchema = [
  // Person Schema
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}/#Person`,
    name: SITE_CONFIG.author.name,
    url: SITE_CONFIG.url,
    image: {
      "@type": "ImageObject",
      "@id": SITE_CONFIG.author.image,
      url: SITE_CONFIG.author.image,
      height: 256,
      width: 256,
    },
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Microsoft",
      url: "https://www.microsoft.com"
    },
    description: pageDescription,
    knowsAbout: [
      "Software Engineering",
      "Full Stack Development",
      "AI Solutions",
      "Web Applications",
      "TypeScript",
      "React",
      "Next.js",
      "Microsoft Fabric",
      "Obsidian Plugins"
    ],
    sameAs: [
      `https://github.com/${SITE_CONFIG.author.github}`,
      `https://linkedin.com/in/${SITE_CONFIG.author.linkedin}`,
      `https://twitter.com/${SITE_CONFIG.author.twitter.replace('@', '')}`,
    ],
  },
  // Website Schema
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#WebSite`,
    url: SITE_CONFIG.url,
    name: pageTitle,
    description: pageDescription,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.url}/#Person`,
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  },
  // WebPage Schema for Homepage
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_CONFIG.url}/#WebPage`,
    url: SITE_CONFIG.url,
    name: pageTitle,
    description: pageDescription,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#WebSite`
    },
    about: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.url}/#Person`
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": SITE_CONFIG.author.image,
      url: SITE_CONFIG.author.image,
      height: 256,
      width: 256,
    },
    datePublished: "2013-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  },
  // BreadcrumbList Schema
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url
      }
    ]
  }
];

export const metadata = generateSEOMetadata({
  title: pageTitle,
  description: pageDescription,
  canonicalUrl,
  type: 'website',
  keywords: [
    "software engineer",
    "Microsoft",
    "full stack developer",
    "AI solutions",
    "React developer",
    "TypeScript",
    "Next.js",
    "web development",
    "Microsoft Fabric",
    "Obsidian plugins",
    "productivity tools",
    "modern web applications"
  ],
  ldSchema,
});

export default function Home() {
  return (
    <>
      {ldSchema.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
      <ResponsiveLayout
        nav={
          <Navbar
            logo={<span className="font-bold text-xl">
              <Image src="/android-chrome-512x512.png" alt="Logo" width={32} height={32} />
            </span>}
            links={NAVIGATION_LINKS}
            currentUrl="/"
          />
        }
        hero={
          <div 
            className="text-center w-full py-6 rounded"
            itemScope
            itemType="https://schema.org/Person"
          >
            <meta itemProp="name" content={SITE_CONFIG.author.name} />
            <meta itemProp="jobTitle" content="Software Engineer" />
            <meta itemProp="description" content={pageDescription} />
            <meta itemProp="url" content={SITE_CONFIG.url} />
            <meta itemProp="image" content={SITE_CONFIG.author.image} />
            <GKHeroCard />
          </div>
        }
        content={
          <div className="flex flex-col w-full gap-4 rounded">
            <section itemScope itemType="https://schema.org/ItemList">
              <meta itemProp="name" content="Featured Projects" />
              <meta itemProp="description" content="Showcase of notable software projects and applications" />
              <FeaturedProjects />
            </section>
            <section itemScope itemType="https://schema.org/ItemList">
              <meta itemProp="name" content="Recent Articles" />
              <meta itemProp="description" content="Latest articles on software development and technology" />
              <RecentArticles />
            </section>
          </div>
        }
        leftSidebar={null}
        rightSidebar={null}
        footer={<Footer />}
      />
    </>
  );
}
