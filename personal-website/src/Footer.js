import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        <a href="https://www.linkedin.com/in/davidhimself/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        {' | '}
        <a href="https://github.com/KhachDavid" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {' | '}
        <a href="mailto:khachatryandavid1@gmail.com">
          Email
        </a>
      </p>
    </footer>
  );
}

export default Footer;
