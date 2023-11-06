import React from 'react';
import { Link } from 'react-router-dom';

import talkingimageapp from '../../assets/person.png';

const About = () => {

const styles = {

  Talkingimage:{
      position:"absolute",
      top:"37%",
      left:"20%",
      height:"100%",
      width:"100%",


  },
  headingone:{
      position:"absolute",
      top:"30%",
      left:"20%",
      fontSize:40,


  },
    paragraph:{
  
      position:"absolute",
      top:"55%",
      left:"20%",
      fontSize:30,
  

    },
     heading:{
  
      position:"absolute",
      top:"48%",
      left:"20%",
      fontSize:40,
    },
    




  }

  return (
    <>
      <h1 className="headingone" style={styles.headingone}>About</h1>


       <div className="Talkingimage" style={styles.Talkingimage}>
       <img src={talkingimageapp} alt="" />
       </div>

      <h1 className="heading "style={styles.heading}>Mission</h1>
      <p className="paragraph" style={styles.paragraph}>Mosolo is a new company that was started 
      <br/>with aim of providing affordable financial 
      <br/>services in the Democratic Republic of the
      <br/> Congo, and as time moves on, to other
      <br/>African countries as well  </p>

      </>
  );
};

export default About;
