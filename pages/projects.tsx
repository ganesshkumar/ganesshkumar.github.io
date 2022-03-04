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
  iconUrl: string | null;
  repoUrl: string;
  summary: string;
  content: string;
  showcase: boolean;
};

// const RepoIcon = (props: any) => {
//   if (props.url.includes('github'))
//     return <i className='bx bxl-github cursor-pointer'/>
//   else if (props.url.includes('gitlab'))
//     return <i className='bx bxl-gitlab cursor-pointer'/>
//   else
//     return <i className='bx bxl-github cursor-pointer'/>
// }

const Project = (props: IProject) => {
  return (
    <div className="rounded-xl relative m-5 w-64 shadow-md transition duration-500 hover:scale-110 border border-slate-200 hover:shadow-gray-200/50">
      <div className="card-body">
        <h2 className="card-title">
          <a className="text-xl text-slate-700 hover:text-sky-600 decoration-sky-600 hover:underline" href={props.repoUrl} target="_blank" rel="noreferrer">
            {props.title}
          </a>
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <p className="text-slate-500">{props.summary}</p>
        <div className='w-2/3'>
          <div className='mt-2 github-badges'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        </div>
      </div>
      {props.showcase && <div className='z-10 absolute -top-5 -left-4 text-3xl cursor-pointer' title='Famous Projects'>🎉</div>}
    </div>
  );
}

const Projects = (props: IProjectsProps) => (
  <Main meta={<Meta title="Projects" description="Here are some of my hobby projects" />} currentPage="Projects">
    <Content className='container mx-auto w-100 lg:w-2/3'>
      <p className="text-3xl my-2 mx-10">
        <h1 className='font-bold text-3xl'>
          <span className='tracking-wide underline decoration-sky-500 decoration-4 underline-offset-2'>Projects</span>
        </h1>
      </p>
      <div className='flex flex-wrap justify-center p-5'>
        {props.projects.map((project) => (
          <Project
            key={project.title}
            title={project.title}
            repoUrl={project.repoUrl}
            iconUrl={project.iconUrl}
            summary={project.summary}
            content={project.content}
            showcase={project.showcase}
          />
        ))}
      </div>
    </Content>
  </Main>
);

export const getStaticProps: GetStaticProps<IProjectsProps> = async () => {
  const projectSlugs = getAllProjects(['slug', 'order']);

  const projects = await Promise.all(
    projectSlugs.map(async (projectSlug) => {
      const {
        title, summary, repoUrl, iconUrl, content, showcase
      } = getProjectBySlug(projectSlug.slug, [
        'title',
        'summary',
        'iconUrl',
        'repoUrl',
        'content',
        'showcase'
      ]);

      return {
        title,
        summary,
        repoUrl,
        iconUrl: iconUrl || null,
        content: await markdownToHtml(content || ''),
        showcase: showcase || false
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
