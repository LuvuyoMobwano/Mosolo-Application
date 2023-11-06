import React from 'react';

const Services = () => {

  const styles ={
    buttonstyleone:{
      position: 'absolute',
      border: '2px solid white',
      borderRadius:'7%',
      width:'200px',
      height:'45px',
      font:'Sans Serif',
      top:'30%',

    },
      buttonstyletwo:{

      position: 'absolute',
      border: '2px solid white',
      borderRadius:'7%',
      width:'200px',
      height:'45px',
      font:'Sans Serif',
      top:'45%',

    },
      buttonstylethree:{
      position: 'absolute',
      border: '2px solid white',
      borderRadius:'7%',
      width:'200px',
      height:'45px',
      font:'Sans Serif',
      top:'60%',

    },
    accounts:{
      color:'white',
      position:'absolute',
      top:'15%',
    },
  }

  return (
    <div
      style={{
        display: 'flex',
        position:'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height :'400px',
        width:'400px',
        background:'linear-gradient(to bottom right, #009999 30%, #000066 100%)',
        top:'20%',
        left:'30%',
        borderRadius: "10%",
        border:'4px solid black',
      }}
      >
      <h1 style={styles.accounts}>ACCOUNTS</h1>
      <button className='buttonstyleone' style={styles.buttonstyleone}>My profile </button>
      <button className='buttonstyletwo' style={styles.buttonstyletwo}>settings </button>
      <button className='buttonstylethree' style={styles.buttonstylethree}>Log out</button>
    </div>
  );
};

export default Services;
