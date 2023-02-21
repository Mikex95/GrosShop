import "./OrderHistory.css";
import NavbarBottom from "../../components/navbar/NavbarBottom";
import NavbarWishlist1 from "../../components/navbar/NavbarWishlist1";
import HeaderTime from "../../components/headerTime/HeaderTime";
import BackArrow from "../../components/backArrow/BackArrow";
import Order from "../../components/order/Order";

const OrderHistory = () => {
  return (
    <div className="order-history-container">
      <HeaderTime backgroundcolor="green" color={"white"} />
      <div className="order-history-back-arrow">
        <BackArrow></BackArrow>
        <h5>Order History</h5>
      </div>
      <section className="history-button-container">
        <button className="oder-history-button">All</button>
      </section>
      <section className="order-grid-component">
        <Order
          order={"EW454648"}
          status={"Pending"}
          paid={"Paid"}
          date={"25 May, 11:00am"}
          endPrice={"60$"}></Order>
        <Order
          order={"EW454648"}
          status={"Processing"}
          paid={"Paid"}
          date={"28 May, 11:00am"}
          endPrice={"120$"}></Order>
      </section>
      <NavbarWishlist1 />
      <NavbarBottom></NavbarBottom>
    </div>
  );
};

export default OrderHistory;
