import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import bgimg from '../../assets/mosolologin.jpg';

const Login = () => {
  // creating the states for the login user info
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [_, setCookies] = useCookies(['access_token']); 

  const handleLoginUser = () => {
    // creating a new data object to send to the backend
    const loginData = {
      email,
      password,
    };

    setLoading(true);
    axios.post('http://localhost:5050/authentication/login', loginData)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setCookies('access_token', response.data.token); 
          window.localStorage.setItem('userID', response.data.userID);
          enqueueSnackbar('Login Successful', { variant: 'success' });
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
      overflow: "hidden",
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
      top: "15%",
      transform: "translateY(-50%)", // Added to make col1 and col2 flex containers
    },

    span: {
      color: "#adb5bd",
      marginBottom: "1em",
    },
    form: {
      maxWidth: "320px",
      width: "100vw",
      margin: "2em auto",
      marginTop: "1em",
    },

    input: {
      height: "40px",
      width: "300px",
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
      width: "120px",
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
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flex: 1,
      marginBottom: "1em",
    }, // Added to take up the available space in register

    col2: {
      flex: 1, // Added to take up the available space in register
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    col2Image: {
      width: "100%",
      height: "100%",
      objectFit: "fill", // Adjust this as needed
      alignSelf: "center",
    },
  };

  return (
    <section className='logincontainer' style={styles.logincontainer}>
      <div className='register' style={styles.register}>
        <div className='col-1' style={styles.col1}>
          <h2>Login</h2>
          <span>Welcome</span>

          <div className='flex' style={styles.flex}>
            <input
              type="email"
              placeholder='Email'
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder='Password'
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='btn' style={styles.btn} onClick={handleLoginUser}>
              Login
            </button>
            <Link to='/signup'>
              Don't have an account? Signup here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login