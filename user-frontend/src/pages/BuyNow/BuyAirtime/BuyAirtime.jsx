import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGetUserID } from '../../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const BuyAirtime = () => {
  const userID = useGetUserID();

  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleBuyAirtime = () => {
    const purchaseData = {
      amount: parseInt(amount),
    };

    setLoading(true);
    axios.post(`http://localhost:5050/transaction/purchase-airtime/${userID}`, purchaseData)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setPin(response.data.pin); // Set the pin in the components state. 
          enqueueSnackbar('Airtime Purchase Successful.', { variant: 'success' });
          //navigate('/home'); // navigate('/airtime-receipt');
          setAmount('');
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
    styleHeading: {
      color: 'white',
      position: 'absolute',
      top: '15%',
      left: '30%',
    },
    styleParagraph: {
      color: 'white',
      position: 'absolute',
      top: '38%',
      left: '30%',
    },
    styleAmountInput: {
      backgroundColor: '#003049',
      color: '#e9ecef',
      fontSize: '1em',
      cursor: 'pointer',
      marginTop: '10px',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      position: 'absolute',
      top: '48%',
      right: '37%',
      width: '200px',
      height: '45px',
    },
    stylePurchaseButton: {
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
        <h1 style={styles.styleHeading}>Buy Airtime</h1>
        <p style={styles.styleParagraph}>Enter the amount for purchase</p>
        <label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="styleAmountInput"
            style={styles.styleAmountInput}
            placeholder="E.g. - 20"
          />
        </label>

        {pin && (
          <div className="alert alert-success">
            Your PIN: {pin}
          </div>
        )}

        <button className="stylePurchaseButton" style={styles.stylePurchaseButton} onClick={handleBuyAirtime}>
          Purchase
        </button>
      </div>
    </div>
  );
};

export default BuyAirtime