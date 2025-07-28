import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import ResponsiveLayout from '@/components/ResponsiveLayout';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NAVIGATION_LINKS, SITE_CONFIG } from '@/lib/constants';
import { generateSEOMetadata, generatePersonLDSchema } from '@/lib/seo';
import Image from 'next/image';

const pageTitle = "Projects | Ganessh Kumar";
const pageDescription = "Explore projects by Ganessh Kumar, including web applications, developer tools, Obsidian plugins, and AI-powered solutions. Showcasing full-stack development skills with modern technologies.";
const canonicalUrl = `${SITE_CONFIG.url}/projects`;

const ldSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: canonicalUrl,
  datePublished: "2013-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  headline: pageTitle,
  name: pageTitle,
  description: pageDescription,
  mainEntity: {
    "@type": "ItemList",
    name: "Ganessh Kumar's Projects",
    description: "A collection of software projects and applications",
    itemListElement: []
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

export const metadata = generateSEOMetadata({
  title: pageTitle,
  description: pageDescription,
  canonicalUrl,
  type: 'website',
  keywords: [
    "projects",
    "portfolio",
    "web applications",
    "developer tools",
    "Obsidian plugins",
    "AI solutions",
    "open source",
    "GitHub",
    "React projects",
    "Next.js",
    "TypeScript projects"
  ],
  ldSchema,
});

interface ProjectFrontmatter {
  title: string;
  description: string;
  summary?: string;
  repoUrl?: string;
  liveUrl?: string;
  iconUrl?: string;
  showcase?: boolean;
  order?: number;
  boxIcon?: string;
}

interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

async function getProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(process.cwd(), 'src', 'projects');
  const filenames = fs.readdirSync(projectsDirectory);
  
  const projects = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(projectsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: name.replace(/\.md$/, ''),
        frontmatter: data as ProjectFrontmatter,
        content,
      };
    })
    .sort((a, b) => {
      // Sort by order in descending order (highest first), then by title
      const orderA = a.frontmatter.order || 0;
      const orderB = b.frontmatter.order || 0;
      if (orderA !== orderB) {
        return orderB - orderA; // Descending order
      }
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    });

  return projects;
}

function ProjectCard({ project }: { project: Project }) {
  const { frontmatter } = project;
  
  return (
    <Card 
      className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          {frontmatter.iconUrl && (
            <img 
              src={frontmatter.iconUrl} 
              alt={`${frontmatter.title} icon`}
              className="w-8 h-8 rounded"
              itemProp="image"
            />
          )}
          <CardTitle className="text-lg" itemProp="name">
            {frontmatter.title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm text-gray-600" itemProp="description">
          {frontmatter.summary || frontmatter.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-700 leading-relaxed" itemProp="description">
          {frontmatter.description}
        </p>
        <meta itemProp="author" content={SITE_CONFIG.author.name} />
        <meta itemProp="applicationCategory" content="WebApplication" />
        <meta itemProp="operatingSystem" content="Any" />
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-4 border-t">
        {frontmatter.repoUrl && (
          <a
            href={frontmatter.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
            itemProp="codeRepository"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
        )}
        {frontmatter.liveUrl && (
          <a
            href={frontmatter.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md transition-colors duration-200"
            itemProp="url"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
      </CardFooter>
    </Card>
  );
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  // Generate enhanced structured data with actual projects
  const enhancedLdSchema = {
    ...ldSchema,
    mainEntity: {
      "@type": "ItemList",
      name: "Ganessh Kumar's Projects",
      description: "A collection of software projects and applications",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: project.frontmatter.title,
          description: project.frontmatter.description,
          ...(project.frontmatter.liveUrl && { url: project.frontmatter.liveUrl }),
          ...(project.frontmatter.repoUrl && { codeRepository: project.frontmatter.repoUrl }),
          author: {
            "@type": "Person",
            name: SITE_CONFIG.author.name,
            url: SITE_CONFIG.url,
          },
          applicationCategory: "WebApplication",
          operatingSystem: "Any",
        }
      }))
    }
  };

  const projectsContent = (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(enhancedLdSchema)
        }}
      />
      <div className="w-full">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A collection of projects I&apos;ve worked on, ranging from web applications to developer tools and Obsidian plugins.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No projects found.</p>
        </div>
      )}
    </div>
    </>
  );
  
  return (
    <ResponsiveLayout
      nav={
        <Navbar
          logo={
            <span className="font-bold text-xl">
              <Image src="/android-chrome-512x512.png" alt="Logo" width={32} height={32} />
            </span>
          }
          links={NAVIGATION_LINKS}
          currentUrl="/projects"
        />
      }
      content={projectsContent}
      footer={<Footer />}
      maxWidthClass="max-w-6xl"
    />
  );
}
