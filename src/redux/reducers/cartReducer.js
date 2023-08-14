import actionTypes from "../actions/actionTypes";

const intialState = [];

const cartReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.cart.ADD_TO_CART: {
      //ktra state có id của action.payload.product.id ==> nếu như có ==> update qty + 1
      //nếu state chưa có id của action.payload.product.id => thêm 1 object mới, qtity = 1
      const foundIndex = state.findIndex(
        (product) => product.id === action.payload.product.id
      );

      if (foundIndex >= 0) {
        const prevState = [...state];
        prevState[foundIndex].quantityInCart =
          state[foundIndex].quantityInCart + action.payload.quantityInCart;
        return prevState;
      }

      return [
        ...state,
        {
          ...action.payload.product,
          quantityInCart: action.payload.quantityInCart,
        },
      ];
    }
    case actionTypes.cart.DECREASE_PRODUCT_IN_CART: {
      const foundIndex = state.findIndex(
        (product) => product.id === action.payload.product.id
      );

      if (foundIndex >= 0) {
        let prevState = [...state];
        prevState[foundIndex].quantityInCart =
          state[foundIndex].quantityInCart - action.payload.quantityInCart;
        prevState = prevState.filter((x) => x.quantityInCart !== 0);
        return prevState;
      }
      return state;
    }
    case actionTypes.cart.REMOVE_ALL_PRODUCT_IN_CART: {
      let prevState = [...state];
      prevState = prevState.filter(
        (product) => product.id !== action.payload.product.id
      );
      return prevState;
    }
    default:
      return state;
  }
};

export default cartReducer;
