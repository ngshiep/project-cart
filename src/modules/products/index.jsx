import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./components/ProductItem";
import actionTypes from "../../redux/actions/actionTypes";

const ProductsList = () => {
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

  const productReducer = useSelector((state) => state.productReducer);

  return (
    <div className="">
      <h3 className="text-center py-7 font-medium text-lg">Products</h3>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {productReducer.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCartClicked={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
