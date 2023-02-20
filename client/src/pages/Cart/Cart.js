import CartItem from "./Cartitem";
import "./Cart.css";
import NavbarWishlist1 from "../../components/navbar/NavbarWishlist1";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import Checkout from "../../components/buttons/Checkout";
import HeaderTime from "../../components/headerTime/HeaderTime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api";

const Cart = ({ accessToken, productFetch }) => {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [counterValues, setCounterValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBaseUrl}user/cart`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartData(data);
        setLoading(false);
      });
  }, [accessToken]);

  console.log(cartData);

  useEffect(() => {
    const filtered = productFetch.filter((product) => {
      return cartData.some((cartList) => cartList.itemId === product._id);
    });

    setFilteredProducts(filtered);
  }, [cartData, productFetch]);

  const handleCounterChange = (value, id) => {
    const newCounterValues = { ...counterValues, [id]: value || 1 };
    setCounterValues(newCounterValues);
  };

  useEffect(() => {
    const newTotal = filteredProducts.reduce((acc, curr) => {
      const cartItem = cartData.find((item) => item.itemId === curr._id);
      const counterValue = counterValues[curr._id] || cartItem?.quantity || 0;
      return acc + counterValue * curr.product_price;
    }, 0);
    setTotal(newTotal);
  }, [cartData, filteredProducts, counterValues]);

  const switchToCheckout = (event) => {
    event.preventDefault();

    const cartProduct = filteredProducts.map((product) => {
      const cartItem = cartData.find((item) => item.itemId === product._id);
      const quantity = cartItem ? counterValues[product._id] - cartItem.quantity || 0 : counterValues[product._id] || 1;

      return {
        itemId: product._id,
        productName: product.product_name,
        productImage: product.product_image,
        productPrice: product.product_price,
        countInStock: product.product_stock,
        quantity: quantity,
      };
    });

    Promise.all(
      cartProduct.map((item) => {
        return fetch(`${apiBaseUrl}user/cart/additem`, {
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
      .then((cartData) => {
        setCartData(cartData);
        navigate("/checkout");
      })
      .catch((error) => {
        console.error("Error adding items to cart:", error);
      });
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="cart-container">
      <HeaderTime backgroundcolor={"green"} />
      <div className="headline-details">
        <BackArrow></BackArrow>
        <h5>My Cart</h5>
      </div>
      <div className="grid-cart-item">
        {filteredProducts.map((wishlistProduct, index) => {
          const cartItem = cartData.find((item) => item.itemId === wishlistProduct._id);
          const quantity = cartItem ? cartItem.quantity : 1;
          return (
            <CartItem
              key={index}
              id={wishlistProduct._id}
              name={wishlistProduct.product_name}
              weight={wishlistProduct.product_weight}
              price={wishlistProduct.product_price}
              rating={wishlistProduct.product_rating}
              image={wishlistProduct.product_image}
              accessToken={accessToken}
              counter={quantity}
              setTotal={setTotal}
              onCounterChange={(value) => handleCounterChange(value, wishlistProduct._id)}
            />
          );
        })}
      </div>
      <Checkout text={`Check Out - Total $${total}`} onClick={switchToCheckout} />
      <NavbarWishlist1 />
      <NavbarBottom />
    </div>
  );
};

export default Cart;
