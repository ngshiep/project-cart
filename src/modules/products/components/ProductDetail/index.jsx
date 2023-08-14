import React from "react";

const ProductDetail = ({ price, quantity, title }) => {
  return (
    <div className="flex flex-col">
      <div className="w-full h-[250px]  bg-orange-200 rounded-md">img</div>
      <h3 className="text-base mt-2 ">{title}</h3>
      <span className="text-orange-600 capitalize">${price}</span>
      <span className="text-sm text-gray-500">
        {quantity > 0 ? `${quantity} sản phẩm có sẵn` : null}
      </span>
    </div>
  );
};

export default ProductDetail;
