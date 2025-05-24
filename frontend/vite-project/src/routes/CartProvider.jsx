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

  // Update localStorage & cartNum whenever cart changes.
  // But it empty out on hard refresh. Can't be used
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   setCartNum(calculateTotalQuantity(cart));
  // }, [cart]);

  /**
   * @param {object} item
   * Adds item to cart
   */
  const handleAddtoCart = (item) => {
    // update cart item #
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

    // if item not in cart. push into cart array
    if (!cart.find((cartItem) => cartItem.id === item.id)) {
      updatedCart.push({ ...item, quantity: 1 });
    }

    // update cart
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartNum(calculateTotalQuantity(updatedCart));
  };

  /**
   * Clears cart
   */
  const handleClearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartNum(0);
  };

  /**
   * @param {String} id
   */
  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.reduce((acc, item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
        // If quantity is 1, don't add the item (effectively removing it)
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartNum(calculateTotalQuantity(updatedCart));
  };

  /**
   * @param {String} id
   */
  const handleDeleteFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartNum(calculateTotalQuantity(updatedCart));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartNum,
        loading,
        handleAddtoCart,
        handleClearCart,
        handleRemoveFromCart,
        handleDeleteFromCart,
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
