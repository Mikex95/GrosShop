import "./Cart.css";
import "../Home/Home.css";
import { ReactComponent as Trash } from "../../img/trash.svg";
import { useState } from "react";
import heart from "../../img/heart.png";
import { ReactComponent as Star } from "../../img/star7.svg";
import { apiBaseUrl } from "../../api";

const CartItem = (props) => {
  const [counter, setCounter] = useState(props.counter);
  const [isDeleted, setIsDeleted] = useState(false);

  const increase = () => {
    setCounter(counter + 1);
    props.onCounterChange(counter + 1);
  };

  const decrease = () => {
    if (counter >= 1) {
      setCounter((prevCounter) => prevCounter - 1);
      props.onCounterChange(counter - 1);
    }
  };

  const handleDelete = () => {
    const productId = props.id;
    const productPrice = props.price;
    const quantity = props.counter;
    console.log(quantity);
    console.log(productId);
    fetch(`${apiBaseUrl}user/cart/removeitem/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsDeleted(true);
        props.setTotal((total) => total - productPrice * quantity);
      })
      .catch((err) => console.log(err));
  };
  if (isDeleted) {
    return null;
  }

  return (
    <div className="cartitem-container">
      <div className="cartitem">
        <div className="cartitem-content">
          <img className="cartitem-img" src={props.image} alt={props.name} />
          <div className="cartitem-data">
            <h3>{props.name}</h3>
            <div className="cartitem-review">
              <p>{props.weight} gr.</p>
              <p className="rating">
                {props.rating.toFixed(1)} <Star></Star>
              </p>
            </div>
            <div className="cartitem-price">
              <p>$ {props.price}</p>
              <img src={heart} alt="heart" />
            </div>
          </div>
          <div className="cartitem-counter">
            <button onClick={decrease}>-</button>
            <p>{counter}</p>
            <button onClick={increase}>+</button>
          </div>
        </div>
      </div>
      <div className="trash-item">
        <Trash onClick={handleDelete} />
      </div>
    </div>
  );
};

export default CartItem;
