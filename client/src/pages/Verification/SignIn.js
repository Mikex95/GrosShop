import GreenButton from "../../components/buttons/GreenButton";
import { Link } from "react-router-dom";
import { ReactComponent as Image } from "../../img/Logo-Login.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import showPasswordImg from "../../img/show-password.svg";
import hidePasswordImg from "../../img/hide-password.svg";
import { apiBaseUrl } from "../../api";

import "./Verification.css";
import BackArrow from "../../components/backArrow/BackArrow";
import HeaderTimeWhite from "../../components/headerTime/HeaderTimeWhite";

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    // const apiBaseUrl =
    //   process.env.REACT_APP_API_BASE_URL || "http://localhost:2202/api/";
    fetch(`${apiBaseUrl}user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "authorization": "Bearer accesstToken", //nicht bei login sonder bei privaten routen
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    }).then((res) => {
      if (res.status !== 200) {
        res.json().then((data) => {
          // console.log(data);
          setShowErrorMessage(data.message);
        });
      } else {
        res.json().then((data) => {
          navigate("/home");
          // console.log(data);
          setToken(data.accessToken);
        });
      }
    });
  }

  return (
    <div className="verification">
      <HeaderTimeWhite backgroundcolor="white" />
      <div className="verification-upper">
        <div className="verification-arrow">
          <BackArrow backgroundcolor="white" />
        </div>
        <div className="verification-image">
          <Image />
        </div>
        <form className="verification-form">
          <label htmlFor="Email">Email</label>

          <input
            type="email"
            placeholder="Type your E-Mail"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="Email" className="forgot-password">
            <span>Password</span>
            <span>
              <Link to="/forgot-password"> forgot your password? </Link>
            </span>
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Type your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="eye">
            <img
              title={showPassword ? "Hide Password" : "Show Password"}
              alt="show or Hide Password"
              src={showPassword ? hidePasswordImg : showPasswordImg}
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <GreenButton text="Sign In" onClick={login} />
          {showErrorMessage && (
            <p className="error-message">{showErrorMessage}</p>
          )}
        </form>
      </div>
      <div className="verification-to-signin">
        <p>Don't have an Account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
