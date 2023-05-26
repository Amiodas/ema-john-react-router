import { getCartFromDb } from "../utilities/fakedb";

const cartProductLoader = async () => {
  const loadedProducts = await fetch("product.json");
  const products = await loadedProducts.json();
  
  const storedCart = getCartFromDb();
  const savedCart = [];

  for(const id in storedCart) {
    const addedProduct =  products.find((product) => product.id === id)
    if(addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
    }
}
  return savedCart;
};

export default cartProductLoader;
