import React, { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useGetUserID } from '../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const DeleteAccount = () => {
  const userID = useGetUserID();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, setCookies] = useCookies(['access_token']);

  const handleDeleteAccount = () => {
    setLoading(true);
    axios.delete(`http://localhost:5050/transaction/delete-account/${userID}`)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setCookies('access_token', '');
          window.localStorage.removeItem('userID');
          enqueueSnackbar('Account deleted successfully', { variant: 'success' });
          navigate('/');
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
      top: "35%",
      right: "35%",
      backgroundColor: "#003049",
      color: "#e9ecef",
      borderRadius: "10px",
      borderColor: "white",
      width: "200PX",
      height: "40px",
    },

    inputtokenone: {
      position: "absolute",
      top: "55%",
      right: "35%",
      backgroundColor: "#003049",
      color: "#e9ecef",
      borderRadius: "10px",
      borderColor: "white",
      width: "200PX",
      height: "40px",
    },

    inputtokentwo: {
      position: "absolute",
      top: "75%",
      right: "35%",
      backgroundColor: "#003049",
      color: "#e9ecef",
      borderRadius: "10px",
      borderColor: "white",
      width: "200PX",
      height: "40px",
    },

    checkfive: {
      position: "absolute",
      top: "34%",
      right: "%",
      backgroundColor: "#003049",
      color: "#e9ecef",
      borderRadius: "10px",
      width: "150PX",
      height: "40px",
    },

    accounts: {
      color: "white",
      position: "absolute",
      top: "1%",
    },
    accounttwo: {
      color: "white",
      position: "absolute",
      top: "13%",
      fontSize: "18px",
      left: "38%",
    },
    accountfour: {
      color: "white",
      position: "absolute",
      top: "18%",
      fontSize: "17px",
      left: "45%",
    },
    accountfive: {
      color: "white",
      position: "absolute",
      top: "27%",
      fontSize: "18px",
      left: "40%",
    },
    accountsix: {
      color: "white",
      position: "absolute",
      top: "48%",
      fontSize: "18px",
      left: "20%",
      font: "bold",
    },
    accountseven: {
      color: "white",
      position: "absolute",
      top: "55%",
      fontSize: "14px",
      left: "10%",
    },
    accounteight: {
      color: "white",
      position: "absolute",
      top: "48%",
      fontSize: "18px",
      left: "20%",
    },
  };

  return (
    <div>
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
        <h1 style={styles.accounts}>Delete account</h1>
        {/*<p style={styles.accounttwo}>Current Account </p>
        <h1 style={styles.accountfour}>{user.fullName}</h1>*/}
        <p style={styles.accountfive}>Delete Account? </p>
        <p style={styles.accountsix}>Warning: Account Deletion Consequences:</p>

        <p style={styles.accountseven}>
          -Loss of Access: You will no longer be able to log in or access your.
          <br />
          <br /> -Data Removal: All your account data, including settings and
          saved information, will be permanently deleted.
          <br />
          <br /> -Transactions or History: Any transaction history or account
          activity will be lost and cannot be recovered.
          <br />
          <br />
          -Recovery Unavailable: Once the account is deleted, it cannot be
          recovered. You'll need to create a new account if you wish to use our
          services in the future.
        </p>

        <button className="btn" style={styles.checkfive} onClick={handleDeleteAccount}>
          Yes
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount