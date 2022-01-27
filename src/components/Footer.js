import React from 'react';

function Footer() {
  return (
    <footer className="footer page__container">
      <p className="footer__copyright">&copy; {new Date().getFullYear()} Mesto-React Russia</p>
    </footer>
  );
}

export default Footer;
