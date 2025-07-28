import { generateSitemap, getStaticSitemapEntries } from '@/lib/sitemap';
import { SITE_CONFIG } from '@/lib/constants';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Force static generation for static export
export const dynamic = 'force-static';

// Get dynamic articles for sitemap
async function getArticles() {
  const articlesDirectory = path.join(process.cwd(), 'src', 'articles');
  const filenames = fs.readdirSync(articlesDirectory);
  
  const articles = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(articlesDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: name.replace(/\.md$/, ''),
        frontmatter: data,
      };
    });

  return articles;
}

// Get dynamic projects for sitemap
async function getProjects() {
  const projectsDirectory = path.join(process.cwd(), 'src', 'projects');
  
  // Check if projects directory exists
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(projectsDirectory);
  
  const projects = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(projectsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: name.replace(/\.md$/, ''),
        frontmatter: data,
      };
    });

  return projects;
}

export async function GET() {
  const baseUrl = SITE_CONFIG.url;
  
  // Get static pages
  const staticEntries = getStaticSitemapEntries();
  
  // Get dynamic articles
  const articles = await getArticles();
  const articleEntries = articles.map(article => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.frontmatter.date ? new Date(article.frontmatter.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  // Get dynamic projects
  const projects = await getProjects();
  const projectEntries = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.frontmatter.date ? new Date(project.frontmatter.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  // Combine all entries
  const allEntries = [...staticEntries, ...articleEntries, ...projectEntries];
  
  // Generate sitemap XML
  const sitemap = generateSitemap(allEntries);
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
