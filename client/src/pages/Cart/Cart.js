import CartItem from "./Cartitem";
import "./Cart.css";
import NavbarWishlist1 from "../../components/navbar/NavbarWishlist1";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import Checkout from "../../components/buttons/Checkout";
import HeaderTime from "../../components/headerTime/HeaderTime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ accessToken, productFetch }) => {
  const [cartData, setCartData] = useState([]);

  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
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
  }, [accessToken]);

  console.log(cartData);

  useEffect(() => {
    const filtered = productFetch.filter((product) => {
      return cartData.some((cartList) => cartList.itemId === product._id);
    });

    setFilteredProducts(filtered);
  }, [cartData, productFetch]);



  useEffect(() => {
    const total = filteredProducts.reduce((acc, curr) => {
      const cartItem = cartData.find((item) => item.itemId === curr._id);
      console.log(cartItem);
      if (cartItem) {
        return acc + cartItem.quantity * curr.product_price;
      }
      return acc;
    }, 0);
    setTotal(total);
  }, [cartData, filteredProducts]);

  const switchToCheckout = (event) => {
    event.preventDefault();
    navigate("/checkout");
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
          const quantity = cartItem ? cartItem.quantity : 0;

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

            />
          );
        })}
      </div>


      <Checkout text={`Check Out - Total $${total}`} onClick={switchToCheckout} />
      <NavbarWishlist />

      <NavbarBottom />
    </div>
  );
};

export default Cart;
