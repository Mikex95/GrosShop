import "./Verification.css";
import { ReactComponent as Image } from "../../img/success.svg";

const Success = () => {
  return (
    <div className="verfication-success">
      <div className="verification-container">
        <Image />
        <div className="verification-headline">
          <h2>Welcome GrosShop</h2>
          <p>Successfully created your GrosShop account</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
