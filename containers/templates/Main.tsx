import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useTheme } from '@nextui-org/react'
import { Navbar } from '../navigation/NavBar';
import { useTheme as useNextTheme } from 'next-themes'
import classnames from 'classnames';
import { env } from 'process';

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
  'About': '/about'
}

const navbarContentClasses = (page: string, currentPage: string) =>
  classnames({ "mb-0 mx-auto z-10": true, "text-slate-700": currentPage !== page, "text-sky-500 font-semibold underline decoration-sky-500 underline-offset-2": currentPage === page })

const ThemeSetter = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <li className="mb-0 mx-auto z-10 cursor-pointer">
      {isDark ? 
        <i className='bx bx-sun' onClick={_ => setTheme('light')}></i> : 
        <i className='bx bx-moon' onClick={_ => setTheme('dark')}></i>}
    </li>  
  );
}

const Main = (props: IMainProps) => {
  return (
    <div className="min-h-screen flex flex-col antialiased w-full z-50">
      {props.meta}

      <div className="border-b border-gray-300 py-5 px-2">
        <div className="container mx-auto w-100 lg:w-1/2 xl:1/3">
          <Navbar>
            {Object.keys(navbarContent).map(k => {
              return (
                <li key={k} className={navbarContentClasses(k, props.currentPage)}>
                  <Link href={navbarContent[k] || '/'}>
                    {k}
                  </Link>
                </li>
              )
            })}
            <ThemeSetter />
          </Navbar>
        </div>
      </div>

      <div className="container mx-auto w-100 lg:w-2/3 xl:1/3 grow">{props.children}</div>

      {env.NODE_ENV !== 'production' &&
        <div>
          <span className='md:hidden'>sm</span>
          <span className='lg:hidden'>md</span>
          <span className='xl:hidden'>lg</span>
          <span className='2xl:hidden'>xl</span>
          <span>2xl</span>
        </div>
      }

      <div className="bg-gray-800 text-center py-8">
        <div className="container w-100 lg:w-1/2 xl:1/3 text-slate-200">
          Ganessh Kumar R P © 2022 • All rights reserved.
        </div>
      </div>
    </div>
  );
}

export { Main };
