import GreenButton from "../../components/buttons/GreenButton";
import { Link } from "react-router-dom";
import { ReactComponent as Image } from "../../img/Logo-Login.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api";

import "./Verification.css";
import BackArrow from "../../components/backArrow/BackArrow";
import HeaderTime from "../../components/headerTime/HeaderTime";

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // localStorage.setItem("accessToken", data.accessToken);
        setToken(data.accessToken);
        return navigate("/test");
      });
  }

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
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            placeholder="Type your E-Mail"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="Email">Password</label>
          <input
            type="password"
            placeholder="Type your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <GreenButton text="Sign In" onClick={login} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
