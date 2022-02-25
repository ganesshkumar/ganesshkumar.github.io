import React from 'react';

import { format } from 'date-fns';
import Link from 'next/link';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { PostItems } from '../utils/Content';

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination: IPaginationProps;
};

const BlogGallery = (props: any) => (
  <>
    <ul className='my-5'>
      {props.posts.map((elt: any) => (
        <li key={elt.slug} className="mb-3 flex">
          <Link href="/blog/[slug]" as={`/blog/${elt.slug}`}>
            <a>
              <h2 className='text-xl text-slate-700 hover:text-sky-600 decoration-sky-600 hover:underline tracking-2'>{elt.title}</h2>
            </a>
          </Link>
          <div> -{elt.tags}- </div>
          <div className='ml-5 text-slate-400 font uppercase text-sm flex items-center'>{format(new Date(elt.date), 'LLL d, yyyy')}</div>
        </li>
      ))}
    </ul>

    <Pagination previous={props.pagination.previous} next={props.pagination.next} />
  </>
);

export { BlogGallery };
