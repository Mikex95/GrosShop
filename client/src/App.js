import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
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
