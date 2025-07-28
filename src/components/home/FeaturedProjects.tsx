import React from 'react';
import Link from 'next/link';
import { getFeaturedProjects, type ProjectData } from '@/lib/projects';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const FeaturedProjects: React.FC = async () => {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="from-stone-200 to-stone-100 rounded-2xl gap-8 mx-2 mb-8">
      <h2 className="text-4xl font-bold mb-8">Featured <span className='text-primary'>Projects</span></h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => {
  return (
    <Card className={`h-full flex flex-col hover:shadow-lg transition-shadow overflow-hidden ${project.bannerUrl  ? 'pt-0' : '' }`}>
      {project.bannerUrl && (
        <div className="w-full">
          <img 
            src={project.bannerUrl} 
            alt={`${project.title} banner`}
            className="w-full h-32 object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start gap-3">
          {project.iconUrl ? (
            <img 
              src={project.iconUrl} 
              alt={`${project.title} icon`}
              className="w-8 h-8 rounded object-cover flex-shrink-0"
            />
          ) : project.boxIcon ? (
            <div className={`w-8 h-8 flex items-center justify-center rounded bg-primary/10 flex-shrink-0`}>
              <i className={`bx ${project.boxIcon} text-primary text-lg`}></i>
            </div>
          ) : null}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            {project.summary && (
              <CardDescription className="mt-1">{project.summary}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        {project.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-4">
        {project.liveUrl && (
          <Button asChild size="sm" className="flex-1">
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </Link>
          </Button>
        )}
        {project.repoUrl && (
          <Button asChild variant="outline" size="sm" className={project.liveUrl ? "" : "flex-1"}>
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              {project.liveUrl ? "" : "View Code"}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FeaturedProjects;
