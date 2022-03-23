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
  <ul className="navbar flex flex-wrap justify-center align-center items-center space-x-8 text-xl list-none">
    <li className={navbarContentClasses('Home', props.currentPage)}>
      <Link href='/'> 
        <div className='text-slate-900 cursor-pointer'> Home </div> 
      </Link>
    </li>
    <li className={navbarContentClasses('Articles', props.currentPage)}>
      <Link href='/articles'>
        <div className='text-slate-900 cursor-pointer'> Articles </div>
      </Link>
    </li>
    <li className={navbarContentClasses('Projects', props.currentPage)}>
      <Link href='/projects'>
        <div className='text-slate-900 cursor-pointer'> Projects </div>
      </Link>
    </li>
    <li className={navbarContentClasses('Notes', props.currentPage)}>
      <Link href='/notes'>
        <div className='text-slate-900 cursor-pointer'> Notes </div>
      </Link>
    </li>
    <li className={navbarContentClasses('About', props.currentPage)}>
      <Link href='/about'>
        <div className='text-slate-900 cursor-pointer'> About </div>
      </Link>
    </li>
  </ul>
);

export { Navbar };
