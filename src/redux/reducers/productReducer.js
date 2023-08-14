import actionTypes from "../actions/actionTypes";

const initialState = [
  { id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 10 },
  { id: 2, title: "T-Shirt White", price: 10.99, inventory: 10 },
  { id: 3, title: "iphone 12 pro", price: 700, inventory: 5 },
  { id: 4, title: "iphone 13 pro", price: 800, inventory: 5 },
  { id: 5, title: "iphone 14 pro", price: 820, inventory: 5 },
  { id: 6, title: "iphone 15 pro", price: 830, inventory: 5 },
  { id: 7, title: "iphone 16 pro", price: 840, inventory: 5 },
];

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.product.DECREASE_PRODUCT_IN_STOCK: {
      const foundIndex = state.findIndex(
        (product) => product.id === action.payload.product.id
      );
      const prevState = [...state];
      prevState[foundIndex].inventory =
        state[foundIndex].inventory - action.payload.quantity;
      return prevState;
    }
    case actionTypes.product.INCREASE_PRODUCT_IN_STOCK: {
      const foundIndex = state.findIndex(
        (product) => product.id === action.payload.product.id
      );
      console.log(
        "🚀 ~ file: productReducer.js:28 ~ productReducer ~ foundIndex:",
        foundIndex
      );
      if (foundIndex <= -1) {
        return state;
      }
      const prevState = [...state];
      prevState[foundIndex].inventory =
        state[foundIndex].inventory + action.payload.quantity;
      return prevState;
    }
    default:
      return state;
  }
};

export default productReducer;
