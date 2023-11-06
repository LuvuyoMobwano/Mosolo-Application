import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGetUserID } from '../../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const AirtimeReceipt = () => {
  const userID = useGetUserID();

  // Use state to store the amount and the pin
  const [pin, setPin] = useState('');

  useEffect(() => {
    fetchAirtimeReceipt().then(data => {
      setPin(data.pin);
    });
  }, []);

  const fetchAirtimeReceipt = async () => {
    // API call to fetch data
    try {
      const response = await axios.get(`http://localhost:5050/transaction/purchase-airtime/${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 0 }), // Find way to fill in actual amount
      });

      if (response.ok) {
        return response.json();
      }
      else {
        console.error('Failed to fetch airtime receipt data');
        return { amount: 'N/A', pin: 'N/A' };
      }
    }
    catch (error) {
      console.error('Failed to fetch airtime receipt data');
      return { amount: 'N/A', pin: 'N/A' };
    }
  };

  const styles = {
    styleHeading: {
      color: 'white',
      position: 'absolute',
      top: '15%',
      left: '16%',
    },
    styleButton: {
      height: "40px",
      width: "150px",
      borderRadius: "4px",
      padding: "0.5em 1em",
      fontSize: "1rem",
      background: "#003049",
      color: "#e9ecef",
      border: "none",
      cursor: "pointer",
      left: '10%',
      bottom: '20%',
    },
  };

  return (
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
      <h1 style={styles.styleHeading}>Airtime Purchase Receipt</h1>
      <div>
        <p>Pin: {pin} </p>
        <Link to={'/home'}>
          <button style={styles.styleButton}>Back Home</button>
        </Link>
      </div>
      <br />
    </div>
  )
}

export default AirtimeReceipt