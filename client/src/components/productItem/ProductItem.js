import heart from "../../img/heart.png";
import heartRed from "../../img/heart-red.png";
import { Link } from "react-router-dom";
import { ReactComponent as Star } from "../../img/star7.svg";
import { useState } from "react";

import "./ProductItem.css";
const ProductItem = (props) => {
  const [isChecked, setIsChecked] = useState(true);
  const toggleCheck = (event) => {
    event.preventDefault();
    setIsChecked(!isChecked);
    if (!isChecked) {
      addItemToWishList();
    }
  };

  const addItemToWishList = () => {
    // Test

    // const accessToken = localStorage.getItem("accessToken");

    // Test
    const product = {
      id: props._id,
      name: props.product_name,
      price: props.product_price,
      image: props.product_image,
      weight: props.product_weight,
      rating: props.product_rating,
    };

    fetch("http://localhost:2202/user/wishlist/additem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="product-container">
      <Link to={`/product/${props.id}`}>
        <div className="article-container-home category-effect">
          <div className="images-home-container">
            <img
              className="image-item category-effect"
              src={props.image}
              alt={props.name}
            />

            <img
              onClick={toggleCheck}
              className="heart-home category-effect"
              src={isChecked ? heart : heartRed}
              alt={props.name}
            />
          </div>
          <h5>{props.name.slice(0, 21)}</h5>
        </div>

        <div className="price-rating-container">
          <p className="price">
            {props.price}$ {props.discount}
          </p>
          <p className="rating">
            <Star></Star> {props.rating.toFixed(1)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
