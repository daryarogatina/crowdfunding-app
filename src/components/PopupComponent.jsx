import React, { useState } from "react";
import axios from "axios";
import "../styles/popup.css";

function PopupComponent({ onClose, selectedCampaign, currentNickname }) {
  const [amount, setAmount] = useState("");
  const [nickname, setNickname] = useState("");
  const [inputError, setInputError] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
    setInputError("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const nicknameRegex = /^[A-Za-z0-9_]+$/;
    if (!nickname || !amount || nickname.length > 10 || nickname.length < 2) {
      setInputError("Incorrect input value!");
    } else if (!nicknameRegex.test(nickname)) {
      setInputError(
        "Invalid nickname! Please use only English letters, digits, and underscores."
      );
    } else {
      try {
        await axios.post("http://localhost:4001/donations", {
          campaign_id: selectedCampaign,
          amount: amount,
          donator_nickname: nickname,
        });
        console.log(amount);
        console.log(nickname);

        setAmount("");
        setNickname("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="popup">
      <span className="popup__title">Make your donation</span>
      <p className="popup__content">Enter the amount.</p>
      <input
        className="amount"
        type="number"
        value={amount}
        onChange={handleAmountChange}
      />
      <p className="popup__content">Enter your nickname.</p>
      <input
        className="amount"
        id="myInput"
        value={nickname}
        onChange={handleNicknameChange}
      />
      <div className="popup__form">
        <button className="close" onClick={onClose}>
          Close
        </button>
        <button className="send" onClick={handleFormSubmit}>
          Send
        </button>
      </div>
      {inputError && <p className="error-message">{inputError}</p>}
    </div>
  );
}

export default PopupComponent;
