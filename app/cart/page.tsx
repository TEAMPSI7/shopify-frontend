"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CartItem } from '@/store/cartSlice';

const Page = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className='flex justify-center items-center h-screen pt-[5rem] bg-[#F6E3FF]'>
      <div className='flex flex-col gap-[1rem] bg-white p-[2rem] rounded-[1rem] border-[1px] border-black text-center'>
        <h1 className='text-[2rem] font-bold'>Cart</h1>
        {cartItems.length === 0 ? (
          <p className='text-gray-500 pb-4'>No items in your cart</p>
        ) : (
          <div className='flex flex-col gap-[1rem]'>
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className='flex justify-between items-center border-b-[1px] border-gray-300 pb-2'>
                <span>{item.name}</span>
                <span>{item.quantity} x ${item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
