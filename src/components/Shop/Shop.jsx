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
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { totalProducts } = useLoaderData();
  const navigation = useNavigation();

  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()];

  const options = [10, 15, 20];

  // second method
  // const pageNumbers = [];
  // for (let i = 0; i < totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  useEffect(() => {
    fetch(
      `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getCartFromDb();
    const ids = Object.keys(storedCart);

    fetch("http://localhost:5000/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const savedCart = [];
        for (const id in storedCart) {
          const addedProduct = cartProducts.find(
            (product) => product._id === id
          );
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    addToDb(product._id);
  };

  const handleRemoveCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };
  return (
    <>
      <div className="shop-container">
        <div className="product-container">
          {navigation.state === "loading" && "Loading..."}
          {products.map((product) => (
            <Product
              key={product._id}
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
      <div className="pagination">
        <p>Current Page: {currentPage}</p>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
