import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty) => {
    setCartItems((prev) => {
      const existItem = prev.find((x) => x.product === product._id);
      if (existItem) {
        return prev.map((x) =>
          x.product === existItem.product
            ? { ...product, qty, product: product._id }
            : x,
        );
      } else {
        return [...prev, { ...product, qty, product: product._id }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((x) => x.product !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
