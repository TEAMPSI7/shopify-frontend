"use client";

import React from "react";
import { CartItem } from "@/store/cartSlice";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import Image from "next/image";
import Loading from "./loading"; 
import Button from "@/components/common/Button";
import CartItems from "@/components/products/CartItems";

const Page = () => {
  const { cart, isFetching } = useCart(); 
  console.log("CART", cart);
  const subtotal = cart && cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (isFetching) {
    return <Loading />; 
  }

  return (
    <div className="flex justify-center items-center h-screen pt-16 bg-[#F6E3FF]">
      <div className="flex flex-col gap-8 p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl border">
        <h1 className="text-3xl font-bold text-center">Cart</h1>

        {cart && cart.length === 0 ? (
          <p className="text-gray-500 text-center">No items in your cart</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <CartItems />
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Order Summary</h3>
              <div className="mt-4">
                <div className="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-bold text-xl">
                  <span>Total:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Link href="/" className="text-black-500 underline text-center">
                    Continue Shopping
                  </Link>
                  <Button text="Checkout" linkString="/checkout" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
