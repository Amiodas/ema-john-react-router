import React, { useState } from "react";
import Cart from "../Cart/Cart";
import "./Orders.css";
import { Link, useLoaderData } from "react-router-dom";
import {
  deleteShoppingCart,
  removeFromDb,
} from "../../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);
  const handleDeleteItem = (id) => {
    const remaining = cart.filter((product) => product._id !== id);
    setCart(remaining);
    removeFromDb(id);
  };
  const handleRemoveCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div>
      <div className="orders-container">
        {cart.map((item) => (
          <div className="order-item" key={item._id}>
            <div className="order-item-body">
              <img src={item.img} alt="" />
              <div>
                <h4 className="order-title">{item.name}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Shipping Charge: ${item.shipping}</p>
              </div>
            </div>
            <div className="order-btn">
              <button onClick={() => handleDeleteItem(item._id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} handleRemoveCart={handleRemoveCart}>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
