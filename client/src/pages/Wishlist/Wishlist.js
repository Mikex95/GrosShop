import "./Wishlist.css";
import NavbarWishlist1 from "../../components/navbar/NavbarWishlist1";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import AddToCart from "../../components/buttons/AddToCart";
import { useState, useEffect } from "react";
import HeaderTime from "../../components/headerTime/HeaderTime";
import WishlistItem from "./Wishlistitem";

const Wishlist = ({ accessToken, productFetch }) => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [counterValues, setCounterValues] = useState({});
  const [cartListData, setCartListData] = useState([]);

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

  const cartProduct = filteredProducts.map((product) => ({
    itemId: product._id,
    productName: product.product_name,
    productImage: product.product_image,
    productPrice: product.product_price,
    countInStock: product.product_stock,
    quantity: counterValues[product._id] || 0,
  }));

  console.log(cartProduct);
  const eventHandler = (e) => {
    e.preventDefault();

    cartProduct.forEach((item) => {
      fetch("http://localhost:2202/api/user/cart/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(item),
      })
        .then((response) => response.json())
        .then((data) => {
          setCartListData(data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    });
  };

  const handleCounterChange = (productId, newCounter) => {
    setCounterValues((prevValues) => ({
      ...prevValues,
      [productId]: newCounter,
    }));
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  console.log(filteredProducts);

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
              onCounterChange={handleCounterChange}
            />
          );
        })}
      </div>
      <AddToCart text={"Add to Cart"} onClick={eventHandler} />
      <NavbarWishlist1 />
      <NavbarBottom />
    </div>
  );
};

export default Wishlist;
