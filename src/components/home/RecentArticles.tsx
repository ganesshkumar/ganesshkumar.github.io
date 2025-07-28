import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import moment from 'moment';

type ArticleData = {
  title: string;
  description?: string;
  author?: string;
  date?: string;
  pubDate?: string;
  modified_date?: string;
  tags?: string[];
  categories?: string[];
  slug: string;
  coverImage?: string;
};

async function getRecentArticles(): Promise<ArticleData[]> {
  try {
    const articlesDir = path.join(process.cwd(), 'src', 'articles');
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
    
    const articles: (ArticleData | null)[] = await Promise.all(
      files.map(async (file) => {
        const slug = file.replace(/\.md$/, '');
        const filePath = path.join(articlesDir, file);
        
        try {
          const raw = fs.readFileSync(filePath, 'utf-8');
          const { data } = matter(raw);
          
          return {
            title: data.title || slug,
            description: data.description,
            author: data.author,
            date: data.date,
            pubDate: data.pubDate,
            modified_date: data.modified_date,
            tags: data.tags,
            categories: data.categories,
            slug,
            coverImage: data.coverImage,
          } as ArticleData;
        } catch (error) {
          console.error(`Error reading article ${file}:`, error);
          return null;
        }
      })
    );
    
    // Filter out null articles and sort by date (newest first)
    const validArticles = articles.filter((article): article is ArticleData => article !== null);
    
    return validArticles
      .sort((a, b) => {
        const dateA = new Date(a.pubDate || a.date || 0);
        const dateB = new Date(b.pubDate || b.date || 0);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 10); // Get the latest 10 articles
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

const RecentArticles: React.FC = async () => {
  const recentArticles = await getRecentArticles();

  return (
    <div className="from-stone-200 to-stone-100 rounded-2xl gap-8 mx-2">
      <h2 className="text-4xl font-bold mb-8">Recent <span className='text-primary'>Articles</span></h2>
      <div className='flex flex-col gap-6'>
        {recentArticles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="block">
            <div className="flex border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white overflow-hidden h-40">
              {/* Cover Image */}
              {article.coverImage ? (
                <div 
                  className="h-full aspect-video flex-shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${article.coverImage}')` }}
                />
              ) : (
                <div className="h-full aspect-video flex-shrink-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  {/* Date */}
                  <div className="text-xs text-gray-500 mb-2">
                    {(article.pubDate || article.date) && (
                      <span>{moment(article.pubDate || article.date).format('MMM DD, YYYY')}</span>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  {/* Description */}
                  {article.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {article.description}
                    </p>
                  )}
                </div>
                
                {/* Author */}
                <div className="text-xs text-gray-500">
                  {article.author && (
                    <span>by {article.author}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentArticles;