import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartNum, setCartNum] = useState(0);
  const [loading, setLoading] = useState(true);

  // Function to calculate total quantity in cart
  const calculateTotalQuantity = (cart = []) => {
    return cart.reduce((sum, cartItem) => sum + (cartItem.quantity || 0), 0);
  };

  // Load cart from localStorage when the app starts
  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartFromStorage);
    setCartNum(calculateTotalQuantity(cartFromStorage));
    setLoading(false);
  }, []);

  // Update localStorage & cartNum whenever cart changes. But it empty out on hard refresh. Can't be used
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   setCartNum(calculateTotalQuantity(cart));
  // }, [cart]);

  /**
   * @param {object} item
   * Adds item to cart
   */
  const handleAddtoCart = (item) => {
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    // Does the item exists
    if (existingItemIndex !== -1) {
      //update the quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      //add it with a quantity of 1
      cart.push({ ...item, quantity: 1 });
    }

    //update values in state | local |
    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartNum(calculateTotalQuantity(cart));
  };

  /**
   * Clears cart
   */
  const handleClearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartNum(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartNum,
        loading,
        handleAddtoCart,
        handleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
