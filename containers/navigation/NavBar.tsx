import classnames from 'classnames';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type INavbarProps = {
  currentPage: string;
  children: ReactNode;
};

const navbarContentClasses = (page: string, currentPage: string) =>
  classnames({ "mb-0 z-10": true, "text-slate-700": currentPage !== page, "font-semibold underline decoration-sky-500 underline-offset-2": currentPage === page })

const Navbar = (props: INavbarProps) => (
  <nav className="bg-white flex border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li className={navbarContentClasses('Home', props.currentPage)}>
            <Link href='/' passHref> 
              <div className='text-slate-900 cursor-pointer'> Home </div> 
            </Link>
          </li>
          <li className={navbarContentClasses('Articles', props.currentPage)}>
            <Link href='/articles' passHref>
              <div className='text-slate-900 cursor-pointer'> Articles </div>
            </Link>
          </li>
          <li className={navbarContentClasses('Projects', props.currentPage)}>
            <Link href='/projects' passHref>
              <div className='text-slate-900 cursor-pointer'> Projects </div>
            </Link>
          </li>
          {/* <li className={navbarContentClasses('Notes', props.currentPage)}>
            <Link href='/notes' passHref>
              <div className='text-slate-900 cursor-pointer'> Notes </div>
            </Link>
          </li> */}
          <li className={navbarContentClasses('About', props.currentPage)}>
            <Link href='/about' passHref>
              <div className='text-slate-900 cursor-pointer'> About </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)



export { Navbar };
