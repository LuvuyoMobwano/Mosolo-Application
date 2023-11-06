import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from React Router
import compappimage from '../../assets/computer.jpg';
import blackiconone from '../../assets/blackicon1.jpg';
import blackicontwo from '../../assets/blackicon2.jpg';
import blackiconfive from '../../assets/blackicon5.jpg';
import blackiconsix from '../../assets/blackicon7.jpg';

const Home = ({ hasFooter }) => {
  const styles = {
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      background: 'linear-gradient(to bottom, rgba(168,168,168,1) 0%,rgba(168,168,168,1) 55%,rgba(168,168,168,1) 55%,rgba(168,168,168,1) 55%,rgba(168,168,168,1) 55%,rgba(170,170,170,1) 55%,rgba(170,170,170,1) 55%,rgba(168,168,168,1) 55%,rgba(168,168,168,1) 56%,rgba(214,214,214,1) 76%,rgba(224,224,224,1) 84%)',
      minHeight: '80vh',
      padding: '1rem',
      paddingBottom: '6rem',
      boxSizing: 'border-box',

    },
    header: {
      color: '#333',
      fontSize: '3rem',
      fontStyle: 'italic',
      margin: '1rem 0',
    },
    subHeader: {
      color: '#333',
      fontSize: '2rem',
      fontStyle: 'italic',
      margin: '1rem 0',
    },
    description: {
      color: '#333',
      fontSize: '1.5rem',
      fontStyle: 'italic',
      margin: '1rem 0',
    },
    compImage: {
      width: '80%',
      maxWidth: '600px',
      height: 'auto',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '50px',
      marginBottom: '1rem',
    },
    icons: {
      display: 'flex',
      flexDirection: 'row', // Change 'horizontal' to 'row'
      justifyContent: 'space-between', // Add this property
      gap: '2rem',
      margin: '5rem 0',
    },
    iconLink: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '150px',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'white',
      textDecoration: 'none',
      color: '#333',
      transition: 'transform 0.3s ease-in-out',
      marginBottom: '1rem',
    },
    iconImage: {
      width: '150px',
      height: '150px',
      objectFit: 'cover',
      // marginBottom: '1rem',
    },
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '2rem',
      textAlign: 'center',
      position: 'absolute',
      left: 0,
      bottom: '0',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>WELCOME TO MOSOLO</h1>
      <h2 style={styles.subHeader}>A fintech company providing all your needs and more</h2>
      <p style={styles.description}>What would you like to access today?</p>

      <img src={compappimage} alt="Computer" style={styles.compImage} />

      <div className="icons" style={styles.icons}>
        <Link to="/display-account" className="icon1" style={styles.iconLink}>
          <img src={blackiconone} alt="" style={styles.iconImage} />
          <p>Access Account</p>
        </Link>
        <Link to="/buy-options" className="icon2" style={styles.iconLink}>
          <img src={blackicontwo} alt="" style={styles.iconImage} />
          <p>Buy Options</p>
        </Link>
        <Link to="/wallet" className="icon5" style={styles.iconLink}>
          <img src={blackiconfive} alt="" style={styles.iconImage} />
          <p>Wallet</p>
        </Link>
        <Link to="/pay-beneficiary" className="icon6" style={styles.iconLink}>
          <img src={blackiconsix} alt="" style={styles.iconImage} />
          <p>Pay Beneficiary</p>
        </Link>
      </div>
      {/* ... your Home page content ... */}
      {hasFooter && (
        <footer>
          <div style={styles.footer}>
        <h3>Our Policies</h3>
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
        <p>Refund Policy</p>
        </div>
        </footer>
      )}
    </div>
  );
}

export default Home