import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Navbar } from '../navigation/Navbar';
import classnames from 'classnames';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  currentPage: string;
};

const navbarContent: {
  [key: string]: string
} = {
  'Home': '/',
  'Blog': '/blog',
  'Projects': '/projects',
  'Notes': '/notes',
  'Quotes': '/quotes',
  'About': '/about'
}

const navbarContentClasses = (page: string, currentPage: string) =>
  classnames({ "mr-6": true, "text-gray-400": currentPage != page, "text-brunswick-green font-bold": currentPage === page })

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700">
    {props.meta}

    <div className="border-b border-gray-300 py-5 px-2">
      <div className="container mx-auto">
        <Navbar>
          {Object.keys(navbarContent).map(k => {
            return (
              <li key={k} className={navbarContentClasses(k, props.currentPage)}>
                <Link href={navbarContent[k] || '/'}>
                  <a>{k}</a>
                </Link>
              </li>
            )
          })}
        </Navbar>
      </div>
    </div>

    <div className="text-xl container mx-auto">{props.children}</div>

    <div className="border-t border-gray-300 text-center text-white py-8 bg-polished-pine">
      <div className="container mx-auto">
        Ganessh Kumar R P © 2020 • All rights reserved.
      </div>
    </div>
  </div>
);

export { Main };
