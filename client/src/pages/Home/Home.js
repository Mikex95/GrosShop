import "./Home.css";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import NavbarWishlist1 from "../../components/navbar/NavbarWishlist1";
import HeaderTime from "../../components/headerTime/HeaderTime";
import BurgerMenu from "../../components/burgerMenu/BurgerMenu";
import SearchBar from "../../components/searchbar/SearchBar";
import Location from "../../components/location/Location";
import CategoriesHome from "../../components/categoriesHome/CategoriesHome";
import fries from "../../img/fries-home.png";
import ProductItem from "../../components/productItem/ProductItem";

const Home = ({ accessToken, productFetch }) => {
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
            <h3>Get 20% off!</h3>
          </div>
        </div>
        <div className="image-container-discount-bread">
          <div className="text-container">
            <h3>Today! Buy one bread and get two! </h3>
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

      <NavbarWishlist1 />

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
