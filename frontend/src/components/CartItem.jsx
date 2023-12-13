//Cart Item component
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import FilteringComponent from "./FilteringComp";

const CartItem = ({ item }) => {
  return (
    <>
      <Card className="cart-item">
        <div>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
          <button onClick={() => clickToDelete(gift._id)}>Delete</button>
          <button>
            <Link
              style={{ textDecoration: "none" }}
              target="_blank"
              to="https://www.paypal.com/de/home"
            >
              Proceed to Pay
            </Link>
          </button>
        </div>
      </Card>
    </>
  );
};

export default CartItem;
