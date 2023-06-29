import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Shop from "./components/Shop/Shop.jsx";
import Orders from "./components/Orders/Orders.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import cartProductLoader from "./loaders/cartProductsLoader.js";
import Checkout from "./components/Checkout/Checkout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Shop />,
        loader: () => fetch("http://localhost:5000/totalProducts"),
      },
      {
        path: "/orders",
        element: <Orders />,
        loader: cartProductLoader,
      },
      {
        path: "/inventory",
        element: <div>Inventory</div>,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/login",
        element: <div>Login</div>,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
