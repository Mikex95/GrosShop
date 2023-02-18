import "./Verification.css";
import { ReactComponent as Image } from "../../img/success.svg";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="verfication-success">
      <div className="verification-container">
        <Image />
        <div className="verification-headline">
          <h2>Welcome GrosShop</h2>
          <p>Successfully created your GrosShop account</p>
          <Link to="/verify1">
            Check your E-Mail and type your verification code &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
