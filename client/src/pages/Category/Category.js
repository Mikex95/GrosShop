import HeaderTime from "../../components/headerTime/HeaderTime";
import BackArrow from "../../components/backArrow/BackArrow";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import ProductItem from "../../components/productItem/ProductItem";
import { useState, useEffect } from "react";
import baguette from "../../img/baguette.png";
import SearchBarCategory from "../../components/searchbar/SearchBarCategory";
import { useLocation } from "react-router-dom";
import { apiBaseUrl } from "../../api";
import "./Category.css";
const Category = ({ accessToken }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryParams = params.get("category");

  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(0);

  const categoryButtons = ["All", "Vegetables", "Fruits", "Meat", "Seafood", "Bread"];

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBaseUrl}/products`)
      .then((response) => response.json())
      .then((data) => {
        setCategories([...data.allProducts]);
        setAllProducts(data.allProducts);
        setLoading(false);
        if (categoryParams) {
          setSelectedCategory(categoryParams);
          const index = categoryButtons.indexOf(categoryParams);
          setIsActive(index >= 0 ? index : 0);
        }
      });
  }, []);

  const handleFilteredProducts = (products) => {
    setCategories(products.length > 0 ? [...products] : [...allProducts]);
  };

  const handlerOnClick = (index, event, category) => {
    event.preventDefault();
    setIsActive(index);
    handleCategoryChange(category);
  };

  const handleCategoryChange = (param) => {
    setSelectedCategory(param);
  };

  function getFilteredList() {
    if (selectedCategory === "All") {
      return categories;
    }
    return categories.filter((category) => category.product_category === selectedCategory);
  }

  const filteredList = getFilteredList();

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <HeaderTime backgroundcolor="green" color={"white"} />
      </div>
      <div className="headline-category">
        <BackArrow></BackArrow>
        <SearchBarCategory fetch={allProducts} onFilter={handleFilteredProducts} />
      </div>
      <div className="category-buttons">
        {categoryButtons.map((category, index) => {
          return (
            <button
              key={index}
              onClick={(event) => handlerOnClick(index, event, category)}
              style={{
                borderBottom: isActive === index ? "1px solid green" : "",
              }}>
              {category}
            </button>
          );
        })}
      </div>
      <div className="product-grid">
        {filteredList.slice(0, 6).map((article, index) => {
          return (
            <ProductItem
              accessToken={accessToken}
              key={index}
              name={article.product_name}
              price={article.product_price}
              rating={article.product_rating}
              image={article.product_image}
              id={article._id}></ProductItem>
          );
        })}
      </div>
      <div>
        <img src={baguette} alt="baguette" />
      </div>
      <div className="category-buttons-bottom">
        {filteredList.slice(7, categories.length).map((article, index) => {
          return (
            <ProductItem
              accessToken={accessToken}
              key={index}
              name={article.product_name}
              price={article.product_price}
              rating={article.product_rating}
              image={article.product_image}
              id={article._id}></ProductItem>
          );
        })}
      </div>
      <h3 className="category-available-soon">More products will be available soon!</h3>
      <NavbarBottom></NavbarBottom>
    </div>
  );
};

export default Category;
