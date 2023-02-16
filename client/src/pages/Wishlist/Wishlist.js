import "./Wishlist.css";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import AddToCart from "../../components/buttons/AddToCart";
import { useState, useEffect } from "react";
import HeaderTime from "../../components/headerTime/HeaderTime";
import WishlistItem from "./Wishlistitem";
import { useNavigate } from "react-router-dom";

const Wishlist = ({ accessToken, productFetch }) => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [counterValues, setCounterValues] = useState({});
  const [cartListData, setCartListData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:2202/api/user/wishlist", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWishlistData(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = productFetch.filter((product) => {
      return wishlistData.some((wishlist) => wishlist.itemId === product._id);
    });

    setFilteredProducts(filtered);
  }, [wishlistData, productFetch]);

  const handleCounterChange = (id, value) => {
    const newCounterValues = { ...counterValues, [id]: value || 0 };
    setCounterValues(newCounterValues);
  };

  const eventHandler = (e) => {
    e.preventDefault();

    const cartProduct = filteredProducts.map((product) => ({
      itemId: product._id,
      productName: product.product_name,
      productImage: product.product_image,
      productPrice: product.product_price,
      countInStock: product.product_stock,
      quantity: counterValues[product._id] || 1,
    }));

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
    <div className="wishlist-container">
      <HeaderTime backgroundcolor={"green"} />
      <div className="backarrow-trash-container">
        <div className="headline-details">
          <BackArrow></BackArrow>
          <h5>My Wishlist</h5>
        </div>
      </div>
      <div className="grid-cart-item">
        {filteredProducts.map((wishlistProduct, index) => {
          return (
            <WishlistItem
              key={index}
              id={wishlistProduct._id}
              name={wishlistProduct.product_name}
              weight={wishlistProduct.product_weight}
              price={wishlistProduct.product_price}
              rating={wishlistProduct.product_rating}
              image={wishlistProduct.product_image}
              accessToken={accessToken}
              setFilteredProducts={setFilteredProducts}
              onCounterChange={(value) => handleCounterChange(wishlistProduct._id, value)}
            />
          );
        })}
      </div>
      <AddToCart text={"Add to Cart"} onClick={eventHandler} />
      <NavbarWishlist />
      <NavbarBottom />
    </div>
  );
};

export default Wishlist;
