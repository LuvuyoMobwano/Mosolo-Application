import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#333',
      color: '#fff',
      padding: '2rem',
      textAlign: 'center',
      position: 'bottom',
      left: 0,
      bottom: '0',
      width: '100%'
    }} >
      {/* Footer content */}
      &copy; {new Date().getFullYear()} Copy rights reserved to Mosolo
    </footer>
  );
};

export default Footer;





