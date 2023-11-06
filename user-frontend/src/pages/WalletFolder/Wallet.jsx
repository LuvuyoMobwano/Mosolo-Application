import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreditCard from '../../components/creditcard/creditcard';
import { useGetUserID } from '../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';
//import blackiconone from '../../assets/track.png';
//import blackicontwo from '../../assets/blackicon2.jpg';
//import blackiconthree from '../../assets/transferM.png';

const Wallet = () => {
  const userID = useGetUserID();

  const [walletData, setWalletData] = useState({
    cardNumber: '',
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch wallet data when the component mounts
    axios.get(`http://localhost:5050/transaction/wallet/${userID}`)
      .then((response) => {
        const { cardNumber, balance } = response.data.data;
        setWalletData({ cardNumber, balance });
        setLoading(false); // Set loading to false after successfully featching the data
      })
      .catch((error) => {
        setError(error);
        setLoading(false); // Set loading to false in case of an error
        console.log(error);
      });
  }, []);

  const styles = {
    content: {
      display: "flex",

    },
    compimage: {
      position: "absolute",
      top: "20%",
      left: "50%",
      height: "100%",
      width: "100%",
    },
    h1: {
      color: "black",
      fontSize: "50px",
      position: "absolute",
      top: "15%",
      right: "43%",
      style: "italic",

    },
    h2: {
      color: "black",
      fontSize: "40px",
      position: "absolute",
      top: "30%",
      left: "40%",
      style: "italic",

    },
    p: {
      color: "black",
      font: "30px",
      position: "absolute",
      top: "50%",
      left: "3%",
      style: "italic",
    },
    accountsf: {
      color: 'black',
      position: 'absolute',
      top: '10%',
      left: '1%',
    },
    accountsff: {
      color: 'black',
      position: 'absolute',
      top: '25%',
      left: '1%',
    },
    icon1: {

      position: "absolute",
      top: "75%",
      height: "200px",
      display: "inline-block",
      right: "55%",
    },
    icon2: {

      position: "absolute",
      top: "67%",
      height: "200px",
      display: "inline-block",
      right: "30%",

    },
    icon3: {
      position: "absolute",
      top: "75%",
      height: "200px",
      display: "inline-block",
      right: "45%",

    },

    Into: {

      position: "absolute",
      height: "200px",
      display: "inline-block",
      left: "45%",
      top: "50%"

    },

  }

  return (

    <>
      <div className="Into" style={styles.Into}>
        <h1>Wallet</h1>

        <h3>Card Number: {walletData.cardNumber}</h3>
        <h3>Balance: R{walletData.balance.toFixed(2)}</h3>
      </div>

      <div className="content" style={styles.content}>
        <CreditCard
          cardNumber={walletData.cardNumber}
          Balance={walletData.balance.toFixed(2)}
        />
      </div>



      {/*<div className="icons">


        <Link to="/route-for-icon1">
          <div className="icon1" style={styles.icon1}>
            <img src={blackiconone} alt="" />
          </div>
        </Link>
        <Link to="/BuyAirtime">
          <div className="icon2" style={styles.icon2}>
            <img src={blackicontwo} alt="" />
          </div>
        </Link>
        <Link to="/Tranfermoney">
          <div className="icon3" style={styles.icon3}>
            <img src={blackiconthree} alt="" />
          </div>
        </Link>
      </div>*/}
    </>
  );
}

export default Wallet