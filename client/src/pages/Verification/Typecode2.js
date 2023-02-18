import "./TypeCode2.css";
import { ReactComponent as Lock } from "../../img/lock.svg";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import VerifyBtn from "../../components/buttons/VerifyBtn";

const TypeCode2 = () => {
  const inputRefs = useRef([]);
  const [verificationCode, setVerificationCode] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle input to jump from box to box on input
  function handleInput(e, index) {
    const newInputValues = [...verificationCode];
    newInputValues[index] = e.target.value;
    setVerificationCode(newInputValues);
    const input = e.target;
    const nextInput = input.nextElementSibling;
    if (nextInput && input.value) {
      nextInput.focus();
      if (nextInput.value) {
        nextInput.select();
      }
    }
  }

  //Handel paste on the six boxes directly
  function handlePaste(e) {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const newInputValues = paste.split("").slice(0, 6);
    setVerificationCode(newInputValues);
    inputRefs.current.forEach((input, i) => {
      input.value = newInputValues[i] || "";
    });
  }

  //Handel onChange
  function handleChange(e, index) {
    const newInputValues = [...verificationCode];
    newInputValues[index] = e.target.value;
    setVerificationCode(newInputValues);
  }

  function handleFocus(e) {
    setTimeout(() => {
      e.target.select();
    }, 0);
  }

  const handleSubmitYourCode = (e) => {
    e.preventDefault();
    console.log(verificationCode);
    const inputValues = verificationCode.join("");
    console.log("submitted input values:", inputValues);
    const apiBaseUrl =
      process.env.REACT_APP_API_BASE_URL || "http://localhost:2202/api/";
    fetch(`${apiBaseUrl}user/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        verificationCode: inputValues,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        res.json().then((data) => {
          // console.log(data);
          setShowErrorMessage(data.message);
        });
      } else {
        return navigate("/signin");
      }
    });
  };

  return (
    <div className="verfication-success">
      <div className="verification-container">
        <Lock />
        <div className="flex">
          <input
            type="tel"
            maxLength="1"
            pattern="[0-9]"
            value={verificationCode[0]}
            onChange={(e) => handleChange(e, 0)} //finished
            className="form-control"
            ref={(ref) => (inputRefs.current[0] = ref)}
            onPaste={handlePaste} //finished
            onInput={handleInput}
            onFocus={handleFocus}
          />
          <input
            type="tel"
            maxLength="1"
            pattern="[0-9]"
            value={verificationCode[1]}
            onChange={(e) => handleChange(e, 1)}
            className="form-control"
            ref={(ref) => (inputRefs.current[1] = ref)}
            onPaste={handlePaste}
            onInput={handleInput}
            onFocus={handleFocus}
          />
          <input
            type="tel"
            maxLength="1"
            pattern="[0-9]"
            value={verificationCode[2]}
            onChange={(e) => handleChange(e, 2)}
            className="form-control"
            ref={(ref) => (inputRefs.current[2] = ref)}
            onPaste={handlePaste}
            onInput={handleInput}
            onFocus={handleFocus}
          />
          <input
            type="tel"
            maxLength="1"
            pattern="[0-9]"
            value={verificationCode[3]}
            onChange={(e) => handleChange(e, 3)}
            className="form-control"
            ref={(ref) => (inputRefs.current[3] = ref)}
            onPaste={handlePaste}
            onInput={handleInput}
            onFocus={handleFocus}
          />
          <input
            type="tel"
            maxLength="1"
            pattern="[0-9]"
            value={verificationCode[4]}
            onChange={(e) => handleChange(e, 4)}
            className="form-control"
            ref={(ref) => (inputRefs.current[4] = ref)}
            onPaste={handlePaste}
            onInput={handleInput}
            onFocus={handleFocus}
          />
          <input
            type="tel"
            maxLength="1"
            pattern="[0-9]"
            value={verificationCode[5]}
            onChange={(e) => handleChange(e, 5)}
            className="form-control"
            ref={(ref) => (inputRefs.current[5] = ref)}
            onPaste={handlePaste}
            onInput={handleInput}
            onFocus={handleFocus}
          />
        </div>
        <VerifyBtn text="Verify Account" onClick={handleSubmitYourCode} />
        {showErrorMessage && (
          <p className="error-message" style={{ color: "red" }}>
            {showErrorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default TypeCode2;
