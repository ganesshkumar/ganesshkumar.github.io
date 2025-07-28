import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ResponsiveLayout from "../../../components/ResponsiveLayout";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { NAVIGATION_LINKS, SITE_CONFIG } from "@/lib/constants";
import { generateSEOMetadata, generateArticleLDSchema } from '@/lib/seo';
import moment from 'moment';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

import { Metadata } from 'next';

type ArticleData = {
  title: string;
  description?: string;
  author?: string;
  date?: string;
  pubDate?: string;
  modified_date?: string;
  image?: {
    url?: string;
    alt?: string;
  } | string;
  tags?: string[];
  categories?: string[];
  slug: string;
  content: string;
  htmlContent: string;
  coverImage?: string;
};

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function processMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm) // Enable GitHub Flavored Markdown (tables, strikethrough, etc.)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);
  
  return String(result);
}

async function getArticleBySlug(slug: string): Promise<ArticleData | null> {
  try {
    const articlesDir = path.join(process.cwd(), 'src', 'articles');
    const filePath = path.join(articlesDir, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    
    const htmlContent = await processMarkdown(content);
    
    return {
      title: data.title || slug,
      description: data.description,
      author: data.author,
      date: data.date,
      pubDate: data.pubDate,
      modified_date: data.modified_date,
      image: data.image,
      tags: data.tags,
      categories: data.categories,
      slug,
      content,
      htmlContent,
      coverImage: data.coverImage,
    };
  } catch (error) {
    console.error('Error reading article:', error);
    return null;
  }
}

async function getAllArticles(): Promise<ArticleData[]> {
  try {
    const articlesDir = path.join(process.cwd(), 'src', 'articles');
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
    
    const articles = await Promise.all(
      files.map(async (file) => {
        const slug = file.replace(/\.md$/, '');
        return await getArticleBySlug(slug);
      })
    );
    
    return articles.filter((article): article is ArticleData => article !== null);
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

async function getSuggestedPosts(currentSlug: string, currentTags: string[] = []): Promise<ArticleData[]> {
  const allArticles = await getAllArticles();
  
  // Filter out current article
  const otherArticles = allArticles.filter(article => article.slug !== currentSlug);
  
  // Find articles with matching tags
  const tagMatches = otherArticles.filter(article => 
    article.tags && article.tags.some(tag => currentTags.includes(tag))
  );
  
  // Sort tag matches by number of matching tags (descending)
  tagMatches.sort((a, b) => {
    const aMatches = a.tags?.filter(tag => currentTags.includes(tag)).length || 0;
    const bMatches = b.tags?.filter(tag => currentTags.includes(tag)).length || 0;
    return bMatches - aMatches;
  });
  
  // Get recent posts (sorted by date, excluding current article)
  const recentPosts = otherArticles
    .filter(article => article.pubDate || article.date)
    .sort((a, b) => {
      const dateA = new Date(a.pubDate || a.date || 0);
      const dateB = new Date(b.pubDate || b.date || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);
  
  // Combine and deduplicate
  const suggested = new Map<string, ArticleData>();
  
  // Add tag matches first (up to 4)
  tagMatches.slice(0, 4).forEach(article => {
    suggested.set(article.slug, article);
  });
  
  // Add recent posts to fill remaining slots
  recentPosts.forEach(article => {
    if (suggested.size < 6) {
      suggested.set(article.slug, article);
    }
  });
  
  return Array.from(suggested.values());
}

// Generate static params for all articles
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const articlesDir = path.join(process.cwd(), 'src', 'articles');
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
    
    return files.map(file => ({
      slug: file.replace(/\.md$/, ''),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for each article
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found | Ganessh Kumar',
      description: 'The requested article could not be found.',
    };
  }

  const pageTitle = `${article.title} | Ganessh Kumar`;
  const pageDescription = article.description || `Read "${article.title}" by Ganessh Kumar. Insights on software development, AI solutions, and modern web technologies.`;
  const canonicalUrl = `${SITE_CONFIG.url}/articles/${slug}`;
  const publishedTime = article.pubDate || article.date;
  const modifiedTime = article.modified_date;
  const imageUrl = typeof article.image === 'string' ? article.image : 
                   typeof article.image === 'object' ? article.image?.url : 
                   article.coverImage || SITE_CONFIG.author.image;

  const ldSchema = generateArticleLDSchema({
    canonicalUrl,
    title: pageTitle,
    description: pageDescription,
    publishedTime: publishedTime || new Date().toISOString(),
    modifiedTime,
    image: imageUrl,
  });

  return generateSEOMetadata({
    title: pageTitle,
    description: pageDescription,
    canonicalUrl,
    type: 'article',
    publishedTime,
    modifiedTime,
    keywords: [
      ...(article.tags || []),
      ...(article.categories || []),
      "software development",
      "web technologies",
      "programming",
      "technical article",
      "AI solutions"
    ],
    image: imageUrl,
    ldSchema,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }
  
  const publishDate = article.pubDate || article.date;
  const modifiedDate = article.modified_date;
  
  // Only show modified date if it's different from publish date
  const showModifiedDate = modifiedDate && publishDate && 
    moment(modifiedDate).format('YYYY-MM-DD') !== moment(publishDate).format('YYYY-MM-DD');
  
  // Get suggested posts
  const suggestedPosts = await getSuggestedPosts(slug, article.tags || []);

  // Generate structured data for this specific article
  const canonicalUrl = `${SITE_CONFIG.url}/articles/${slug}`;
  const imageUrl = typeof article.image === 'string' ? article.image : 
                   typeof article.image === 'object' ? article.image?.url : 
                   article.coverImage || SITE_CONFIG.author.image;
  
  const articleLdSchema = generateArticleLDSchema({
    canonicalUrl,
    title: article.title,
    description: article.description || `Read "${article.title}" by Ganessh Kumar.`,
    publishedTime: publishDate || new Date().toISOString(),
    modifiedTime: modifiedDate,
    image: imageUrl,
  });
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleLdSchema)
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
        <div className="relative w-full pb-0 mb-0">
          {article.coverImage ? (
            <div>
              {/* Hero background image */}
              <div 
                className="relative w-full h-[500px] md:h-[600px] rounded overflow-hidden"
                style={{
                  backgroundImage: `url('${article.coverImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="mx-auto">
                    <h1 
                      className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg"
                      itemProp="headline name"
                    >
                      {article.title}
                    </h1>
                  </div>
                </div>
              </div>
              
              {/* Author, date, and tags below the image */}
              <div className="mx-auto px-4 py-6">
                {/* Mobile: Single column layout */}
                <div className="md:hidden space-y-3">
                  {article.author && (
                    <div className="text-sm text-gray-600">
                      <span>By {article.author}</span>
                    </div>
                  )}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {publishDate && (
                    <div className="text-sm text-gray-600">
                      <span>Published {moment(publishDate).format('MMMM DD, YYYY')}</span>
                    </div>
                  )}
                  {showModifiedDate && (
                    <div className="text-sm text-gray-600">
                      <span>Updated {moment(modifiedDate).format('MMMM DD, YYYY')}</span>
                    </div>
                  )}
                </div>

                {/* Desktop: Two-line layout */}
                <div className="hidden md:block">
                  {/* First line: Author and Tags */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-gray-600">
                      {article.author ? (
                        <span>By {article.author}</span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags && article.tags.length > 0 && article.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Second line: Published and Modified dates */}
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div>
                      {publishDate && (
                        <span>Published {moment(publishDate).format('MMMM DD, YYYY')}</span>
                      )}
                    </div>
                    <div>
                      {showModifiedDate && (
                        <span>Updated {moment(modifiedDate).format('MMMM DD, YYYY')}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Hero without background image
            <div className="w-full py-8">
              <div className="text-left px-4 mb-6">
                <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              </div>
              
              {/* Author, date, and tags below the title */}
              <div className="mx-auto px-4 py-6">
                {/* Mobile: Single column layout */}
                <div className="md:hidden space-y-3">
                  {article.author && (
                    <div className="text-sm text-gray-600">
                      <span>By {article.author}</span>
                    </div>
                  )}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {publishDate && (
                    <div className="text-sm text-gray-600">
                      <span>Published {moment(publishDate).format('MMMM DD, YYYY')}</span>
                    </div>
                  )}
                  {showModifiedDate && (
                    <div className="text-sm text-gray-600">
                      <span>Updated {moment(modifiedDate).format('MMMM DD, YYYY')}</span>
                    </div>
                  )}
                </div>

                {/* Desktop: Two-line layout */}
                <div className="hidden md:block">
                  {/* First line: Author and Tags */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-gray-600">
                      {article.author ? (
                        <span>By {article.author}</span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags && article.tags.length > 0 && article.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Second line: Published and Modified dates */}
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div>
                      {publishDate && (
                        <span>Published {moment(publishDate).format('MMMM DD, YYYY')}</span>
                      )}
                    </div>
                    <div>
                      {showModifiedDate && (
                        <span>Updated {moment(modifiedDate).format('MMMM DD, YYYY')}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
      content={
        <div className="px-4 pb-8">
          <article 
            className="prose prose-lg max-w-none"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <meta itemProp="headline" content={article.title} />
            <meta itemProp="author" content={article.author || SITE_CONFIG.author.name} />
            <meta itemProp="publisher" content={SITE_CONFIG.author.name} />
            {publishDate && (
              <meta itemProp="datePublished" content={publishDate} />
            )}
            {modifiedDate && (
              <meta itemProp="dateModified" content={modifiedDate} />
            )}
            {article.description && (
              <meta itemProp="description" content={article.description} />
            )}
            {imageUrl && (
              <meta itemProp="image" content={imageUrl} />
            )}
            {article.tags && article.tags.map(tag => (
              <meta key={tag} itemProp="keywords" content={tag} />
            ))}
            
            <div 
              className="markdown-content"
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: article.htmlContent }}
            />
          </article>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <a 
                href="/articles" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                ← Back to Articles
              </a>
              
              {article.categories && article.categories.length > 0 && (
                <div className="flex gap-2">
                  {article.categories.map(category => (
                    <span 
                      key={category} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      }
      leftSidebar={null}
      rightSidebar={
        suggestedPosts.length > 0 ? (
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Suggested Posts</h3>
            <div className="space-y-4">
              {suggestedPosts.map((post) => (
                <div key={post.slug} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <a href={`/articles/${post.slug}`} className="block">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                      {post.title}
                    </h4>
                    {post.description && (
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {post.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.tags && post.tags.slice(0, 2).map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {(post.pubDate || post.date) && (
                      <p className="text-xs text-gray-500">
                        {moment(post.pubDate || post.date).format('MMM DD, YYYY')}
                      </p>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : null
      }
      footer={<Footer />}
    />
    </>
  );
}
