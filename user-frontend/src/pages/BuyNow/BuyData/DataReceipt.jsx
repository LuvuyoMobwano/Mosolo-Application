import React, { useState, useEffect } from 'react'; 
import { Link, useParams } from 'react-router-dom'; 
import axios from 'axios';

const DataReceipt = () => {
  const [amount, setAmount] = useState(0); 
  const [pin, setPin] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { id } = useParams(); 

  useEffect(() => {
    fetchDataReceipt().then(data => {
      setAmount(data.amount); 
      setPin(data.pin); 
      setLoading(false); 
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
  }, []); 

  const fetchDataReceipt = async () => {
    try
    {
      const response = await axios.post(`http://localhost:5050/transaction/purchase-data/${id}`, {
       amount: amount, 
      }); 

      if(response.data) {
        return response.data;
      }
      else
      {
        throw new Error('Failed to fetch data receipt'); 
      }
    } 
    catch (error) 
    {
      throw error; 
    }
  }

  const styles = {
    styleHeading: {
      color: 'white',
      position: 'absolute',
      top: '15%',
      left: '20%',
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
      bottom: '40%',
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
      <h1 style={styles.styleHeading}>Data Purchase Receipt</h1>
      <div>
        <p>Amount Purchased: {amount} </p>
        <p>Pin: {pin} </p>
        <Link to={'/home'}>
          <button style={styles.styleButton}>Back Home</button>
        </Link>
      </div>
      <br />
    </div>
  )
}

export default DataReceipt