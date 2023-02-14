import "./Cart.css";
import "../Home/Home.css";
import { apiBaseUrl } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import heart from "../../img/heart.png";
import { Link } from "react-router-dom";
import { ReactComponent as Star } from "../../img/star7.svg";

const CartItem = (props) => {
  const [counter, setCounter] = useState(0);
  // const [product, setProduct] = useState();
  // const { id: productId } = useParams();

  // useEffect(() => {
  //   fetch(`${apiBaseUrl}/products/${productId}`)
  //     .then((res) => res.json())
  //     .then((productResult) => setProduct(productResult));
  // }, [productId]);

  const increase = () => {
    setCounter((count) => count + 1);
  };

  const decrease = () => {
    if (counter > 0) {
      setCounter((count) => count - 1);
    }
  };

  return (
    <div className="cartitem-container">
      <div className="cartitem">
        <input type="radio" />
        <div className="cartitem-content">
          <img
            className="cartitem-img"
            src="http://www.fastfoodmenunutrition.com/wp-content/uploads/2015/03/fast-food.jpg"
            alt=""
          />
          <div className="cartitem-data">
            <h3>{props.name}</h3>
            <div className="cartitem-review">
              <p>Gewicht</p>
              <p className="rating">
                <Star></Star> (450 Review)
              </p>
            </div>
            <div className="cartitem-price">
              <p>Price$</p>
              <img src={heart} alt="" />
            </div>
          </div>
          <div className="cartitem-counter">
            <button onClick={decrease}>-</button>
            <p>{counter}</p>
            <button onClick={increase}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
