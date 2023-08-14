import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductDetail from "../modules/products/components/ProductDetail";
import actionTypes from "../redux/actions/actionTypes";

const Cart = () => {
  const cartReducer = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch({
      type: actionTypes.cart.ADD_TO_CART,
      payload: { product, quantityInCart: 1 },
    });
    dispatch({
      type: actionTypes.product.DECREASE_PRODUCT_IN_STOCK,
      payload: { product, quantity: 1 },
    });
  };
  return (
    <div>
      <h3>Your Cart</h3>
      {/* Nodes */}
      {cartReducer.map((cart) => (
        <div key={cart.id}>
          <ProductDetail
            title={cart.title}
            quantity={cart.quantityInCart}
            price={cart.price}
          />
          <button>Delete</button>
        </div>
      ))}
      {/* Total price */}
      <p>
        Total:{" "}
        {cartReducer.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price * currentValue.quantityInCart;
        }, 0)}
      </p>
      <button>Checkout</button>
    </div>
  );
};

export default Cart;
