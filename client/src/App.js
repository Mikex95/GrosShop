import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import SignIn from "./pages/Verification/SignIn";
import SignUp from "./pages/Verification/SignUp";
import Success from "./pages/Verification/Success";
import TestComponents from "./pages/TestComponents";
import Home from "./pages/Home/Home";
import DetailsPage from "./pages/Detailspage/DetailsPage";
import Filter from "./pages/Filter/Filter";
import Category from "./pages/Category/Category";
import OrderHistory from "./pages/OrderHistory/OrderHistory";

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
								path="/:id"
								element={<DetailsPage />}
							/>
							<Route
								path="/onboarding"
								element={<Onboarding />}
							></Route>
							<Route
								path="/test"
								element={<TestComponents />}
							></Route>
							<Route
								path="/filter"
								element={<Filter />}
							></Route>
							<Route
								path="/signin"
								element={<SignIn />}
							></Route>
							<Route
								path="/signup"
								element={<SignUp />}
							></Route>
							<Route
								path="/categories"
								element={<Category />}
							></Route>
							<Route
								path="/success"
								element={<Success />}
							></Route>
							<Route
								path="/home"
								element={<Home />}
							></Route>
							<Route
								path="/order-history"
								element={<OrderHistory />}
							/>
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
