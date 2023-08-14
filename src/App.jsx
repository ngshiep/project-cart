import React from "react";
import "./App.css";
import Cart from "./components/Cart";
import CartIcon from "./modules/products/components/CartIcon";

function App() {
  return (
    <div className="py-5 md:px-[100px] px-5">
      <div className="relative">
        <h2 className="font-bold text-2xl text-center">Shopping Cart</h2>
        <CartIcon></CartIcon>
      </div>
      <hr />
      <Cart />
    </div>
  );
}

export default App;
