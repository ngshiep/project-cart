import { createBrowserRouter } from "react-router-dom";
import { routers } from "../config/routers";
import ProductsList from "../modules/products";
import LayoutHome from "../views/pages/LayoutHome";
import Page404 from "../views/errors/Page404";
import Cart from "../modules/products/pages/Cart";

export const router = createBrowserRouter([
  {
    element: <LayoutHome />,
    children: [
      { path: "/", element: <ProductsList></ProductsList> },
      {
        path: routers.web.cart,
        element: <Cart></Cart>,
      },
    ],
  },
  {
    path: "/*",
    element: <Page404></Page404>,
  },
]);
