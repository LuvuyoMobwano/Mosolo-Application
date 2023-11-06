import React from 'react';
import styled from "styled-components";
import MosoloLogo from '../../assets/Mosolologo.jpg';
import cashappimage from '../../assets/2ndimage.jpg';
import iconone from '../../assets/icon5.jpg';
import icontwo from '../../assets/icon4.jpg';
import iconthree from '../../assets/icon3.jpg';
import iconfour from '../../assets/icon2.jpg';
import iconfive from '../../assets/icon1.jpg';
import { useNavigate } from 'react-router-dom';


const theme = {
blue: {
    default:'turquoise',
    hover:'#7EF4CC'
    },

    pink: {
        default:'white',
        hover:'light gray' 
    },
}
const Button = styled.button`
background-color: ${props => theme[props.theme].default};
color:black;
padding:5px 15px;
border-radius:5px;
outline:0;
text-transform:uppercase;
cursor: pointer;
box-shadow:0px 2px 2px black;
&:hover {
    background-color: ${props => theme[props.theme].default};
}

`

Button.defaultProps = {
    theme: 'blue'
}

 function LandingPage(){

  const navigate = useNavigate();

    const styles = {
      main: {
    display: 'flex',
    justifycontent: 'center',
    alignitems: 'center',
    background: 'linear-gradient(to bottom right, #009999 30%, #000066 100%)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    },

    logo: {
          position:"absolute",
          bottom: "40%",
          right: "35%",
    },

    Button: {
          position:"absolute",
          bottom: "90%",
          right: "10%",
    },

        Button1: {
          position:"absolute",
          bottom: "90%",
          right: "3%",
    },

        cashapp:{
        position:"absolute",
        top: "15%",
        left: "58%",
        height: "350px",
        margin: "auto",
    },

    content:{
    position:"absolute",
    left:"50px",
    top:"100px",
    },

    

    p:{
        color:"white",
        fontSize: "40",
    },

    h1:{
    fontfamily:"sans-serif",

    spacing:"3px",

    fontSize: "80",

    weight:"10px",

    color:"white",

        },

    icon1:{
        position:"absolute",
        top: "57%",
        height: "200px",
        left: "3%",
        display: "inline-block",
    },
    
    icon2:{
        position: "absolute",
        top: "57%",
        height: "200px",
        left: "20%",
        display: "inline-block",
    },
      icon3:{
        position: "absolute",
        top: "57%",
        height: "200px",
        left: "35%",
        display: "inline-block",
    },
      icon4:{
        position: "absolute",
        top: "57%",
        height: "200px",
        left: "57%",
        display: "inline-block",
    },
      icon5:{
        position: "absolute",
        top: "57%",
        height: "200px",
        left: "78%",
        display: "inline-block",
    },
    
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the '/login' route
  };

  const handleSignupClick = () => {
    navigate('/signup'); // Navigate to the '/signup' route
  };


 


  return (
    <>
    <div className="main" style={styles.main}>

    
    <div className= "Button1" style={styles.Button1}>
    <Button onClick ={handleLoginClick}>
     login
    </Button>
    </div>
    <div className= "Button" style={styles.Button}>
    <Button theme="pink" onClick ={handleSignupClick}>
     Sign up
    </Button>
    </div>
    

        <div className="Logo" style={styles.logo}>
        <img src={MosoloLogo} alt="" />
        </div>

       <div className="cashapp" style={styles.cashapp}>
       <img src={cashappimage} alt="" />
       </div>

      <div className= "content" style={styles.content}>
      <h1 style={styles.h1}>A fintech company<br/> providing all your needs <br/>and more</h1>
      <p  style={styles.p}> <br/>Join us and access the following on the website </p>
      </div>
        
    
      <div className="icons">
       <div className="icon1" style={styles.icon1}>
        <img src={iconone} alt="" onClick={handleLoginClick} />
      </div>
       <div className="icon2" style={styles.icon2}>
        <img src={icontwo} alt="" onClick={handleLoginClick} />
      </div>
       <div className="icon3" style={styles.icon3}>
        <img src={iconthree} alt="" onClick={handleLoginClick} />
      </div>
       <div className="icon4" style={styles.icon4}>
        <img src={iconfour} alt="" onClick={handleLoginClick} />
      </div>
       <div className="icon5" style={styles.icon5}>
        <img src={iconfive} alt="" onClick={handleLoginClick} />
      </div>
      </div>
      </div>
    </>
  );
}

export default LandingPage;