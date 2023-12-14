import { useState } from "react";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import "./App.css";
import GiftDetailsPage from "./pages/GiftDetailsPage";
import GiftFavorites from "./pages/GiftFavorites";
import Checkout from "./pages/Checkout";
import { AuthProviderWrapper } from "./context/auth.context";

import "bootstrap/dist/css/bootstrap.min.css";


import Payment from "./pages/Payment";

import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

  const handleClick = (item) => {
    console.log(item);
  };
  const updateCart = (newCart) => {
    setCart(newCart);
  };
  return (
    <div className="App">
      <AuthProviderWrapper>
        <Navbar cartLength={cart.length} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/gifts" element={<HomePage />} />
          <Route
            path="/gifts/:giftId"
            element={<GiftDetailsPage updateCart={updateCart} />}
          />
          <Route path="/favorites" element={<GiftFavorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </AuthProviderWrapper>
    </div>
  );
}

export default App;
