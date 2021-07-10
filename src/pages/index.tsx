import React from 'react';

import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { Navbar } from '../navigation/Navbar';
import { Config } from '../utils/Config';

const Index = () => (
  <>
    <Meta title={Config.title} description={Config.description} />
    <div className="min-h-screen bg-cultured py-6 flex flex-col justify-center sm:py-12 bg-gray-100">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="flex flex-col justify-center items-center text-gray-700">
          <img src="assets/images/caricature-square.png" alt="carcature" className="w-36 shadow-md rounded-full bg-white" />
          <div className="text-3xl py-5 font-bold">Ganessh Kumar R P</div>
          <Navbar>
            <li className="rounded px-3 py-1 ml-3 my-1 cursor-pointer shadow-md bg-white transition duration-500 transform hover:scale-110">
              <Link href="/blog">
                <a>✏️Blog</a>
              </Link>
            </li>
            <li className="rounded px-3 py-1 ml-3 my-1 cursor-pointer shadow-md bg-white transition duration-500 transform hover:scale-110">
              <Link href="/projects">
                <a>🗂️Projects</a>
              </Link>
            </li>
            <li className="rounded px-3 py-1 ml-3 my-1 cursor-pointer shadow-md bg-white transition duration-500 transform hover:scale-110">
              <Link href="/about">
                <a>👨‍💻About</a>
              </Link>
            </li>
          </Navbar>
        </div>
      </div>
    </div>
  </>
);

export default Index;
