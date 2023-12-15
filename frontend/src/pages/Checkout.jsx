import React, { useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    //form validation
    const requiredFields = [
      "fullName",
      "address",
      "city",
      "zipcode",
      "cardNumber",
      "expirationDate",
      "cvc",
    ];
    return requiredFields.every((field) => formData[field].trim() !== "");
  };

  return (
    <div>
      <h2>Checkout Page</h2>
      <form className="checkout-page">
        <p className="form-title">Contact</p>
        <label>
          Full name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email (optional):
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <p className="form-title">Shipping Address:</p>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          ZIP code:
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
        </label>

        <p className="form-title">Payment Information</p>
        <label>
          Card number:
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Exp date:
          <input
            type="text"
            name="expirationDate"
            placeholder="MM/YY"
            value={formData.expirationDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          CVC:
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={formData.cvc}
            onChange={handleChange}
            required
          />
        </label>
      </form>

      <Link to={isFormValid() ? "/payment" : "#"}>
        <button type="submit" disabled={!isFormValid()}>
          Proceed to payment
        </button>
      </Link>

      <Link to="/cart">
        <button>Return to Cart</button>
      </Link>
      <Link to="/gifts">
        <button>Continue shopping...</button>
      </Link>
    </div>
  );
};

export default Checkout;
