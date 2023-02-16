import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import SignIn from "./pages/Verification/SignIn";
import ForgotPassword from "./pages/Verification/ForgotPassword";
import SignUp from "./pages/Verification/SignUp";
import Success from "./pages/Verification/Success";
import TestComponents from "./pages/TestComponents";
import Home from "./pages/Home/Home";
import DetailsPage from "./pages/Detailspage/DetailsPage";
import Filter from "./pages/Filter/Filter";
import Category from "./pages/Category/Category";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Error404 from "./pages/Error/Error404";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import TypeCode from "./pages/Verification/TypeCode";
import SuccessVerify from "./pages/Verification/SuccessVerify";
import ResetPassword from "./pages/Verification/ResetPassword";

function App() {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2ViYzljM2FlNzIxZDQxNDQ3YTI1ZDEiLCJpYXQiOjE2NzY1MDY5NjcsImV4cCI6MTY3NjU0Mjk2N30.fK_YfFfsxteGcW0up1OySOJhCf_Fzw37X_0d5tDKjPQ"
  );
  console.log(Date.now(), token);

  const [articles, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentUrl, setCurrentUrl] = useState(
    "http://localhost:2202/api/products"
  );
  useEffect(() => {
    setLoading(true);
    fetch(currentUrl)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data.allProducts);
        setLoading(false);
      });
  }, [currentUrl]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="tablet">
          <div className="content">
            <Routes>
              <Route path="/" element={<SplashScreen />}></Route>
              <Route path="/product/:id" element={<DetailsPage />} />
              <Route path="/onboarding" element={<Onboarding />}></Route>
              <Route path="/test" element={<TestComponents />}></Route>
              <Route path="/filter" element={<Filter />}></Route>
              <Route
                path="/signin"
                element={<SignIn setToken={setToken} />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route
                path="/categories"
                element={<Category accessToken={token} />}></Route>
              <Route path="/success" element={<Success />}></Route>
              <Route
                path="/home"
                element={
                  <Home accessToken={token} productFetch={articles} />
                }></Route>
              <Route
                path="/wishlist"
                element={
                  <Wishlist accessToken={token} productFetch={articles} />
                }></Route>
              <Route
                path="/cart"
                element={
                  <Cart accessToken={token} productFetch={articles} />
                }></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="*" element={<Error404 />} />
              <Route path="/verify" element={<TypeCode />}></Route>
              <Route path="/successverify" element={<SuccessVerify />}></Route>
            </Routes>
          </div>
        </div>
        <Link to={"/home"} className="home-btn"></Link>
      </BrowserRouter>
    </div>
  );
  const [token, setToken] = useState(null);
  console.log(Date.now(), token);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="tablet">
          <div className="content">
            <Routes>
              <Route path="/" element={<SplashScreen />}></Route>
              <Route path="/product/:id" element={<DetailsPage />} />
              <Route path="/onboarding" element={<Onboarding />}></Route>
              <Route path="/test" element={<TestComponents />}></Route>
              <Route path="/filter" element={<Filter />}></Route>
              <Route
                path="/signin"
                // element={<SignIn setToken={setToken} />}></Route>
                element={<SignIn />}></Route>
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}></Route>
              <Route path="/reset-password" element={<ResetPassword />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/categories" element={<Category />}></Route>
              <Route path="/success" element={<Success />}></Route>
              <Route
                path="/home"
                element={<Home accessToken={token} />}></Route>
              <Route
                path="/wishlist"
                element={<Wishlist accessToken={token} />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="*" element={<Error404 />} />
              <Route path="/verify" element={<TypeCode />}></Route>
              <Route path="/successverify" element={<SuccessVerify />}></Route>
            </Routes>
          </div>
        </div>
        <Link to={"/home"} className="home-btn"></Link>
      </BrowserRouter>
    </div>
  );
}

export default App;
