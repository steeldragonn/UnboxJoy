//Cart Item component
import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

function CartItem(props) {
  const { gift, clickToDelete } = props;
  return (
    <>
      <Card className="GiftCard">
        <div>
          <h3>{gift.name}</h3>
          <p>Price: {gift.price}</p>
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
}

export default CartItem;
