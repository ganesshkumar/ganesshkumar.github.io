import React from 'react';

import { GetStaticProps } from 'next';

import { Content } from '../content/Content';
import { Meta } from '../containers/layout/Meta';
import { Main } from '../containers/templates/Main';
import { getAllProjects, getProjectBySlug } from '../utils/Content';
import { markdownToHtml } from '../utils/Markdown';

export type IProjectsProps = {
  projects: IProject[];
};

export type IProject = {
  title: string;
  repoUrl: string;
  summary: string;
  content: string;
};

const RepoIcon = ({url}) => {
  if (url.includes('github'))
    return <i className='bx bxl-github cursor-pointer'/>
  else if (url.includes('gitlab'))
    return <i className='bx bxl-gitlab cursor-pointer'/>
  else
    return <i className='bx bxl-github cursor-pointer'/>
}

const Project = (props: IProject) => (
  <div className='mb-5'>
    <h2 className="text-2xl">{props.title}</h2>
    <h3 className="text-gray-400">{props.summary}</h3>
    <div>
      <a className="cursor-pointer text-base" href={props.repoUrl}>
        <RepoIcon url={props.repoUrl} />
      </a>
    </div>
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  </div>
);

const Projects = (props: IProjectsProps) => (
  <Main meta={<Meta title="Projects" description="Here are some of my hobby projects" />} currentPage="Projects">
    <Content>
      <p className="text-3xl my-2">Projects</p>
      {props.projects.map((project) => (
        <Project
          key={project.title}
          title={project.title}
          repoUrl={project.repoUrl}
          summary={project.summary}
          content={project.content}
        />
      ))}
    </Content>
  </Main>
);

export const getStaticProps: GetStaticProps<IProjectsProps> = async () => {
  const projectSlugs = getAllProjects(['slug', 'order']);

  const projects = await Promise.all(
    projectSlugs.map(async (projectSlug) => {
      const {
        title, summary, repoUrl, content,
      } = getProjectBySlug(projectSlug.slug, [
        'title',
        'summary',
        'repoUrl',
        'content',
      ]);

      return {
        title,
        summary,
        repoUrl,
        content: await markdownToHtml(content || ''),
      };
    }),
  );

  return {
    props: {
      projects,
    },
  };
};

export default Projects;
