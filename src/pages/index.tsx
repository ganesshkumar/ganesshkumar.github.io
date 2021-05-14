import React from 'react';

import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { Navbar } from '../navigation/Navbar';
import { Config } from '../utils/Config';

const Index = () => (
  <>
    <Meta title={Config.title} description={Config.description} />
    <div className="min-h-screen bg-cultured py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-lignt-blue-400 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="flex flex-col justify-center items-center text-gray-700">
            <div className="text-3xl font-bold">Ganessh Kumar R P</div>
            <div className="text-base py-2">
              <Navbar>
                <li className="mr-6 underline">
                  <Link href="/blog">
                    <a>Blog</a>
                  </Link>
                </li>
                <li className="mr-6 underline">
                  <Link href="/projects">
                    <a>Projects</a>
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
        </div>
      </div>
    </div>
  </>
);

export default Index;
