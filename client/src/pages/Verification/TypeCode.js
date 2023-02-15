import { ReactComponent as Image } from "../../img/success.svg";
import { Link } from "react-router-dom";
import GreenButton from "../../components/buttons/GreenButton";
import VerifyBtn from "../../components/buttons/VerifyBtn";

const TypeCode = () => {
  return (
    <div className="verfication-success">
      <div className="verification-container">
        <Image />
        <div className="verification-headline">
          <h2>Type Your Verification Code</h2>
          <input type="text" />
          <VerifyBtn text="Verify" />
        </div>
      </div>
    </div>
  );
};

export default TypeCode;
