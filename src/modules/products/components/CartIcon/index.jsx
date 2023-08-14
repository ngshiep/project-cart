import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import { routers } from "../../../../config/routers";
import actionTypes from "../../../../redux/actions/actionTypes";
import toast from "react-hot-toast";

export default function CartIcon() {
  const cartReducer = useSelector((state) => state.cartReducer);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenCart = () => {
    navigate(routers.web.cart);
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
    <>
      <div
        className="absolute md:right-5 right-3 lg:right-[100px] top-0  translate-y-1/2 cursor-pointer"
        onClick={handleClick}
        onMouseOver={handleClick}
      >
        <ShoppingCartIcon className=" text-orange-400"></ShoppingCartIcon>
        {cartReducer.length > 0 && (
          <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-[12px] w-4 h-4  rounded-full bg-orange-400 text-white text-center font-medium leading-[15px]">
            {cartReducer.length}
          </span>
        )}
      </div>
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        <div className="flex flex-col gap-2 min-w-[410px]">
          {cartReducer.map((cart) => (
            <div
              key={cart.id}
              className=" px-3 py-3 hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm overflow-hidden min-w-[300px] flex-1">
                  {cart.title}
                </p>
                <div className="flex items-center justify-center">
                  <p className="text-sm text-orange-500">$ {cart.price}</p>
                  <button
                    className="p-1 text-gray-400 hover:text-gray-300"
                    onClick={() => handleRemoveAllProduct(cart)}
                  >
                    <DeleteOutlineIcon className=" w-4 h-4"></DeleteOutlineIcon>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-3 pt-3 ">
          <span className="text-sm text-gray-400">
            {cartReducer.length} đã thêm vào giỏ hàng
          </span>
          <button
            className="bg-orange-400 text-white py-1 px-4 rounded-md"
            onClick={handleOpenCart}
          >
            Xem tất cả
          </button>
        </div>
      </Menu>
    </>
  );
}
