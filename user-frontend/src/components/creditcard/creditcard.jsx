import React from 'react';
import chip from '../../assets/chipt.png.png';
import './creditcard.css'; // Create a CSS file for styling
import axios from 'axios';

const CreditCard = ({ cardNumber }) => {
  return (
    <div className="credit-card-container">
      <div className="credit-card">
        <div className="card-logo">
          <img
            src={require('../../assets/Mosolo.png')}
            alt="logo"
            style={{ width: "120px" }}
          />
        </div>
        <div className="chip">
          <img src={chip} style={{ width: "50px" }} alt="Card Chip" />
          </div>
        <div className="card-number">
          {cardNumber}
        </div>
      </div>
    </div>
  );
};

export default CreditCard;