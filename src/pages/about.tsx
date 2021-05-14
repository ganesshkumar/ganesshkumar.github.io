import React from 'react';

import { Content } from '../content/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const About = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />} currentPage="About">
    <Content>
      <p className="text-3xl">About me</p>
      <p>
        I&apos;m a Full Stack Engineer and a Machine Learning enthusiast. I love everything about
        computer science, maths and physics. Currently playing with docker, chatbots and audrino.
      </p>
      <p>
        Social Media: &nbsp;
        <a href="https://twitter.com/ganesshkumar" target="_blank" rel="noreferrer">
          Twitter
        </a>
        {' '}
        - &nbsp;
        <a href="https://github.com/ganesshkumar" target="_blank" rel="noreferrer">
          Github
        </a>
        {' '}
        - &nbsp;
        <a href="https://gitlab.com/ganesshkumar" target="_blank" rel="noreferrer">
          Gitlab
        </a>
      </p>
    </Content>
  </Main>
);

export default About;
