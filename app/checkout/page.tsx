// pages/checkout.tsx
"use client";
import Button from "@/components/common/Button";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import useCart from "@/hooks/useCart";
import CartItems from "@/components/products/CartItems"; 
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import Loading from "@/app/cart/loading";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const CheckoutPage = () => {
  const { cart, isFetching } = useCart(); 
  const { user } = useAuth();
  const subtotal = cart && cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  console.log("CHECKOUT CART", cart);
  const paypalCreateOrder = async () => {
    try {
        // Extract product details for PayPal
        const orderItems = cart.map((item) => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        }));

        // Prepare payload for the PayPal create order API
        const response = await axios.post(`${baseUrl}/paypal/createorder`, {
            userId: user.userId,   
            currency: "USD",       
        });

        const { data } = response;
        if (data && data.orderId) {
            return data.orderId; 
        } else {
            throw new Error("Invalid response structure from createOrder API.");
        }
    } catch (err) {
        console.error("Error creating PayPal order:", err);
        alert("An error occurred while creating the order. Please try again.");
        return null;
    }
};

  // PayPal capture order function
  const paypalCaptureOrder = async (orderID: string) => {
    try {
      const response = await axios.post(`${baseUrl}/paypal/captureorder`, { orderID, userId: user.userId });
      console.log("Full response from PayPal capture:", response);

      if (response.data && response.data.status === "COMPLETED") {
        // alert("Payment successful!");
        toast.success("Payment successful!");
        redirect("/cart");
      } else {
        toast.error("Payment failed!");
        console.error("Unexpected response structure or status:", response.data);
        throw new Error("Order capture failed");
      }
    } catch (err) {
      console.error("Error capturing PayPal order:", err);
      alert("An error occurred while capturing the order. Please try again.");
      return false;
    }
  };


  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center h-screen pt-16 bg-[#F6E3FF]">
      <div className="flex flex-col gap-8 p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl border">
        <h1 className="text-3xl font-bold text-center">Checkout</h1>

        {cart && cart.length === 0 ?
        (
          <p className="text-gray-500 text-center">No items in your cart</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: Scrollable product list */}
              <div className="max-h-96 overflow-y-auto space-y-4 pr-4">
                <CartItems />
            </div>

            {/* Right side: Order summary and PayPal checkout */}
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
                <div className="mt-6">
                  {/* PayPal Checkout */}
                  <PayPalScriptProvider
                    options={{
                      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
                      currency: "USD",
                      intent: "capture",
                    }}
                  >
                    <PayPalButtons
                      style={{
                        color: "gold",
                        shape: "rect",
                        label: "pay",
                        height: 50,
                      }}
                      createOrder={async () => {
                        let order_id = await paypalCreateOrder();
                        if (order_id) {
                          return order_id;
                        } else {
                          throw new Error("Failed to create PayPal order");
                        }
                      }}
                      onApprove={async (data) => {
                        console.log("data ORDERID", data.orderID);
                        let response = await paypalCaptureOrder(data.orderID);
                        console.log("response CAPTURE ORDER", response);
                        if (response) {
                          console.log("Order captured successfully");
                        } else {
                          console.error("Failed to capture the order");
                        }
                      }}
                      onCancel={() => {
                        console.log("Payment cancelled by user");
                        alert("Payment was cancelled. Please try again.");
                      }}
                      onError={(err) => {
                        console.log("An error occurred during the transaction:", err);
                        alert("An error occurred during the transaction. Please try again.");
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
