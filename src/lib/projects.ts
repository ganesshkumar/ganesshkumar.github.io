import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type ProjectData = {
  title: string;
  description?: string;
  summary?: string;
  repoUrl?: string;
  iconUrl?: string;
  bannerUrl?: string;
  liveUrl?: string;
  order?: number;
  showcase?: boolean;
  boxIcon?: string;
  slug: string;
};

export async function getFeaturedProjects(): Promise<ProjectData[]> {
  try {
    const projectsDir = path.join(process.cwd(), 'src', 'projects');
    const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));
    
    const projects: (ProjectData | null)[] = await Promise.all(
      files.map(async (file) => {
        const slug = file.replace(/\.md$/, '');
        const filePath = path.join(projectsDir, file);
        
        try {
          const raw = fs.readFileSync(filePath, 'utf-8');
          const { data } = matter(raw);
          
          return {
            title: data.title || slug,
            description: data.description,
            summary: data.summary,
            repoUrl: data.repoUrl,
            iconUrl: data.iconUrl,
            bannerUrl: data.bannerUrl,
            liveUrl: data.liveUrl,
            order: data.order,
            showcase: data.showcase,
            boxIcon: data.boxIcon,
            slug,
          } as ProjectData;
        } catch (error) {
          console.error(`Error reading project ${file}:`, error);
          return null;
        }
      })
    );
    
    // Filter out null projects and only include showcased projects
    const validProjects = projects.filter((project): project is ProjectData => 
      project !== null && project.showcase === true
    );
    
    // Sort by order (descending, so higher order appears first)
    return validProjects.sort((a, b) => (b.order || 0) - (a.order || 0));
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}
