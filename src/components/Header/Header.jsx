import React from 'react';
import { Link } from 'react-router-dom';

import './Header.sass';

const Header = () => (
  <header className="header">
    <Link to="/">
      <h1 className="header__title">Star Wars</h1>
    </Link>
    <span>// By Remco Tak</span>
  </header>
);

export default Header;
