import React from 'react';
import { GetStaticProps } from 'next';
import { Text } from '@nextui-org/react';

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
  const iconUrl = props.iconUrl ? props.iconUrl :
                    props.repoUrl.includes("github") ? 'https://github.githubassets.com/images/modules/logos_page/Octocat.png' :
                    ''
  return (
    <div className='my-5'>
      <div className='my-5 flex-col'>
        <div className='flex flex-wrap items-end'>
          <h2 className="text-2xl mr-3">{props.title}</h2>
          <h3 className="text-gray-400">{props.summary}</h3>
        </div>
        <div className='flex mt-3'>
          <div className='w-1/3 grow-0'>
            {/* <Image src={iconUrl} alt={props.title} width={100} height={100} /> */}
            <img className="object-cover w-16 md:w-32 lg:w-48" src={iconUrl} />
          </div>
          <div className='w-2/3 ml-3'>
            <div className='mt-2'
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: props.content }}
            />
            <div className='mt-3'>
              <a className="cursor-pointer text-base" href={props.repoUrl} target="_blank" rel="noreferrer">
                <Text size={16} color='primary'>Repo Link</Text>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Projects = (props: IProjectsProps) => (
  <Main meta={<Meta title="Projects" description="Here are some of my hobby projects" />} currentPage="Projects">
    <Content>
      <p className="text-3xl my-2">
        <Text h1 size={30} weight="bold"
            css={{
              textGradient: '45deg, $blue500 -20%, $pink500 50%'
            }}>
          Projects
        </Text>
      </p>
      <div className='flex-col divide-y'>
        {props.projects.map((project) => (
          <Project
            key={project.title}
            title={project.title}
            repoUrl={project.repoUrl}
            iconUrl={project.iconUrl}
            summary={project.summary}
            content={project.content}
          />
        ))}
      </div>
    </Content>
  </Main>
);

export const getStaticProps: GetStaticProps<IProjectsProps> = async () => {
  const projectSlugs = getAllProjects(['slug', 'order']);

  const projects = await Promise.all(
    projectSlugs.map(async (projectSlug, idx) => {
      const {
        title, summary, repoUrl, iconUrl, content,
      } = getProjectBySlug(projectSlug.slug, [
        'title',
        'summary',
        'iconUrl',
        'repoUrl',
        'content',
      ]);

      return {
        title: `${idx + 1}. ${title}`,
        summary,
        repoUrl,
        iconUrl: iconUrl || null,
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
