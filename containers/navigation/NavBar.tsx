import React, { ReactNode } from 'react';

type INavbarProps = {
  children: ReactNode;
};

const Navbar = (props: INavbarProps) => (
  <ul className="navbar flex flex-wrap justify-center align-center items-center space-x-8 text-xl list-none">{props.children}</ul>
);

export { Navbar };
