import CartItem from "./Cartitem";
import NavbarWishlist from "../../components/navbar/NavbarWishlist";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import BackArrow from "../../components/backArrow/BackArrow";
import { ReactComponent as Trash } from "../../img/trash.svg";
import Checkout from "../../components/buttons/Checkout";
import HeaderTime from "../../components/headerTime/HeaderTime";

const Cart = () => {
  // const removeFromCart = (productToRemove) => {
  //   setCart(cart.filter((product) => product !== productToRemove));
  // };

  return (
    <div>
      <HeaderTime backgroundcolor={"green"} />
      <div className="headline-details">
        <BackArrow></BackArrow>
        <h5>My Cart</h5>
        <Trash />
      </div>
      <CartItem name={"hallo"} />
      <Checkout text="Check Out - Total $120" />
      <NavbarWishlist />
      <NavbarBottom />
    </div>
  );
};

export default Cart;
