import GreenButton from "../components/buttons/GreenButton";
import HeaderTime from "../components/headerTime/HeaderTime";
import NavbarBottom from "../components/navbar/NavbarBottom";
import BackArrow from "../components/backArrow/BackArrow";
import NavbarWishlist from "../components/navbar/NavbarWishlist";

const TestComponents = () => {
	return (
		<div>
			<HeaderTime backgroundcolor="white" />
			<BackArrow />
			<GreenButton text="Sign In" />
			<NavbarWishlist></NavbarWishlist>
			<NavbarBottom />
		</div>
	);
};

export default TestComponents;
