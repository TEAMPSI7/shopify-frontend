"use client";

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addItem, removeItem, updateItem, clearCart } from '@/store/cartSlice';
import { CartItem } from '@/store/cartSlice';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const useCart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const hasFetchedCart = useRef(false);
  const previousCart = useRef<CartItem[]>([]);

  // Fetch cart only when user is authenticated
  useEffect(() => {
    console.log("USER", user)
    if (!user || !user.token || hasFetchedCart.current) return;
    console.log("ITTTTTTTTTTTTTT")
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/cart/`, {
          params: { userId: user.userId },
        });
        const cartData = response.data;
        console.log("CART DATA", cartData)
        // if (cartData) {
        //   dispatch(clearCart());
        //   cartData.forEach((item: CartItem) => {
        //     dispatch(addItem(item));
        //   });
        // }

        hasFetchedCart.current = true;
      } catch (error) {
        console.error('Failed to fetch cart from backend:', error);
      }
    };

    fetchCart();
  }, [user, dispatch]);

  // Sync cart to backend on any cart change, but only if there are differences
  useEffect(() => {
    if (!user || previousCart.current === cart) return;

    const syncCartToBackend = async () => {
      try {
        // Clear backend cart
        await axios.post(`${baseUrl}/users/cart/clear`, { userId: user.userId });
        
        // Sync each item in the local cart to backend
        for (const item of cart) {
          await axios.post(`${baseUrl}/users/cart/add`, {
            userId: user.userId,
            productId: item.productId,
            quantity: item.quantity,
          });
        }

        previousCart.current = cart; // Update the previous cart state

      } catch (error) {
        console.error('Failed to sync cart to backend:', error);
        // Optionally, you can store failed sync attempts in localStorage for retry later
      }
    };

    syncCartToBackend();
  }, [cart, user, dispatch]);

  const addCartItem = async (item: CartItem) => {
    dispatch(addItem(item));
    try {
      await axios.post(`${baseUrl}/users/cart/add`, {
        userId: user?.userId,
        productId: item.id,
        quantity: item.quantity,
      });
    } catch (error) {
      console.error('Failed to add item to cart in backend:', error);
      // Optionally handle the error (retry, show notification, etc.)
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
      console.error('Failed to remove item from cart in backend:', error);
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
      console.error('Failed to update item in backend:', error);
    }
  };

  const clearCartItem = async () => {
    dispatch(clearCart());
    try {
      await axios.post(`${baseUrl}/users/cart/clear`, { userId: user?.userId });
    } catch (error) {
      console.error('Failed to clear cart in backend:', error);
    }
  };

  return {
    cart,
    addCartItem,
    removeCartItem,
    updateCartItem,
    clearCartItem,
  };
};

export default useCart;
