import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from 'notistack'
import bgimg from '../../assets/mosolologin.jpg'

const Signup = () => {
  // creating states for the signup user info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegisterUser = () => {
    // creating the data object to send to the backend
    const registerData = {
      fullName,
      email,
      phoneNumber,
      password,
    };

    setLoading(true);
    axios.post('http://localhost:5050/authentication/register', registerData)
      .then((response) => {
        setLoading(false);
        if (response.status === 201) {
          enqueueSnackbar('Account created successfully', { variant: 'success' });
          navigate('/login');
        } else {
          enqueueSnackbar('Unexpected response from the server', { variant: 'error' }); 
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          // The request was made and the server responded with an error
          const errorMessage = error.response.data.error;
          enqueueSnackbar(errorMessage, { variant: 'error' }); 
        } else {
          // Network or other request-related errors
          enqueueSnackbar('Error: Unable to connect to the server.', { variant: 'error' }); 
        }
      })
  };

  const styles = {
    logincontainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to bottom right, #009999 30%, #000066 100%)",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      backgroundSize: "cover",
      overflow: "hidden", // Added to prevent background image from overflowing
    },
    register: {
      maxWidth: "978px",
      width: "60%",
      margin: "auto",
      display: "flex",
      border: "1px solid #e9ecef",
      borderRadius: "5px",
      boxShadow: "1px 3px 10px #e9ecef",
      backgroundColor: "white",
      background: "rgba(255, 255, 255, 0.3)",
      position: "relative",
      top: "25%",
      transform: "translateY(-50%)",
    },

    span: {
      color: "#adb5bd",
      marginBottom: "1em",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "2em auto",
      gap: "1em",
    },
    styleInputField: {
      height: "40px",
      width: "350px",
      borderRadius: "4px",
      padding: "0.5em",
      fontSize: "1rem",
      backgroundColor: "transparent", // Updated to have a transparent background
      color: "#e9ecef", // Text color
      border: "1px solid #e9ecef", // Border color
      outline: "none",
    },
    btn: {
      height: "40px",
      borderRadius: "4px",
      padding: "0.5em 1em",
      fontSize: "1rem",
      background: "#003049",
      color: "#e9ecef",
      border: "none",
      cursor: "pointer",
    },

    flex: {
      display: "flex",
      gap: "1em",
      flexDirection: "column",
      flexWrap: "wrap",
    },
    inputHover: {
      background: "rgba(255, 255, 255, 0.1)",
      boxShadow: "4px 4px 60px 8px rgba(0, 0, 0, 0.2)",
    },

    col1: {
      flex: "1",
      padding: "2em",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    col2: {
      flex: "1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    col2Image: {
      width: "100%",
      maxHeight: "100%",
      objectFit: "cover",
      alignSelf: "center",
    },
    '@media (max-width: 768px)': {
      register: {
        width: '90%',
      },
      col2Image: {
        width: '50%',
      },
      input: {
        width: '100%',
      },
    },
  };

  return (
    <section className='logincontainer' style={styles.logincontainer}>
      <div className='register' style={styles.regiser}>
        <div className='col-1' style={styles.col1}>
          <h2>Signup</h2>
          <span>Welcome</span> <br /><br />

          <div className='flex' style={styles.flex}>
            <input
              type="text"
              value={fullName}
              placeholder='Full Name'
              style={styles.styleInputField}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              value={email}
              placeholder='Email'
              style={styles.styleInputField}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              value={phoneNumber}
              placeholder='Phone Number (with area code)'
              style={styles.styleInputField}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder='Password'
              style={styles.styleInputField}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='btn' style={styles.btn} onClick={handleRegisterUser}>
              Signup
            </button>
            <Link to='/login'>
              Already have an account? Login here
            </Link>
          </div>
        </div>
        {/*<img src={bgimg} alt="" style={styles.col2Image} /> */}
      </div>
    </section>
  )
}

export default Signup