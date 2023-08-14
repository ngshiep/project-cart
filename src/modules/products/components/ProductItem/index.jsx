import React from "react";
import ProductDetail from "../ProductDetail";

const ProductItem = ({ product, onAddToCartClicked }) => (
  <div className="shadow-lg border border-orange-50 rounded-md p-4 relative hover:scale-[1.002] hover:shadow-xl transition-all duration-75">
    <ProductDetail
      title={product.title}
      price={product.price}
      quantity={product.inventory}
    />
    <button
      onClick={onAddToCartClicked}
      disabled={product.inventory <= 0}
      className="bg-orange-400 px-4 py-2 rounded-md text-white font-medium hover:bg-orange-300 absolute bottom-5 right-5"
    >
      {product.inventory > 0 ? "Add to cart" : "Sold Out"}
    </button>
  </div>
);

export default ProductItem;
