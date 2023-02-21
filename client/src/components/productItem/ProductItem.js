import heart from "../../img/heart.png";
import heartRed from "../../img/heart-red.png";
import { Link } from "react-router-dom";
import { ReactComponent as Star } from "../../img/star7.svg";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api";

import "./ProductItem.css";
const ProductItem = (props) => {
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    const fetchWishlistData = async () => {
      const response = await fetch(`${apiBaseUrl}user/wishlist`, {
        headers: {
          Authorization: `Bearer ${props.accessToken}`,
        },
      });
      const data = await response.json();
      const productIds = data.map((product) => product.itemId);
      setIsChecked(!productIds.includes(props.id));
    };

    fetchWishlistData();
  }, [props.accessToken, props.id]);

  const toggleCheck = (event) => {
    event.preventDefault();
    setIsChecked(!isChecked);
    if (isChecked) {
      addItemToWishList(event);
    } else {
      removeItemFromWishList(event);
    }
  };
  // Add Item to Wishlist
  const addItemToWishList = (event) => {
    event.preventDefault();

    const product = {
      itemId: props.id,
    };
    fetch(`${apiBaseUrl}user/wishlist/additem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.accessToken,
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  // Remove Item by ID
  const removeItemFromWishList = (event) => {
    event.preventDefault();
    const productId = props.id;
    fetch(`${apiBaseUrl}user/wishlist/deleteitem/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + props.accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="product-container">
      <Link to={`/product/${props.id}`}>
        <div className="article-container-home category-effect">
          <div className="images-home-container">
            <img className="image-item category-effect" src={props.image} alt={props.name} />

            <img
              onClick={toggleCheck}
              className="heart-home category-effect"
              src={isChecked === false ? heartRed : heart}
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
