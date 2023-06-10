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
        <li key={elt.slug} className="mb-5">
          <Link href="/articles/[slug]" as={`/articles/${elt.slug}`}>
            <a className='no-underline'>
              <div className='text-xl text-slate-700 hover:text-sky-600 decoration-sky-600 hover:underline tracking-2'>{elt.title}</div>
            </a>
          </Link>
          <div className='flex space-x-4'>
            <div className='text-slate-400 font uppercase text-sm flex items-center'>{format(new Date(elt.date), 'LLL d, yyyy')}</div>
            <div className='text-slate-400 font-semibold uppercase text-xs pt-1'> {elt.tags.join(', ')} </div>
          </div>
        </li>
      ))}
    </ul>

    <Pagination previous={props.pagination.previous} next={props.pagination.next} />
  </>
);

export { BlogGallery };
