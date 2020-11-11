import React from 'react';

import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { Navbar } from '../navigation/Navbar';
import { Config } from '../utils/Config';

const Index = () => (
  <>
    <Meta title={Config.title} description={Config.description} />
    <div className="flex flex-col h-screen justify-center items-center text-gray-100 bg-gray-900">
      <div className="text-6xl font-bold">Ganessh Kumar R P</div>
      <div className="text-base font-bold">
        <Navbar>
          <li className="mr-6 underline">
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li className="mr-6 underline">
            <Link href="/notes">
              <a>Notes</a>
            </Link>
          </li>
          <li className="mr-6 underline">
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </Navbar>
      </div>
    </div>
  </>
);

export default Index;
