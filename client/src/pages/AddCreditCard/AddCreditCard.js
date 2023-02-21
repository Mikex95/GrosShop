import "./AddCreditCard.css";
import { useState, useEffect } from "react";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import HeaderTime from "../../components/headerTime/HeaderTime";
import BackArrow from "../../components/backArrow/BackArrow";

const AddCreditCard = (e) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardNumberColor, setCardNumberColor] = useState("");
  const [focused, setFocus] = useState();
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

  return (
    <div className="card">
      <HeaderTime backgroundcolor={"green"} color={"white"} />
      <BackArrow />
      <fieldset>
        <h3 className="small">Add new card</h3>
        <Cards
          number={cardNumber}
          name={cardHolderName}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
        />

        <form>
          <div id="inputWrapper">
            <label className="add-credit-label" htmlFor="cardNumberInput">
              Card Number
            </label>
            <input
              className="input-style"
              type="tel"
              name="number"
              pattern="[\d| ]{16,22}"
              required
              id="cardNumberInput"
              value={cardNumber}
              onChange={validateNumber}
              onFocus={(e) => e.target.value}
              style={{ border: cardNumberColor }}
            />
            {/* <small>E.g.: 49..., 51..., 36..., 37...</small> */}

            <label className="add-credit-label" htmlFor="cardHolderInput">
              Card holder
            </label>
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
                <label className="add-credit-label" htmlFor="expiry">
                  expiry
                </label>
                <input
                  className="input-style"
                  id="expiry"
                  value={expiry}
                  placeholder="MM/YY"
                  type="tel"
                  pattern="\d\d/\d\d"
                  required
                  maxLength="4"
                  style={{ border: validColor }}
                  onChange={(e) => setExpiry(e.target.value)}
                  onFocus={(e) => e.target.value}
                />
              </div>
            </div>
            <label className="add-credit-label" htmlFor="cvcInput">
              CVC
            </label>
            <input
              className="input-style"
              type="tel"
              name="cvc"
              pattern="\d{3,4}"
              required
              maxLength="4"
              id="cvcInput"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={(e) => e.target.value}
            />
          </div>
        </form>
      </fieldset>
      <div className="add-card-btn">
        <button className="add-card-button" type="button">
          Add card
        </button>
      </div>
    </div>
  );
};
// };
export default AddCreditCard;
