"use client";
import React from "react";
import { CartItem } from "@/store/cartSlice";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import Image from "next/image";
import Loading from "./loading"; 
import Button from "@/components/common/Button";

const CartItems = ({ cart }: { cart: CartItem[] }) => {
  return (
    <div className="grid gap-6">
      {cart.map((item: CartItem) => {
        let productImage = "";
        if (item.productImage && item.productImage.data) {
          const base64Image = Buffer.from(item.productImage.data).toString("base64");
          productImage = `data:image/jpeg;base64,${base64Image}`;
        }

        return (
          <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex-shrink-0">
              <Image
                src={productImage}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">{item.quantity} x ${item.price.toFixed(2)}</p>
              </div>
              <div>
                <button className="text-sm text-black bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition">
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Page = () => {
  const { cart, isFetching } = useCart(); 

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
              <CartItems cart={cart} />
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
