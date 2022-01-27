import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__container">
      <img className="header__logo" src={headerLogo} alt="Логотип Место" />
    </header>
  );
}

export default Header;
