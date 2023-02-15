import BackArrow from "../../components/backArrow/BackArrow";
import GreenButton from "../../components/buttons/GreenButton";
import HeaderTime from "../../components/headerTime/HeaderTime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Verification.css";

const SignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          // console.log(data);
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
      <HeaderTime backgroundcolor="white" />
      <div>
        <BackArrow backgroundcolor="white" />
      </div>
      <div className="verification-upper">
        <div className="verification-headline">
          <h2>Create New Account</h2>
          <p>Enter Your details to create account</p>
        </div>
        <form onSubmit={register} className="verification-form">
          <label htmlFor="text">Vorname</label>
          <input
            type="text"
            placeholder="Type your Name"
            name="Email"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            // required
          />
          <label htmlFor="Email">Name</label>
          <input
            type="text"
            placeholder="Type your Name"
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
            type="password"
            placeholder="Choose a password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
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
