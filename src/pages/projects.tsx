import React from 'react';

import { GetStaticProps } from 'next';

import { Content } from '../content/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
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

const Project = (props: IProject) => (
  <div>
    <span>
      <a className="underline cursor-pointer" href={props.repoUrl}>
        {props.title}
      </a>
    </span>
    <span>{props.summary}</span>
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  </div>
);

const Projects = (props: IProjectsProps) => (
  <Main meta={<Meta title="Projects" description="Here are some of my hobby projects" />}>
    <h1 className="text-center font-bold text-3xl text-gray-900">Projects</h1>
    <Content>
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
  const projectSlugs = getAllProjects(['slug']);

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
