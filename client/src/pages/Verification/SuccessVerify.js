import "./Verification.css";
import { ReactComponent as Image } from "../../img/success.svg";
import { Link } from "react-router-dom";

const SuccessVerify = () => {
  return (
    <div className="verfication-success">
      <div className="verification-container">
        <Image />
        <div className="verification-headline">
          <h2>Successfull Verification</h2>
          <p>Explore our fantastic grocerys on GrosShop</p>
          <Link to="/signin">Go to Login &rarr;</Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessVerify;
