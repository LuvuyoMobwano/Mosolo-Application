import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useGetUserID } from '../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

const DisplayAccount = () => {
    const userID = useGetUserID();

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5050/transaction/account-info/${userID}`)
            .then((response) => {
                setLoading(false);
                setUser(response.data);
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error, check the console', { variant: 'error' });
                console.log(error);
            });
    }, []);

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
            left: "10%",
            backgroundColor: "#003049",
            color: "#e9ecef",
            borderRadius: "10px",
            width: "150PX",
            height: "40px",
        },

        checksix: {
            position: "absolute",
            top: "85%",
            left: "25%",
            backgroundColor: "#003049",
            color: "#e9ecef",
            borderRadius: "10px",
            width: "150PX",
            height: "40px",
        },

        checksixV2: {
            position: "absolute",
            top: "85%",
            left: "55%",
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
            <h1 style={styles.accounts}>Account Details</h1>

            <div style={styles.check}> {user.fullName}</div>
            <div style={styles.checkthree}> {user.phoneNumber}</div>
            <div style={styles.checktwo}> {user.email}</div>

            <div style={styles.inputtokenone}>Fullname:</div>
            <div style={styles.inputtokenthree}>Phone number:</div>
            <div style={styles.inputtokentwo}>Email address:</div>

            <Link to="/edit-account">
                <button className="btntwo" style={styles.checksix}>
                    Edit Account
                </button>
            </Link>
            <Link to="/delete-account">
                <button className="btntwo" style={styles.checksixV2}>
                    Delete Account
                </button>
            </Link>
        </div>
    );
}

export default DisplayAccount