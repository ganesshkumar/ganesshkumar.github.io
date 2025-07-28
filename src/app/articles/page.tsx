
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import moment from 'moment';
import ResponsiveLayout from "../../components/ResponsiveLayout";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { NAVIGATION_LINKS, SITE_CONFIG } from "@/lib/constants";
import { generateSEOMetadata } from '@/lib/seo';

const pageTitle = "Articles | Ganessh Kumar";
const pageDescription = "Read articles by Ganessh Kumar on software development, AI solutions, web technologies, productivity tools, and technical insights. Sharing knowledge and experiences from years of full-stack development.";
const canonicalUrl = `${SITE_CONFIG.url}/articles`;

const ldSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  url: canonicalUrl,
  name: pageTitle,
  description: pageDescription,
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

export const metadata = generateSEOMetadata({
  title: pageTitle,
  description: pageDescription,
  canonicalUrl,
  type: 'website',
  keywords: [
    "articles",
    "blog",
    "software development",
    "AI solutions",
    "web technologies",
    "productivity",
    "technical writing",
    "programming tutorials",
    "developer insights",
    "full stack development"
  ],
  ldSchema,
});

type Article = {
  title: string;
  pubDate: string;
  slug: string;
};

function getArticles(): Article[] {
  const articlesDir = path.join(process.cwd(), 'src', 'articles');
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const filePath = path.join(articlesDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    return {
      title: data.title || file.replace(/\.md$/, ''),
      pubDate: data.pubDate || data.date,
      slug: file.replace(/\.md$/, ''),
    };
  }).filter(a => a.pubDate).sort((a, b) => moment(b.pubDate).valueOf() - moment(a.pubDate).valueOf());
}

function groupByYear(articles: Article[]) {
  return articles.reduce((acc, article) => {
    const year = moment(article.pubDate).format('YYYY');
    if (!acc[year]) acc[year] = [];
    acc[year].push(article);
    return acc;
  }, {} as Record<string, Article[]>);
}

export default function ArticlesPage() {
  const articles = getArticles();
  const grouped = groupByYear(articles);
  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  // Enhanced schema with actual articles
  const enhancedLdSchema = {
    ...ldSchema,
    blogPost: articles.slice(0, 10).map(article => ({
      "@type": "BlogPosting",
      url: `${SITE_CONFIG.url}/articles/${article.slug}`,
      headline: article.title,
      name: article.title,
      datePublished: article.pubDate,
      author: {
        "@type": "Person",
        name: SITE_CONFIG.author.name,
        url: SITE_CONFIG.url,
      },
    }))
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(enhancedLdSchema)
        }}
      />
      <ResponsiveLayout
        nav={
          <Navbar
            logo={<span className="font-bold text-xl">
              <Image src="/android-chrome-512x512.png" alt="Logo" width={32} height={32} />
            </span>}
            links={NAVIGATION_LINKS}
            currentUrl="/articles"
          />
        }
        hero={
          <div className="text-center w-full py-6 rounded">
            <h1 className="text-3xl font-bold">Articles</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Insights and experiences from software development, AI solutions, and modern web technologies.
            </p>
          </div>
        }
        content={
          <div className="flex flex-col w-full gap-4 rounded">
            <div className="py-8 px-4">
              {years.map(year => (
                <div key={year} className="mb-10">
                  <h2 className="text-xl font-semibold mb-4">{year}</h2>
                  <ul itemScope itemType="https://schema.org/ItemList">
                    {grouped[year].map((article, index) => (
                      <li 
                        key={article.slug} 
                        className="flex justify-between border-b py-2"
                        itemScope
                        itemType="https://schema.org/BlogPosting"
                        itemProp="itemListElement"
                      >
                        <meta itemProp="position" content={String(index + 1)} />
                        <span className="truncate">
                          <a 
                            href={`/articles/${article.slug}`} 
                            className="hover:underline"
                            itemProp="url"
                          >
                            <span itemProp="headline name">{article.title}</span>
                          </a>
                        </span>
                        <span className="text-gray-500 text-sm ml-4 whitespace-nowrap">
                          <time itemProp="datePublished" dateTime={article.pubDate}>
                            {moment(article.pubDate).format('MMM DD, YYYY')}
                          </time>
                        </span>
                        <meta itemProp="author" content={SITE_CONFIG.author.name} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        }
        leftSidebar={null}
        rightSidebar={null}
        footer={<Footer />}
      />
    </>
  );
}
