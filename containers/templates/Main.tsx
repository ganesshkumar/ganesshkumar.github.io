import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useTheme } from '@nextui-org/react'
import { Navbar } from '../navigation/NavBar';
import { useTheme as useNextTheme } from 'next-themes'
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
  'About': '/about'
}

const navbarContentClasses = (page: string, currentPage: string) =>
  classnames({ "mb-0 mx-auto z-10": true, "text-gray-400": currentPage != page, "font-bold": currentPage === page })

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
    <div className="h-screen flex flex-col antialiased w-full text-gray-700 z-50">
      {props.meta}

      <div className="border-b border-gray-300 py-5 px-2">
        <div className="container mx-auto w-100 lg:w-1/3">
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

      <div className="container mx-auto w-100 lg:w-1/3 grow">{props.children}</div>

      <div className="border-t border-gray-300 text-center py-8">
        <div className="container mx-auto w-100 lg:w-1/3">
          Ganessh Kumar R P © 2022 • All rights reserved.
        </div>
      </div>
    </div>
  );
}

export { Main };
