import React from 'react';

import { Content } from '../content/Content';
import { Meta } from '../containers/layout/Meta';
import { Main } from '../containers/templates/Main';
import SocialLinks from '../components/social-links';

const About = () => (
  <Main meta={<Meta title="About me" description="About me" />} currentPage="About">
    <Content className='whitespace-pre-line'>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src="https://avatars.githubusercontent.com/u/2135089" alt='profile picture' />
        </div>
      </div>
      <p className="text-xl">Hello and welcome to my blog!</p>
      <p className="pt-6">My name is Ganessh Kumar and I am a software engineer at Microsoft. I work on Microsoft Teams, a platform that enables collaboration and communication for millions of users around the world. I love creating solutions that make people&apos;s lives easier and more productive.</p>
      <p className="pt-6">In my free time, I enjoy building plugins for Obsidian, a powerful knowledge base that works on top of a local folder of plain text Markdown files. Obsidian is an amazing tool for note-taking, writing, and learning. I have created several plugins that enhance the functionality of Obsidian, such as:</p>
        <a className="after:content-['_↗']" href="https://github.com/ganesshkumar/obsidian-excel-to-markdown-table" target="_blank" rel="noreferrer">
          <span className="underline text-blue-600">Obsidian Excel to Markdown table</span>
        </a>,&nbsp;
        <a className="underline text-blue-600 after:content-['_↗']" href="https://github.com/ganesshkumar/obsidian-table-editor" target="_blank" rel="noreferrer">
        <span className="underline text-blue-600">Obsidian Markdown Table Editor</span>
        </a>,&nbsp;
        <a className="underline text-blue-600 after:content-['_↗']" href="https://github.com/ganesshkumar/obsidian-plugins-stats-ui" target="_blank" rel="noreferrer">
        <span className="underline text-blue-600">Obsidian Plugin Stats</span>
        </a>.
      <p className="pt-6">You can find all my plugins on the Obsidian community hub or on my [GitHub page](https://github.com/ganesshkumar). I hope you find them useful and feel free to give me feedback or suggestions.</p>
      <p className="pt-6">On this blog, I will share my thoughts and experiences on software development, Obsidian, and other topics that interest me. I hope you enjoy reading my posts and learn something new along the way. Thank you for visiting and stay tuned for more!</p>
      <p className="pt-6">
        Social Media: &nbsp;
        <SocialLinks />
      </p>
    </Content>
  </Main>
);

export default About;
