import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GreenButton from "../../components/buttons/GreenButton";
import "./Verification.css";
import BackArrow from "../../components/backArrow/BackArrow";
import { ReactComponent as Image } from "../../img/Logo-Login.svg";

import HeaderTime from "../../components/headerTime/HeaderTime";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const navigate = useNavigate();

  // fixme: user params to get params but what to get query???????
  const { resetPasswordToken } = useParams();
  console.log(resetPasswordToken);

  const saveYourNewPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setShowErrorMessage("Password must match");
      return;
    }
    const apiBaseUrl =
      process.env.REACT_APP_API_BASE_URL || "http://localhost:2202/api/";
    fetch(`${apiBaseUrl}user/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword,
        confirmPassword,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        res.json().then((data) => {
          console.log(data);
          setShowErrorMessage(data.message);
        });
      } else {
        return navigate("/home");
      }
    });
  };
  return (
    <div className="verification">
      <HeaderTime backgroundcolor="white" />
      <div className="verification-upper">
        <div className="verification-arrow">
          <BackArrow backgroundcolor="white" />
        </div>
        <div className="verification-image">
          <Image />
        </div>
        <form className="verification-form">
          <label htmlFor="new Password">New Password</label>
          <input
            type="password"
            placeholder="Type new Password"
            name="new Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="confirm new Password">Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm password"
            name="confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <GreenButton text="Save Changes" onClick={saveYourNewPassword} />
          {showErrorMessage && (
            <p className="error-message">{showErrorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
