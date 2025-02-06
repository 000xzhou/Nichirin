import { useState, useEffect } from "react";

const useCart = (initialState = []) => {
  const [cart, setCart] = useState(initialState);
  const [cartNum, setCartNum] = useState(0);
  const [loading, setLoading] = useState(true);

  const calculateTotalQuantity = (cart) => {
    if (!cart) return 0;
    return cart.reduce((sum, cartItem) => sum + (cartItem.quantity || 0), 0);
  };

  // Add to cart (save to localStorage)
  const handleAddtoCart = (item) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = currentCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // If the item exists, update the quantity
      currentCart[existingItemIndex].quantity += 1;
    } else {
      // If the item does not exist, add it with a quantity of 1
      currentCart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
    // setCart(currentCart); // Update state to reflect the new cart
    setCart([...currentCart]);

    // const totalQuantity = calculateTotalQuantity(currentCart);
    // setCartNum(totalQuantity);
    // console.log(totalQuantity);
  };

  // Get from cart (retrieve from localStorage)
  const handleGetFromCart = () => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartFromStorage); // Set the cart state with the current localStorage cart
    // setCartNum(cartFromStorage.length);
    const totalQuantity = calculateTotalQuantity(cartFromStorage);
    setCartNum(totalQuantity);

    return cartFromStorage;
  };

  // Remove or decrease the quantity of a specific item from the cart
  const handleRemoveFromCart = (id) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Filter the cart to remove the item or reduce its quantity
    const updatedCart = currentCart.reduce((acc, item) => {
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

    // Update localStorage and state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    // setCartNum(updatedCart.length);
    const totalQuantity = calculateTotalQuantity(updatedCart);
    setCartNum(totalQuantity);
  };

  // const handleChangeQty = (id, newQty) => {
  //   const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

  //   const updatedCart = currentCart.map((item) => {
  //     if (item.id === id) {
  //       return { ...item, quantity: parseInt(newQty, 10) }; // Update the quantity
  //     }
  //     return item; // Return other items unchanged
  //   });

  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   setCart(updatedCart); // Update the cart state
  // };
  const handleChangeQty = (id, newQty) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = currentCart
      .map((item) => {
        if (item.id === id) {
          // Ensure that negative numbers become 1, numbers over 10 become 10
          let updatedQty = parseInt(newQty, 10);

          // Check for invalid input (like NaN), and set default quantity to 1 if invalid
          if (isNaN(updatedQty)) {
            updatedQty = 1;
          }

          if (updatedQty < 0) {
            updatedQty = 1; // If negative, set it to 1
          } else if (updatedQty === 0) {
            return null; // If zero, remove the item from the cart
          } else if (updatedQty > 10) {
            updatedQty = 10; // If greater than 10, set it to 10
          }

          return { ...item, quantity: updatedQty }; // Return updated item with the correct quantity
        }
        return item; // Return unchanged items
      })
      .filter((item) => item !== null); // Remove items where quantity is 0

    // Update localStorage and state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart); // Update the cart state
    // setCartNum(updatedCart.length);
    const totalQuantity = calculateTotalQuantity(updatedCart);
    setCartNum(totalQuantity);
  };

  // Clear the entire cart
  const handleClearCart = () => {
    localStorage.removeItem("cart"); // Remove the cart from localStorage
    setCart([]); // Set the cart state to an empty array
    setCartNum(0);
  };

  useEffect(() => {
    // handleGetFromCart(); // Load the cart when the component mounts
    const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartFromStorage); // Set the cart state with the current localStorage cart

    setLoading(false);
  }, []);

  useEffect(() => {
    const totalQuantity = calculateTotalQuantity(cart);
    // console.log("totalQuantity", totalQuantity);
    setCartNum(totalQuantity);
  }, [cart]);

  // console.log("cartNum", cartNum);
  return {
    cart,
    cartNum,
    loading,
    handleAddtoCart,
    handleRemoveFromCart,
    handleChangeQty,
    handleClearCart,
    handleGetFromCart,
    setCart,
    setCartNum,
  };
};

export default useCart;
