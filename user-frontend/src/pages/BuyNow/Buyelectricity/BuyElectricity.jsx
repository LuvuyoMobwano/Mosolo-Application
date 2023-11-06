import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGetUserID } from '../../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const BuyElectricity = () => {
  const userID = useGetUserID();

  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleBuyElectricity = () => {
    const electricityData = {
      meterNumber,
      amount,
    };

    setLoading(true);
    axios.post(`http://localhost:5050/transaction/purchase-electricity/${userID}`, electricityData)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setPin(response.data.pin); // Set the pin in the components state.
          enqueueSnackbar('Electricity Purchase Successful.', { variant: 'success' });
          //navigate('/electricity-receipt');
        } else {
          enqueueSnackbar('Unexpected response from the server', { variant: 'error' });
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const errorMessage = error.response.data.error;
          enqueueSnackbar(errorMessage, { variant: 'error' });
        } else {
          // Network or other request-related errors
          enqueueSnackbar('Error: Unable to connect to the server.', { variant: 'error' });
        }
      });
  };

  const styles = {

    buttonstyletwo: {

      position: 'absolute',
      top: '90%',
      backgroundColor: '#003049',
      color: '#e9ecef',
      borderRadius: '10px',
      width: '200px',
      height: '45px',
      font: 'Sans Serif',
      top: '80%',
      right: '37%',
      color: 'white',

    },


    accounts: {
      color: 'white',
      position: 'absolute',
      top: '15%',
      left: '30%',
    },

    accountsone: {
      color: 'white',
      position: 'absolute',
      top: '54%',
      left: '30%',
    },

    accountstwo: {
      color: 'white',
      position: 'absolute',
      top: '35%',
      left: '30%',
    },

    accountsthree: {
      color: 'white',
      position: 'absolute',
      top: '30%',
      left: '30%',
    },

    accountsf: {
      color: 'black',
      position: 'absolute',
      top: '6%',
      left: '-70%',
    },

    accountsff: {
      color: 'black',
      position: 'absolute',
      top: '1%',
      left: '-70%',
    },
    inputtoken1: {
      backgroundColor: '#003049',
      color: '#e9ecef',
      fontSize: '1em',
      cursor: 'pointer',
      marginTop: '10px',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      position: 'absolute',
      top: '60%',
      right: '37%',
      width: '200px',
      height: '45px',

    },

    inputtoken2: {
      backgroundColor: '#003049',
      color: '#e9ecef',
      fontSize: '1em',
      cursor: 'pointer',
      marginTop: '10px',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      position: 'absolute',
      top: '35%',
      right: '37%',
      width: '200px',
      height: '45px',

    },
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
          width: '600px',
          background: 'linear-gradient(to bottom right, #009999 30%, #000066 100%)',
          top: '20%',
          left: '30%',
          borderRadius: '10%',
          border: '4px solid black',
        }}
      >
        <h1 style={styles.accounts}>Buy Electricity</h1>
        <p style={styles.accountsthree}>Enter the meter number</p>
        <label>
          <input
            type="text"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
            className="inputtoken2"
            style={styles.inputtoken2}
            placeholder="Enter Meter Number"
          />
        </label>
        
        <p style={styles.accountsone}>Enter the amount for purchase</p>
        <label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="inputtoken1"
            style={styles.inputtoken1}
            placeholder="E.g.- 20"
          />
        </label>

        {pin && (
          <div className="alert alert-success">
            Your PIN: {pin}
          </div>
        )}

        <button className="buttonstyletwo" onClick={handleBuyElectricity} style={styles.buttonstyletwo}>
          Purchase
        </button>
      </div>
    </div>
  );
}

export default BuyElectricity