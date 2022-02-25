import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');
const projectsDirectory = join(process.cwd(), '_projects');

export type PostItems = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  disqus: boolean;
  tags: string[];
  categories: string[];
  thumbnail: string;
  slug: string;
  content: string;
};

export type ProjectItems = {
  title: string;
  summary: string;
  repoUrl: string;
  showcase: boolean;
  order: number;
  content: string;
  slug: string;
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const items: PostItems = {
    title: '',
    description: '',
    date: '',
    modified_date: '',
    image: '',
    disqus: false,
    tags: [],
    categories: [],
    thumbnail: '',
    slug: '',
    content: '',
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }

    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      (items as any)[field] = data[field];
    }
  });

  return items;
}

export function getProjectBySlug(slug: string, fields: string[] = []): ProjectItems {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(projectsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const items: ProjectItems = {
    title: '',
    summary: '',
    repoUrl: '',
    showcase: false,
    order: 0,
    content: '',
    slug: ''
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }

    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      (items as any)[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllProjects(fields: string[] = []) {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((project1, project2) => (project1.order < project2.order ? 1 : -1));

  return projects;
}

export function getShowcaseProjects(fields: string[] = []) {
  if (!fields.includes('showcase')) {
    fields.push('showcase');
  }

  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug, fields))
    .filter(project => project.showcase)
    .sort((project1, project2) => (project1.order < project2.order ? 1 : -1));
  
  return projects;
}
