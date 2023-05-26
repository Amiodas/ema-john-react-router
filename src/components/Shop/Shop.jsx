import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import "./Shop.css";
import {
  addToDb,
  deleteShoppingCart,
  getCartFromDb,
} from "../../utilities/fakedb";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const products = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    const storedCart = getCartFromDb();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    addToDb(product.id);
  };

  const handleRemoveCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {navigation.state === "loading" && "Loading..."}
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} handleRemoveCart={handleRemoveCart}>
          <Link to="/orders">
            <button>Add Review</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
