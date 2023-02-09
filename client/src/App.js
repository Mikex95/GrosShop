import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import SignIn from "./pages/Verification/SignIn";
import SignUp from "./pages/Verification/SignUp";
import TestComponents from "./pages/TestComponents";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<div className="tablet">
					<div className="content">
						<Routes>
							<Route
								path="/"
								element={<SplashScreen />}
							></Route>
							<Route
								path="/onboarding"
								element={<Onboarding />}
							></Route>
							<Route
								path="/test"
								element={<TestComponents />}
							></Route>
							<Route
								path="/signin"
								element={<SignIn />}
							></Route>
							<Route
								path="/signup"
								element={<SignUp />}
							></Route>
						</Routes>
					</div>
				</div>
				<Link
					to={"/home"}
					className="home-btn"
				></Link>
			</BrowserRouter>
		</div>
	);
}

export default App;
