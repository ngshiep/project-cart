import React from "react";
import CartIcon from "../../../modules/products/components/CartIcon";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function LayoutHome() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[58px] z-20 shadow-md shadow-orange-100 bg-white flex justify-center items-center mx-auto md:px-5 px-3 lg:px-[100px]">
        <h2 className="font-bold text-2xl text-center">Shopping Cart</h2>
        <CartIcon></CartIcon>
      </div>
      <div className="pb-5 lg:px-[100px] md:px-5 px-3 mt-[58px]">
        <Outlet></Outlet>
        <Toaster />
      </div>
    </>
  );
}
