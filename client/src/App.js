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
import Checkout from "./pages/Checkout/Checkout";

import TypeCode2 from "./pages/Verification/Typecode2";
import AddCreditCard from "./pages/AddCreditCard/AddCreditCard";
import { apiBaseUrl } from "./api";

import Update from "./pages/Profile/Udate";

function App() {
  const [token, setToken] = useState(null);
  console.log(Date.now(), token);
  useEffect(() => {
    if (!token) {
      return;
    }
    // refresh token before it expires
    const tokenPayloadBase64Str = token.split(".")[1];
    const tokenPayloadJsonStr = atob(tokenPayloadBase64Str);
    const tokenPayload = JSON.parse(tokenPayloadJsonStr);
    const exp = tokenPayload.exp;
    const nowInSeconds = Math.floor(Date.now() / 1000);

    const tenSecondsBefore = 10;
    const triggerSilentTokenRefreshInSeconds = exp - nowInSeconds - tenSecondsBefore;

    console.log({ triggerSilentTokenRefreshInSeconds });

    //setTimeout to triger the silent refresh 10 senonds but
    //it take time in milli senods that is why triggerSilentTokenRefreshInSeconds * 1000
    const refreshTokenTimeoutID = setTimeout(() => {
      console.log("about to do SILENT REFRESH");
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
      fetch(`${apiBaseUrl}user/silent-refresh`, {
        method: "POST",
        credentials: "include",
        // here: take refresh token from httpOnly secure cookie and send it
        // withCredentials: true,
      })
        .then((res) => res.json())
        .then((result) => {
          setToken(result?.accessToken);
        });
    }, triggerSilentTokenRefreshInSeconds * 1000);
    console.log({ refreshTokenTimeoutID });
    return () => {
      clearTimeout(refreshTokenTimeoutID);
    };
  }, [token]);

  const [articles, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const [currentUrl, setCurrentUrl] = useState(`${apiBaseUrl}products`);
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
              <Route path="/product/:id" element={<DetailsPage accessToken={token} productFetch={articles} />} />
              <Route path="/onboarding" element={<Onboarding />}></Route>
              <Route path="/test" element={<TestComponents />}></Route>
              <Route path="/filter" element={<Filter />}></Route>
              <Route path="/signin" element={<SignIn setToken={setToken} />}></Route>
              <Route path="/forgot-password" element={<ForgotPassword />}></Route>
              <Route path="/reset-password" element={<ResetPassword />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/categories" element={<Category accessToken={token} />}></Route>
              <Route path="/success" element={<Success />}></Route>
              <Route path="/home" element={<Home accessToken={token} productFetch={articles} />}></Route>
              <Route path="/wishlist" element={<Wishlist accessToken={token} productFetch={articles} />}></Route>
              <Route path="/cart" element={<Cart accessToken={token} productFetch={articles} />}></Route>
              <Route path="/profile" element={<Profile accessToken={token} />}></Route>
              <Route path="/checkout" element={<Checkout accessToken={token} productFetch={articles} />}></Route>
              <Route path="/update-profile" element={<Update accessToken={token} />}></Route>
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="*" element={<Error404 />} />
              <Route path="/verify" element={<TypeCode />}></Route>
              <Route path="/verify1" element={<TypeCode2 />}></Route>
              <Route path="/successverify" element={<SuccessVerify />}></Route>
              <Route path="/addcredit" element={<AddCreditCard />}></Route>
            </Routes>
          </div>
        </div>
        <Link to={"/home"} className="home-btn"></Link>
      </BrowserRouter>
    </div>
  );
}

export default App;
