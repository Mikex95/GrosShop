import { useState } from "react";
import "./Verification.css";
import { ReactComponent as Email } from "../../img/ResetPassword.svg";
import GetPasswordResetLink from "../../components/buttons/GetPasswordResetLink";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const handleSubmitYourEmail = (e) => {
    e.preventDefault();
    const apiBaseUrl =
      process.env.REACT_APP_API_BASE_URL || "http://localhost:2202/api/";
    fetch(`${apiBaseUrl}user/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).then((res) => {
      if (res.status !== 200) {
        res.json().then((data) => {
          setShowErrorMessage(data.message);
          return;
        });
      }
    });
  };
  return (
    <div className="verfication-success">
      <div className="verification-container">
        <Email />
        <div className="verification-headline">
          <h2>Enter Your E-mail</h2>
          <input
            className="forgot-password-input"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <GetPasswordResetLink
            text="Get Link"
            onClick={(e) => handleSubmitYourEmail(e)}
          />
          {showErrorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {showErrorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
