import "./AddCreditCard.css";
import { useState, useEffect } from "react";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";

const AddCreditCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardNumberColor, setCardNumberColor] = useState("");
  const [focus, setFocus] = useState();
  const [validColor, setValidColor] = useState("");

  const validateNumber = (e) => {
    let regexNumber =
      e.target.value
        .replace(/\D+/g, "")
        .replace(/\D/g, "")
        .match(/.{1,4}/g) || [];
    setCardNumber(regexNumber.join(" ").substring(0, 19));
    if (
      regexNumber.toString().length === 19 ||
      regexNumber.toString().length === 21
    ) {
      setCardNumberColor("2px solid green");
    } else {
      setCardNumberColor("2px solid red");
    }
  };
  const formatExpirationDate = (inputfiled) => {
    // const expdate = inputField.value;
    const expDateFormatter =
      expiry.replace(/\//g, "").substring(0, 2) +
      (expiry.length > 2 ? "/" : "") +
      expiry.replace(/\//g, "").substring(2, 4);
    return expDateFormatter;
  };

  return (
    <div className="card">
      <Cards
        number={cardNumber}
        name={cardHolderName}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />
      <p className="small">new card</p>
      <form>
        <div id="inputWrapper">
          <label htmlFor="cardNumberInput">Card Number</label>
          <input
            className="input-style"
            type="text"
            name="number"
            id="cardNumberInput"
            value={cardNumber}
            onChange={validateNumber}
            onFocus={(e) => e.target.value}
            style={{ border: cardNumberColor }}
          />

          <label htmlFor="cardHolderInput">Card holder</label>
          <input
            className="input-style"
            type="text"
            name="name"
            id="cardHolderInput"
            value={cardHolderName}
            onChange={(e) => {
              setCardHolderName(e.target.value);
            }}
            onFocus={(e) => e.target.value}
          />

          <div id="validWrapper">
            <div id="validThru2">
              <label htmlFor="expiry">expiry</label>
              <input
                className="input-style"
                id="expiry"
                value={expiry}
                placeholder="MM/YY"
                type="text"
                // maxLength="4"
                style={{ border: validColor }}
                onChange={(expiry) => setExpiry(formatExpirationDate(expiry))}
                onFocus={(e) => e.target.value}
              />
            </div>
          </div>
          <label htmlFor="cvcInput">CVC</label>
          <input
            className="input-style"
            type="text"
            name="cvc"
            maxLength="4"
            id="cvcInput"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onFocus={(e) => e.target.value}
          />
        </div>
        <button className="add-card-btn" type="button">
          Add card
        </button>
      </form>
    </div>
  );
};
// };
export default AddCreditCard;
