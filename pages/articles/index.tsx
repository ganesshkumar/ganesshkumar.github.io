import React from 'react';

import { GetStaticProps } from 'next';

import { BlogGallery, IBlogGalleryProps } from '../../blog/BlogGallery';
import { Meta } from '../../containers/layout/Meta';
import { IPaginationProps } from '../../pagination/Pagination';
import { Main } from '../../containers/templates/Main';
import { Config } from '../../utils/Config';
import { getAllPosts } from '../../utils/Content';

const Index = (props: IBlogGalleryProps) => (
  <Main
    meta={(
      <Meta
        title="Articles"
        description={Config.description}
      />
    )}
    currentPage="Articles"
  >
    <div className='container mx-auto w-100 lg:w-2/3 2xl:w-1/2'>
      <p className="text-3xl my-2">
        <h1 className='font-bold text-3xl'>
          <span className='tracking-wide underline decoration-sky-500 decoration-4 underline-offset-2'>Articles</span>
        </h1>
      </p>
      <BlogGallery posts={props.posts} pagination={props.pagination} />
    </div>
  </Main>
);

export const getStaticProps: GetStaticProps<IBlogGalleryProps> = async () => {
  const posts = getAllPosts(['title', 'date', 'slug', 'tags']);
  const pagination: IPaginationProps = {};

  if (posts.length > Config.pagination_size) {
    pagination.next = '/page2';
  }

  return {
    props: {
      posts: posts, //.slice(0, Config.pagination_size),
      pagination: {}
    },
  };
};

export default Index;
