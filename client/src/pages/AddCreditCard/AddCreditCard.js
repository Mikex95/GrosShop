import { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
const AddCreditCard = () => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focused: "",
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputFocus = (e) => {
    setState({
      ...state,
      focused: e.target.name,
    });
  };

  const processPayment = () => {
    console.log("number =>", state.number);
    console.log("name =>", state.name);
    console.log("expiry =>", state.expiry);
    console.log("cvc =>", state.cvc);
    console.log(JSON.stringify(state));
  };

  return (
    <div className="card">
      <div className="card-body">
        <Cards
          number={state.number}
          name={state.name}
          expiry={state.expiry}
          cvc={state.cvc}
          focused={state.focused}
        />
        <form>
          <div className="form-group">
            <label htmlFor="number">Numero de la tarjeta</label>
            <input
              type="text"
              name="number"
              id="number"
              maxLength="16"
              className="form-control"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              maxLength="30"
              className="form-control"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="expiry">Fecha de expiración</label>
              <input
                type="text"
                name="expiry"
                id="expiry"
                maxLength="4"
                className="form-control"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="cvc">CVC</label>
              <input
                type="text"
                name="cvc"
                id="cvc"
                maxLength="4"
                className="form-control"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
          <button
            onClick={processPayment}
            type="button"
            className="btn-success btn-block btn-lg">
            Pagar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCreditCard;
