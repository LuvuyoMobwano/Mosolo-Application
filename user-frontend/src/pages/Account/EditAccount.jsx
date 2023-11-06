import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useGetUserID } from '../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const EditAccount = () => {
  const userID = useGetUserID();

  // creating the states for editing the user info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // useEffect is a tool that allows components to perform side effects (e.g. - fetch data, directly updating the DOM, and timers)
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5050/transaction/account-info/${userID}`)
      .then((response) => {
        setFullName(response.data.fullName);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error, check the console', { variant: 'error' });
        setLoading(false);
      })
  }, []);

  const handleEditAccount = () => {
    // Creating a new data object ot send to the backend
    const editData = {
      fullName,
      email,
      phoneNumber,
    };

    setLoading(true);
    axios.put(`http://localhost:5050/transaction/edit-account/${userID}`, editData)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          enqueueSnackbar('Account details edited successfully', { variant: 'success' });
          navigate('/display-account');
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
    check: {
      position: "absolute",
      top: "20%",
      right: "10%",
      backgroundColor: "#003049",
      color: "#e9ecef",
      borderRadius: "10px",
      borderColor: "white",
      width: "500PX",
      height: "40px",
    },

    checktwo: {
      position: "absolute",
      top: "40%",
      right: "10%",
      backgroundColor: "#003049",
      color: "#e9ecef",
      borderRadius: "10px",
      borderColor: "white",
      width: "500PX",
      height: "40px",
    },

    checkthree: {
      position: "absolute",
      top: "60%",
      right: "10%",
      backgroundColor: "#003049",
      color: "#e9ecef",
      borderRadius: "10px",
      borderColor: "white",
      width: "500PX",
      height: "40px",
    },

    checkfour: {
      position: "absolute",
      top: "50%",
      left: "60%",
      backgroundColor: "#003049",
      color: "#e9ecef",
      borderRadius: "10px",
      borderColor: "white",
      width: "200PX",
      height: "40px",
    },
    checkfive: {
      position: "absolute",
      top: "85%",
      backgroundColor: "#003049",
      color: "#e9ecef",
      borderRadius: "10px",
      width: "150PX",
      height: "40px",
    },

    inputtokenone: {
      position: "absolute",
      top: "15%",
      left: "13%",
      width: "200PX",
      height: "40px",
      color: "white",
    },
    inputtokentwo: {
      position: "absolute",
      top: "35%",
      left: "13%",
      width: "200PX",
      height: "40px",
      color: "white",
    },
    inputtokenthree: {
      position: "absolute",
      top: "55%",
      left: "13%",
      width: "200PX",
      height: "40px",
      color: "white",
    },
    inputtokenfour: {
      position: "absolute",
      top: "35%",
      right: "60%",
      backgroundColor: "#003049",
      color: "#e9ecef",
      borderRadius: "10px",
      borderColor: "white",
      width: "200PX",
      height: "40px",
    },
    accounts: {
      color: "white",
      position: "absolute",
      bottom: "90%",
    },
    inputStyle: {
      position: "absolute",
      width: "200px",
      height: "40px",
      color: "black",
      backgroundColor: "#ffffff",
      border: "1px solid #ccc",
      borderRadius: "5px",
      paddingLeft: "10px",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        height: "450px",
        width: " 650px",
        background:
          "linear-gradient(to bottom right, #009999 30%, #000066 100%)",
        top: "20%",
        left: "25%",
        borderRadius: "5%",
        border: "4px solid black",
      }}
    >
      <h1 style={styles.accounts}>Edit Info</h1>


      <input
        type='text'
        style={styles.check}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type='text'
        style={styles.checktwo}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='text'
        style={styles.checkthree}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <button className="btntwo" style={styles.checkfive} onClick={handleEditAccount}>
        Update
      </button>
    </div>
  );
}

export default EditAccount