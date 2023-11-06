import React from 'react'
import { LiaFacebook} from "react-icons/fa";
import { Link } from 'react-router-dom'; // Import Link from React Router
import instagram from "../../assets/instagram.jpg"
import Facebook from "../../assets/Facebook.jpg"
import twitter from "../../assets/twitter.jpg"

const contact = () => {
    const styles ={
        buttonstyleone:{
          position: 'absolute',
          border: '2px solid black',
          width:'300px',
          height:'70px',
          font:'Sans Serif',
          top:'35%',
          left:'10%',
          backgroundColor:'#041018',
          color:"white"
    
    
        },
          buttonstyletwo:{
    
          position: 'absolute',
          border: '2px solid black',
          width:'300px',
          height:'120px',
          font:'Sans Serif',
          top:'46%',
          left:'10%',
    
        },
          buttonstylethree:{
          position: 'absolute',
          border: '2px solid black',
          width:'300px',
          height:'120px',
          font:'Sans Serif',
          top:'65%',
          left:'10%',
    
        },
    
          buttonstylefour:{
          position: 'absolute',
          border: '2px solid black',
          width:'300px',
          height:'60px',
          font:'Sans Serif',
          top:'84%',
          left:'10%',
          backgroundColor:'#4cf1f1'
    
        },
    
        accounts:{
          color:'white',
          position:'absolute',
          top:'15%',
        },
      }
    
    
    
      return (
        <>
          
          <h1 style={styles.accounts}>Buy Now</h1>
          <div className="icons">
            {/* Wrap buttons with Link components */}
        
              <div className='buttonstyleone' style={styles.buttonstyleone}>
              <h2  style={{fontSize:"25px",position:"absolute",top:"30%",left:"30%"}}>
              Contact us
              </h2>
              
              </div>
            
    
              <div className='buttonstyletwo' style={styles.buttonstyletwo}>
               <h4 style={{fontSize:"15px",position:"absolute",top:"20%",left:"1%"}}>
              Phone
              </h4>
              <p style={{fontSize:"15px",position:"absolute",top:"40%",left:"1%"}}>
              +27 853456939
              </p>
              
              
              </div>
            
            
              <div className='buttonstylethree' style={styles.buttonstylethree}>
              <h4 style={{fontSize:"15px",position:"absolute",top:"20%",left:"1%"}}>
                Email 
              </h4>
              <p style={{fontSize:"15px",position:"absolute",top:"40%",left:"1%"}}>
                Mosolo@gmail.com 
              </p>
              
              </div>
              <div className='buttonstylefour' style={styles.buttonstylefour}>
              <p>
                Social 
                <img src={require('../../assets/Facebookrb.png')} alt='logo' style={{width:"50px",position:"absolute",left:"120px", bottom:"7%"}}/>
                <img src={require('../../assets/instagramrb.png')} alt='logo' style={{width:"50px",position:"absolute", left:"240Px", bottom:"7%"}}/>
                <img src={require('../../assets/twitterrb.png')} alt='logo' style={{width:"50px",position:"absolute",left:"180px", bottom:"7%"}}/>
              </p>
              
              </div>
              <div >
                <img src={require('../../assets/Mosolo.png')} alt='logo' style={{width:"400px",position:"absolute",right:"20%", bottom:"25%"}}></img>
              </div>
          </div>
          
       
        </>
      );
}

export default contact