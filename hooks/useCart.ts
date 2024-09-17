"use client";

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addItem, removeItem, updateItem } from '@/store/cartSlice';
import { CartItem } from '@/store/cartSlice';
import axios from 'axios'; 

const useCart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart');  
        const cartData = response.data;
        cartData.items.forEach((item: CartItem) => {
          dispatch(addItem(item));  
        });
      } catch (error) {
        console.error('Failed to fetch cart from backend:', error);
      }
    };
    
    fetchCart();
  }, [dispatch]);


  useEffect(() => {
    const syncCartToBackend = async () => {
      try {
        await axios.put('/api/cart', { items: cart }); 
      } catch (error) {
        console.error('Failed to sync cart to backend:', error);
      }
    };

    if (cart.length > 0) {
      syncCartToBackend();
    }
  }, [cart]);


  const addCartItem = async (item: CartItem) => {
    dispatch(addItem(item));
    try {
      await axios.post('/api/cart', item); 
    } catch (error) {
      console.error('Failed to add item to cart in backend:', error);
    }
  };


  const removeCartItem = async (itemId: string) => {
    dispatch(removeItem(itemId));
    try {
      await axios.delete(`/api/cart/${itemId}`); 
    } catch (error) {
      console.error('Failed to remove item from cart in backend:', error);
    }
  };


  const updateCartItem = async (item: CartItem) => {
    dispatch(updateItem(item));
    try {
      await axios.put(`/api/cart/${item.id}`, item);
    } catch (error) {
      console.error('Failed to update item in backend:', error);
    }
  };

  return {
    cart,
    addCartItem,
    removeCartItem,
    updateCartItem,
  };
};

export default useCart;
