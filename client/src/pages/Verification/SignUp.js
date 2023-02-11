import BackArrow from "../../components/backArrow/BackArrow";
import GreenButton from "../../components/buttons/GreenButton";
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

	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	function register(event) {
		event.preventDefault();
		if (
			firstname === "" ||
			lastname === "" ||
			email === "" ||
			password === "" ||
			username === ""
		) {
			setErrorMessage("Data is required");
			return;
		}
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
		})
			.then((res) => res.json())
			.then(({ status, error }) => {
				if (status === "error") {
					setErrorMessage(error.message);
					return;
				}


				return navigate("/success");
			});
	}

	return (
		<div className="verification">
			<div className="verification-upper">
				<div className="verification-headline">
					<h2>Create New Account</h2>
					<p>Enter Your details to create account</p>
				</div>
				<form
					onSubmit={register}
					className="verification-form"
				>
					<label htmlFor="text">Name</label>
					<input
						type="text"
						placeholder="Type your Name"
						name="Email"
						value={firstname}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
					<label htmlFor="Email">Vorname</label>
					<input
						type="text"
						placeholder="Type your Name"
						name="Email"
						value={lastname}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
					<label htmlFor="text">Username</label>
					<input
						type="text"
						placeholder="Type your Username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<label htmlFor="Email">Email</label>
					<input
						type="email"
						placeholder="Type your E-Mail"
						name="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label htmlFor="Email">Password</label>
					<input
						type="password"
						placeholder="Choose a password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<GreenButton
						text="Sign Up"
						onClick={(event) => register(event)}
					/>
					{errorMessage && (
						<p
							className="error-message"
							style={{ color: "red" }}
						>
							{errorMessage}
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
