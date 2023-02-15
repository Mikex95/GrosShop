import CartItem from "./Wishlistitem";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import { ReactComponent as Trash } from "../../img/trash.svg";
import AddToCart from "../../components/buttons/AddToCart";
import { useState } from "react";
import HeaderTime from "../../components/headerTime/HeaderTime";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const Wishlist = () => {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((item) => product.name === item.name);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  // const removeFromCart = (productToRemove) => {
  //   setCart(cart.filter((product) => product !== productToRemove));
  // };

  // ==== Anzahl der CatItems=====
  // const getCartTotal = () => {
  //   return cart.reduce((sum, { quantity }) => sum + quantity, 0);
  // };

  return (
    <div>
      <HeaderTime />
      <div className="headline-details">
        <BackArrow></BackArrow>
        <h5>My Wishlist</h5>
        <Trash />
      </div>
      <CartItem name={"hallo"} />
      <AddToCart text="Add to Cart" />
      <NavbarWishlist />
      <NavbarBottom />
    </div>
  );
};

export default Wishlist;
