"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { addItem, clearCart, removeItem, updateItem } from "@/store/cartSlice";
import { CartItem } from "@/store/cartSlice";
import axios from "axios";
import useAuth from "@/hooks/useAuth";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const useCart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const hasFetchedCart = useRef(false);
  const [isFetching, setIsFetching] = useState(true); 

  const isCartEqual = (currentCart: CartItem[], fetchedCart: CartItem[]) => {
    if (currentCart.length !== fetchedCart.length) return false;


    for (let i = 0; i < currentCart.length; i++) {
      const currentItem = currentCart[i];
      const fetchedItem = fetchedCart.find((item) => item.id === currentItem.id);

      if (!fetchedItem || fetchedItem.quantity !== currentItem.quantity) {
        return false;
      }
    }

    return true;
  };

 
  useEffect(() => {
    if (!user || !user.token || hasFetchedCart.current) return;

    const fetchCart = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/cart/`, {
          params: { userId: user.userId },
        });
        const cartData = response.data;
        console.log("CART DATA RETURNED", cartData);
        if (cartData && !isCartEqual(cart, cartData)) {
          dispatch(clearCart()); 
          cartData.forEach((item: CartItem) => {
            dispatch(addItem(item)); 
          });
        }

        hasFetchedCart.current = true; 
        setIsFetching(false); 
      } catch (error) {
        console.error("Failed to fetch cart from backend:", error);
      }
    };

    fetchCart();
  }, [user, dispatch, cart]);

  const addCartItem = async (item: CartItem) => {
    dispatch(addItem(item));
    try {
      const response = await axios.post(`${baseUrl}/users/cart/add`, {
        userId: user?.userId,
        productId: "66ec0babc9db96a273e5da39",
        quantity: item.quantity,
      });
      console.log("RESPONSE ADD CART", response);
      return response.status;
    } catch (error) {
      console.error("Failed to add item to cart in backend:", error);
    }
  };

  const removeCartItem = async (itemId: string) => {
    dispatch(removeItem(itemId));
    try {
      await axios.post(`${baseUrl}/users/cart/remove`, {
        userId: user?.userId,
        productId: itemId,
      });
    } catch (error) {
      console.error("Failed to remove item from cart in backend:", error);
    }
  };

  const updateCartItem = async (item: CartItem) => {
    dispatch(updateItem(item));
    try {
      await axios.post(`${baseUrl}/users/cart/update`, {
        userId: user?.userId,
        productId: item.id,
        quantity: item.quantity,
      });
    } catch (error) {
      console.error("Failed to update item in backend:", error);
    }
  };

  const clearCartItem = async () => {
    dispatch(clearCart());
    try {
      await axios.post(`${baseUrl}/users/cart/clear`, { userId: user?.userId });
    } catch (error) {
      console.error("Failed to clear cart in backend:", error);
    }
  };

  return {
    cart,
    addCartItem,
    removeCartItem,
    updateCartItem,
    clearCartItem,
    isFetching, 
  };
};

export default useCart;
