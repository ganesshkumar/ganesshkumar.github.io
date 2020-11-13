import React from 'react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

type IProjectProps = {
  title: string;
  url: string;
  description: string;
  content: string;
};

const Project = (props: IProjectProps) => (
  <div>
    <span>
      <a className="underline" href={props.url}>
        {props.title}
      </a>
    </span>
    <span>{props.description}</span>
    <p>{props.content}</p>
  </div>
);

const Projects = () => (
  <Main meta={<Meta title="Projects" description="Here are some of my hobby projects" />}>
    <h1 className="text-center font-bold text-3xl text-gray-900">Projects</h1>
    <Project title="T" url="u" description="d" content="c" />
  </Main>
);

export default Projects;
