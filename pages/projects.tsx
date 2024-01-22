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
  bannerUrl: string | null;
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
    // <div className="rounded-xl relative m-5 w-64 shadow-md transition duration-500 hover:scale-110 border border-slate-200 hover:shadow-gray-200/50">
    //   <div className="card-body">
    //     <h2 className="card-title">
    //       <a className="text-xl text-slate-700 hover:text-sky-600 decoration-sky-600 hover:underline" href={props.repoUrl} target="_blank" rel="noreferrer">
    //         {props.title}
    //       </a>
    //       {/* <div className="badge badge-secondary">NEW</div> */}
    //     </h2>
    //     <p className="text-slate-500">{props.summary}</p>
    //     <div className='w-2/3'>
    //       <div className='mt-2 github-badges'
    //         // eslint-disable-next-line react/no-danger
    //         dangerouslySetInnerHTML={{ __html: props.content }}
    //       />
    //     </div>
    //   </div>
    //   {props.showcase && <div className='z-10 absolute -top-5 -left-4 text-3xl cursor-pointer' title='Famous Projects'>🎉</div>}
    // </div>
    

    <div className="relative flex flex-col justify-between min-w-96 max-w-sm pb-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div>
          {props.bannerUrl && <img src={props.bannerUrl} /> }
          <a href={props.repoUrl}>
              <h5 className="px-6 mb-4 text-2xl font-bold tracking-tight text-gray-900 hover:text-sky-600 dark:text-white">{props.title}</h5>
          </a>
          <p className="px-6 mb-3 font-normal text-gray-700 dark:text-gray-400">{props.summary}</p>
          <div className='px-6 mt-2 github-badges'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        </div>
        <div className='px-6 pt-10 justify-self-end'>
          <a href={props.repoUrl} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:text-white hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 no-underline gap-2">
              See Code →
          </a>
        </div>
        {props.showcase && <span className="text-3xl text-sky-800 text-center p-0.5 leading-none rounded-full px-2 dark:text-sky-200 absolute -translate-y-1/2 -translate-x-1/2 right-auto top-0 left-0">⭐</span>}
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
      <div className='flex flex-wrap justify-center p-5 gap-8'>
        {props.projects.map((project) => (
          <Project
            bannerUrl={project.bannerUrl}
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
        title, summary, repoUrl, iconUrl, bannerUrl, content, showcase
      } = getProjectBySlug(projectSlug.slug, [
        'title',
        'summary',
        'iconUrl',
        'bannerUrl',
        'repoUrl',
        'content',
        'showcase'
      ]);

      return {
        title,
        summary,
        repoUrl,
        bannerUrl: bannerUrl || null,
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
