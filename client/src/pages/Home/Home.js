import "./Home.css";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import HeaderTime from "../../components/headerTime/HeaderTime";
import BurgerMenu from "../../components/burgerMenu/BurgerMenu";
import SearchBar from "../../components/searchbar/SearchBar";
import Location from "../../components/location/Location";
import CategoriesHome from "../../components/categoriesHome/CategoriesHome";
import fries from "../../img/fries-home.png";
import ProductItem from "../../components/productItem/ProductItem";
import { useState, useEffect } from "react";

const Home = ({ accessToken, productFetch }) => {
  const [changeToggle, setChangeToggle] = useState(false);
  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2202/api/user/wishlist", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWishList(data);
      });
  }, []);
  return (
    <div>
      <HeaderTime backgroundcolor="green" color={"white"} />
      <Location />
      <div className="searchbar-container">
        <BurgerMenu />
        <SearchBar fetch={productFetch} />
      </div>
      <div className="discount-grid-container">
        <div className="image-container-discount">
          <div className="text-container">
            <h3>Get 20% off</h3>
          </div>
        </div>
        <div className="image-container-discount">
          <div className="text-container">
            <h3>Get 20% off</h3>
          </div>
        </div>
      </div>
      <CategoriesHome />
      <section className="product-deals-home">
        <h5 className="deals">Today Grocery Deals</h5>
        <div className="product-grid">
          {productFetch.slice(16, 22).map((article, index) => {
            return (
              <ProductItem
                key={index}
                accessToken={accessToken}
                name={article.product_name}
                price={article.product_price}
                rating={article.product_rating}
                image={article.product_image}
                id={article._id}></ProductItem>
            );
          })}
        </div>
      </section>
      <NavbarWishlist />
      <NavbarBottom></NavbarBottom>
      <section className="image-fries-home">
        <img src={fries} alt="fries" />
      </section>
      <section className="product-deals-home">
        <h5 className="deals">Grocery Member Deals</h5>
        <div className="product-grid">
          {productFetch.slice(5, 8).map((article, index) => {
            return (
              <ProductItem
                key={index}
                accessToken={accessToken}
                name={article.product_name}
                price={article.product_price}
                rating={article.product_rating}
                image={article.product_image}
                id={article._id}></ProductItem>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
