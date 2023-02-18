import CartItem from "./Cartitem";
import "./Cart.css";
import NavbarWishlist1 from "../../components/navbar/NavbarWishlist1";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import Checkout from "../../components/buttons/Checkout";
import HeaderTime from "../../components/headerTime/HeaderTime";
import { useState, useEffect } from "react";

const Cart = ({ accessToken, productFetch }) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:2202/api/user/cart", {
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
  }, []);

  useEffect(() => {
    const filtered = productFetch.filter((product) => {
      return cartData.some((cartList) => cartList.itemId === product._id);
    });

    setFilteredProducts(filtered);
  }, [cartData, productFetch]);

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
            />
          );
        })}
      </div>
      <Checkout text="Check Out - Total $120" />
      <NavbarWishlist1 />
      <NavbarBottom />
    </div>
  );
};

export default Cart;
