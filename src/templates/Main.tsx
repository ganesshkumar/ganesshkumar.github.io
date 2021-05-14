import React, { ReactNode } from 'react';

import Link from 'next/link';

import { Navbar } from '../navigation/Navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700">
    {props.meta}

    <div className="container mx-auto">
      <div className="border-b border-gray-300">
        <div>
          <Navbar>
            <li className="mr-6">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/notes">
                <a>Notes</a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/quotes">
                <a>Quotes</a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </Navbar>
        </div>
      </div>

      <div className="text-xl py-5">{props.children}</div>

      <div className="border-t border-gray-300 text-center py-8">
        Ganessh Kumar R P © 2020 • All rights reserved.
      </div>
    </div>
  </div>
);

export { Main };
