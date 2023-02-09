import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";
import Loader from "../components/loader/Loader";
import { ReactComponent as Title } from "../img/title_logo.svg";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/onboarding");
    }, 5000);
  }, []);

  return (
    <section className="splash-screen">
      <Title />
      <Loader />
    </section>
  );
};

export default SplashScreen;
