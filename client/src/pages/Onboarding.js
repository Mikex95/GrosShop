import { Link } from "react-router-dom";
import { ReactComponent as Image } from "../img/onboarding.svg";
import "./Onboarding.css";

const Onboarding = () => {
  return (
    <section className="onboarding">
      <div className="onboarding-screen">
        <Image />
      </div>
      <div className="onboarding-getStarted">
        <article>
          <h1>Welcome to our GrosShop</h1>
          <p>Lebensmittel online bestellen: Dein Einkauf. Gleich geliefert.</p>
        </article>
        <Link to="/home">Create new Account</Link>
        <Link to="/">Sign in your Account</Link>
      </div>
    </section>
  );
};

export default Onboarding;
