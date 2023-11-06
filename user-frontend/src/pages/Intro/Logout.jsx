import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGetUserID } from '../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const Logout = () => {
  const userID = useGetUserID();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, setCookies] = useCookies(['access_token']); 

  const apiURL = `http://localhost:5050/authentication/logout/${userID}`;

  const handleLogout = () => {
    setLoading(true);
    axios.post(apiURL, userID)
      .then(() => {
        setLoading(false);
        setCookies('access_token', ''); 
        window.localStorage.removeItem('userID'); 
        enqueueSnackbar('Logout Successful', { variant: 'success' });
        navigate('/'); 
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error logging out', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        width: "600px",
        background:
          "linear-gradient(to bottom right, #009999 30%, #000066 100%)",
        top: "15%",
        left: "30%",
        borderRadius: "10%",
        border: "4px solid black",
      }}
    >
      <div>Are you sure you want to logout?</div>
      <div>
        <button onClick={handleLogout}>Yes</button>
      </div>
    </div>
  )
}

export default Logout