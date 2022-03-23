import React, { ReactNode } from 'react';
import { Navbar } from '../navigation/NavBar';
import { env } from 'process';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  currentPage: string;
};

const Main = (props: IMainProps) => {
  return (
    <div className="min-h-screen flex flex-col antialiased w-full z-50">
      {props.meta}

      <div className="py-5 px-2">
        <div className="container mx-auto w-100 lg:w-2/3 2xl:w-1/2">
          <Navbar currentPage={props.currentPage}>
            {/* <ThemeSetter /> */}
          </Navbar>
        </div>
      </div>

      <div className="">
        {props.children}
      </div>

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
        <div className="container w-100 lg:w-2/3 xl:1/2 text-slate-200">
          Ganessh Kumar R P © 2022 • All rights reserved.
        </div>
      </div>
    </div>
  );
}

export { Main };
