import React from "react";

const Cart = ({ cart, handleRemoveCart, children }) => {
  // console.log(Array.isArray(props.cart));
  let totalPrice = 0;
  let totalShipping = 0;
  let grandTotal = 0;
  let tax = 0;
  let quantity = 0;

  for (const product of cart) {
    if (product.quantity === 0) {
      product.quantity = 1;
    }
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
    quantity = quantity + product.quantity;
  }

  tax = (totalPrice * 7) / 100;
  grandTotal = totalPrice + totalShipping + tax;
  return (
    <div>
      <h3>Cart</h3>
      <p>Selected Item: {quantity}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Shipping: ${totalShipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
      <div>
        <button onClick={handleRemoveCart}>Remove Cart</button>
      </div>
      <div style={{marginTop: "15px"}}>{children}</div>
    </div>
  );
};

export default Cart;
