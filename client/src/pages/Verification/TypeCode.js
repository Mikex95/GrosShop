import "./Verification.css";
import { ReactComponent as Lock } from "../../img/lock.svg";
import { Link } from "react-router-dom";
import VerifyBtn from "../../components/buttons/VerifyBtn";

const TypeCode = () => {
  return (
    <div className="verfication-success">
      <div className="verification-container">
        <Lock />
        <div className="verification-headline">
          <h2>Type Your Code</h2>
          <input type="text" />
          <VerifyBtn text="Verify" />
        </div>
      </div>
    </div>
  );
};

export default TypeCode;
