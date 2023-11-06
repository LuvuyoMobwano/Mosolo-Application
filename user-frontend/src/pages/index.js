import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import compappimage from '../assets/computer.jpg';
import blackiconone from '../assets/blackicon1.jpg';
import blackicontwo from '../assets/blackicon2.jpg';
import blackiconthree from '../assets/blackicon3.jpg';
import blackiconfour from '../assets/blackicon4.jpg';
import blackiconfive from '../assets/blackicon5.jpg';
import blackiconsix from '../assets/blackicon7.jpg';

const Home = () => {

  const styles = {
    content:{
      display:"flex",

    },

    compimage:{
      position:"absolute",
      top:"20%",
      left:"50%",
      height:"100%",
      width:"100%",
    },

  
    h1:{
    color:"black",
    fontSize: "50px",
    position: "absolute",
    top: "15%",
    left:"3%",
    style: "italic",

    },

    h2:{
    color:"black",
    fontSize: "40px",
    position: "absolute",
    top: "30%",
    left:"3%",
    style: "italic",

    },

    p:{
    color:"black",
    font: "30px",
    position: "absolute",
    top: "50%",
    left:"3%",
    style: "italic",

      

    },

    icon1:{
    
      position:"absolute",
      top: "55%",
      height: "200px",
      display: "inline-block",
      right: "85%",
    },
      icon2:{
        
        position:"absolute",
        top: "55%",
        height: "200px",
        display: "inline-block",
        right: "75%",

    },
       icon3:{
        position:"absolute",
        top: "55%",
        height: "200px",
        display: "inline-block",
        right: "60%",

    },

      icon4:{

        position:"absolute",
        top: "70%",
        height:"200px",
        right: "85%",
        display: "inline-block",

    },
      icon5:{
        position:"absolute",
        top: "70%",
        height:"200px",
        right: "75%",
        display: "inline-block",
    },

      icon6:{
        position:"absolute",
        top: "70%",
        height:"200px",
        right: "60%",
        display: "inline-block",

    },

  }

  return (
    
     <>
      <div className= "content" style={styles.content}>
      <h1 style={styles.h1}>WELCOME TO MOSOLO</h1>
      <h2 style={styles.h2}>A fintech company<br/> providing all your needs <br/>and more</h2>
      <p  style={styles.p}> <br/>what would you like to access today</p>
      </div>

      <div className="compimage" style={styles.compimage}>
       <img src={compappimage} alt="" />
       </div>

      <div className="icons">
        {/* Use Link components instead of divs */}
        <Link to="/accountmenu" className="icon1" style={styles.icon1}>
          <img src={blackiconone} alt="" />
        </Link>
        <Link to="/BuyAirtime" className="icon2" style={styles.icon2}>
          <img src={blackicontwo} alt="" />
        </Link>
        <Link to="/Tranfermoney" className="icon3" style={styles.icon3}>
          <img src={blackiconthree} alt="" />
        </Link>
        <Link to="/Withdraw" className="icon4" style={styles.icon4}>
          <img src={blackiconfour} alt="" />
        </Link>
        <Link to="/Walletmenu" className="icon5" style={styles.icon5}>
          <img src={blackiconfive} alt="" />
        </Link>
        <Link to="/PayBen" className="icon5" style={styles.icon6}>
          <img src={blackiconsix} alt="" />
        </Link>
      </div>
    </>
  );
};

export default Home;



