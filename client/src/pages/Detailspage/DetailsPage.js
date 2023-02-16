import "./DetailsPage.css";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import HeaderTime from "../../components/headerTime/HeaderTime";
import BackArrow from "../../components/backArrow/BackArrow";
import { ReactComponent as CartDetails } from "../../img/shopping-cart-detail.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const DetailsPage = ({ productFetch, accessToken }) => {
  const [count, setCount] = useState(1);
  const [cartListData, setCartListData] = useState([]);
  const [cartCounter, setCartCounter] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const foodDetails = productFetch.find((product) => product._id === id);

  useEffect(() => {
    fetch("http://localhost:2202/api/user/cart", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartCounter(data);
        const quantities = data.map((product) => product.quantity);
        const sum = quantities.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        setCartLength(sum);
      });
  }, [accessToken]);

  const eventHandler = (e) => {
    e.preventDefault();

    const cartProduct = [
      {
        itemId: foodDetails._id,
        productName: foodDetails.product_name,
        productImage: foodDetails.product_image,
        productPrice: foodDetails.product_price,
        countInStock: foodDetails.product_stock,
        quantity: count,
      },
    ];

    Promise.all(
      cartProduct.map((item) => {
        return fetch("http://localhost:2202/api/user/cart/additem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify(item),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Added item to cart:", data);
            return data;
          })
          .catch((error) => {
            console.error("Error adding item to cart:", error);
          });
      })
    )
      .then((cartListData) => {
        setCartListData(cartListData);
        navigate("/cart");
      })
      .catch((error) => {
        console.error("Error adding items to cart:", error);
      });
  };

  return (
    <div>
      <HeaderTime backgroundcolor={"green"} color={"white"} />
      <div className="headline-details">
        <BackArrow />
        <h5>Grocery Deals</h5>
      </div>
      <section className="detail-image">
        <div>
          <img src={foodDetails.product_image} alt={foodDetails.product_name} />
        </div>
        <p className="detail-weight">{foodDetails.product_weight} gr.</p>
        <p className="detail-price">$ {foodDetails.product_price.toFixed(2)}</p>
        <p className="detail-name">{foodDetails.product_name}</p>
        <p className="detail-rating">⭐️ {foodDetails.product_rating.toFixed(1)}</p>
      </section>
      <section className="quantity-container">
        <p className="quantity-tag">Quantity</p>
        <div className="plus-minus-details">
          <p onClick={() => setCount(count - 1 < 0 ? count : count - 1)} className="counter">
            -
          </p>
          <p className="counter-details">{count}</p>
          <p onClick={() => setCount(count + 1 > 20 ? count : count + 1)} className="counter">
            +
          </p>
        </div>
        <div className="cart-icon-container">
          <div>
            <CartDetails className="cart-details" />
            <p>{cartLength}</p>
          </div>
        </div>
        <div className="button-details-container">
          <button onClick={eventHandler}>Add to Cart</button>
        </div>
      </section>
      <NavbarBottom />
    </div>
  );
};

export default DetailsPage;
