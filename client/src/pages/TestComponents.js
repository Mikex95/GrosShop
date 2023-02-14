import GreenButton from "../components/buttons/GreenButton";
import HeaderTime from "../components/headerTime/HeaderTime";
import NavbarBottom from "../components/navbar/NavbarBottom";
import BackArrow from "../components/backArrow/BackArrow";
import NavbarWishlist from "../components/navbar/NavbarWishlist";
import SearchBar from "../components/searchbar/SearchBar";
import BurgerMenu from "../components/burgerMenu/BurgerMenu";

const TestComponents = () => {
  return (
    <div>
      <HeaderTime backgroundcolor="white" />
      <BackArrow />
      <BurgerMenu />
      <SearchBar />
      <GreenButton text="Sign In" />
      <NavbarWishlist />
      <NavbarBottom />
    </div>
  );
};

export default TestComponents;
