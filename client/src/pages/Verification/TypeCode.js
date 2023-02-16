import "./Verification.css";
import { ReactComponent as Lock } from "../../img/lock.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VerifyBtn from "../../components/buttons/VerifyBtn";

const TypeCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmitYourCode = (e) => {
    e.preventDefault();
    const apiBaseUrl =
      process.env.REACT_APP_API_BASE_URL || "http://localhost:2202/api/";
    fetch(`${apiBaseUrl}user/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        verificationCode,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        res.json().then((data) => {
          // console.log(data);
          setShowErrorMessage(data.message);
        });
      } else {
        return navigate("/signin");
      }
    });
  };

  return (
    <div className="verfication-success">
      <div className="verification-container">
        <Lock />
        <div className="verification-headline">
          <h2>Type Your Verification Code</h2>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => {
              setVerificationCode(e.target.value);
            }}
          />
          <VerifyBtn text="Verify" onClick={handleSubmitYourCode} />
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

export default TypeCode;
