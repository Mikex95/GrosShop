import GreenButton from "../../components/buttons/GreenButton";
import { Link } from "react-router-dom";
import { ReactComponent as Image } from "../../img/Logo-Login.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api";

import "./Verification.css";

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();

    fetch(`${apiBaseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "error") {
          setErrorMessage(error.message);
          return;
        }
        setToken(result.accessToken);
        return navigate("/dashboard");
      });
  }

  return (
    <div className="verification">
      <div className="verification-upper">
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
