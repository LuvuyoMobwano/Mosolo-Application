import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGetUserID } from '../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const PayBeneficiary = () => {
  const userID = useGetUserID();

  const [beneficiaryCardNumber, setBeneficiaryCardNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const handlePayBeneficiary = () => {
    const paymentData = {
      beneficiaryCardNumber,
      amount,
    };

    setLoading(true);
    axios.post(`http://localhost:5050/transaction/pay-beneficiary/${userID}`, paymentData)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          enqueueSnackbar('Payment to beneficiary successful', { variant: 'success' }); 
          navigate('/home'); 
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

    flex: {
      display: 'flex',
      gap: '1em',
      flexDirection: 'column',
      flexWrap: 'wrap',

    },

    input: {
      backgroundColor: '#003049',
      color: '#e9ecef',
      fontSize: '1em',
      cursor: 'pointer',
      marginTop: '10px',
      width: '280px',
      height: '40px',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
    },

    tagone: {
      color: 'white',
      position: 'absolute',
      top: '5%',
    },

    btn: {
      backgroundColor: '#003049',
      color: '#e9ecef',
      fontSize: '1em',
      cursor: 'pointer',
      marginTop: '10px',
      width: '150px',
      height: '30px',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '40px',
      position: 'absolute',
      top: '400px',
      left: '150px',
      alignContent: 'centre',
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
          height: '500px',
          width: '500px',
          background: 'linear-gradient(to bottom right, #009999 30%, #000066 100%)',
          top: '10%',
          left: '30%',
          borderRadius: "10%",
          border: '4px solid black',
        }
        }
      >
        <h1 style={styles.tagone}>Pay Beneficiary</h1>

        <div className='flex' style={styles.flex} >
          <input 
          type="text" 
          value={beneficiaryCardNumber}
          onChange={(e) => setBeneficiaryCardNumber(e.target.value)}
          placeholder='Beneficiary card number' 
          style={styles.input} 
          />
          <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Amount' 
          style={styles.input} 
          />
          <button className='btn' style={styles.btn} onClick={handlePayBeneficiary}>Transfer</button>
        </div>


      </div>
    </div>
  )
}

export default PayBeneficiary