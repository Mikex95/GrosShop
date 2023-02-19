import BackArrow from "../../components/backArrow/BackArrow";
import GreenButton from "../../components/buttons/GreenButton";
import HeaderTimeWhite from "../../components/headerTime/HeaderTime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import showPasswordImg from "../../img/show-password.svg";
import hidePasswordImg from "../../img/hide-password.svg";
import { Link } from "react-router-dom";
import "./Verification.css";

const SignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState("");
  console.log("error Messages", showErrorMessage);
  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();
    // setShowErrorMessage("Data is required");

    const apiBaseUrl =
      process.env.REACT_APP_API_BASE_URL || "http://localhost:2202/api/";
    fetch(`${apiBaseUrl}user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        res.json().then((data) => {
          console.log(data);
          setShowErrorMessage(data.message);
        });
      } else {
        return navigate("/success");
      }
    });

    // return navigate("/success");;
  }

  return (
    <div className="verification">
      <HeaderTimeWhite backgroundcolor="white" />
      <div className="verification-upper">
        <div className="verification-arrow">
          <BackArrow backgroundcolor="white" />
        </div>
        <div className="verification-headline">
          <h2>Create New Account</h2>
          <p>Enter Your details to create account</p>
        </div>
        <form onSubmit={register} className="verification-form">
          <label htmlFor="text">Vorname</label>
          <input
            type="text"
            placeholder="Type your First Name"
            name="Email"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            // required
          />
          <label htmlFor="Email">Name</label>
          <input
            type="text"
            placeholder="Type your Last Name"
            name="Email"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            // required
          />
          <label htmlFor="text">Username</label>
          <input
            type="text"
            placeholder="Type your Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
          />
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            placeholder="Type your E-Mail"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
          <label htmlFor="Email">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Choose a password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          <div className="eye-signup">
            <img
              title={showPassword ? "Hide Password" : "Show Password"}
              alt="show or Hide Password"
              src={showPassword ? hidePasswordImg : showPasswordImg}
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <GreenButton text="Sign Up" onClick={(event) => register(event)} />
          {showErrorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {showErrorMessage}
            </p>
          )}
        </form>
      </div>
      <div className="verification-to-signin">
        <p>Already have an Account?</p>
        <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
