import React from "react";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../../../../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const cartReducer = useSelector((state) => state.cartReducer);
  const productReducer = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddOneProductToCart = (cart) => {
    const foundProduct = productReducer.find((pr) => pr.id === cart.id);
    if (foundProduct.inventory === 0) {
      toast.error("Không còn sản phẩm để thêm vào giỏ hàng");
      return;
    }
    dispatch({
      type: actionTypes.cart.ADD_TO_CART,
      payload: { product: cart, quantityInCart: 1 },
    });
    dispatch({
      type: actionTypes.product.DECREASE_PRODUCT_IN_STOCK,
      payload: { product: cart, quantity: 1 },
    });
  };

  const handleRemoveOneProductToCart = (cart) => {
    dispatch({
      type: actionTypes.cart.DECREASE_PRODUCT_IN_CART,
      payload: { product: cart, quantityInCart: 1 },
    });
    dispatch({
      type: actionTypes.product.INCREASE_PRODUCT_IN_STOCK,
      payload: { product: cart, quantity: 1 },
    });
  };

  const handleRemoveAllProduct = (product) => {
    dispatch({
      type: actionTypes.cart.REMOVE_ALL_PRODUCT_IN_CART,
      payload: { product },
    });

    dispatch({
      type: actionTypes.product.INCREASE_PRODUCT_IN_STOCK,
      payload: { product, quantity: product.quantityInCart },
    });
    toast.success(`Đã loại bỏ ${product.title} ra khỏi giỏ hàng`);
  };

  return (
    <div className="max-w-[1200px] mx-auto h-screen p-6 ">
      <div className=" flex flex-col gap-5">
        {cartReducer &&
          cartReducer.map((cart) => {
            return (
              <div
                className="grid grid-cols-2 gap-2 min-h-[90px] border rounded-md"
                key={cart.id}
              >
                <div className="w-full h-full flex items-center pl-5">
                  {cart.title}
                </div>
                <div className="grid grid-cols-4">
                  <div className="w-full h-full flex items-center justify-center">
                    {cart.price}
                  </div>
                  <div className="w-full h-full flex items-center justify-center">
                    <div>
                      <button
                        className="border px-2 py-[1px]"
                        onClick={() => handleRemoveOneProductToCart(cart)}
                      >
                        -
                      </button>
                      <span className="border border-x-0 px-4 py-[3px] text-[15px]">
                        {cart.quantityInCart}
                      </span>
                      <button
                        className="border px-2 py-[1px]"
                        onClick={() => handleAddOneProductToCart(cart)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-full flex items-center justify-center text-orange-400">
                    {cart.price * cart.quantityInCart}
                  </div>
                  <div className="w-full h-full flex items-center justify-center">
                    <button
                      className="text-gray-500"
                      onClick={() => handleRemoveAllProduct(cart)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        {cartReducer.length === 0 && (
          <div className="mt-9 mx-auto text-orange-500 text-lg mb-9">
            Không có sản phẩm nào trong giỏ hàng
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 mt-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Go back</span>
        </button>
      </div>
    </div>
  );
}
