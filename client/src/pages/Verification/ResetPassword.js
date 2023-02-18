import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GreenButton from "../../components/buttons/GreenButton";
import "./Verification.css";
import showPasswordImg from "../../img/show-password.svg";
import hidePasswordImg from "../../img/hide-password.svg";
import BackArrow from "../../components/backArrow/BackArrow";
import { ReactComponent as Image } from "../../img/Logo-Login.svg";

import HeaderTime from "../../components/headerTime/HeaderTime";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const resetPasswordToken = searchParams.get("token");
  console.log({ resetPasswordToken });
  // nimmt den token von query und setet das in body direkt
  const saveChanges = (e) => {
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
        resetPasswordToken, // soll gelesden werden im back and mit req.body.resetPasswordToken
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

            type={showPassword ? "text" : "password"}
            placeholder="NEW Password"

            name="new Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <div className="eye1">
            <img
              title={showPassword ? "Hide Password" : "Show Password"}
              alt="show or Hide Password"
              src={showPassword ? hidePasswordImg : showPasswordImg}
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <label htmlFor="confirm new Password">Confirm Password</label>

          
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            name="confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="eye2">
            <img
              title={showPassword ? "Hide Password" : "Show Password"}
              alt="show or Hide Password"
              src={showPassword ? hidePasswordImg : showPasswordImg}
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <GreenButton text="Save Changes" onClick={saveChanges} />

          

          {showErrorMessage && (
            <p className="error-message">{showErrorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
