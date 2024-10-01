"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState } from "react";
import useCart from "@/hooks/useCart";
import { CartItem } from "@/store/cartSlice";
import { Toaster, toast } from "sonner"; 

type PricingOption = {
  price: number;
  discountedPrice?: number;
  discount?: string;
};

const ProductPage = ({ product, productImage }: { product: any; productImage: string }) => {
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedStorage] = useState("64GB");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isRedImageVisible, setIsRedImageVisible] = useState(true);
  const { addCartItem } = useCart();

  const calculateDiscountedPrice = (price: number, quantity: number) => {
    const discountRates: { [key: number]: number } = { 2: 10, 3: 20 };
    const discountRate = discountRates[quantity] || 0;
    const discountedPrice = price * quantity * (1 - discountRate / 100);
    return {
      discountedPrice,
      discount: discountRate ? `${discountRate}%` : undefined,
    };
  };

  const pricing: PricingOption = {
    price: product?.basePrice || 0,
    ...calculateDiscountedPrice(product?.basePrice || 0, selectedQuantity),
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setIsRedImageVisible(color === "red");
  };

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);
  };

  const handleAddToCart = () => {
    const item: CartItem = {
      id: product.id,
      productId: product.id,
      name: `Supreme Jacket - ${selectedColor} - ${selectedStorage}`,
      quantity: selectedQuantity,
      price: pricing.discountedPrice || pricing.price,
      productImage: productImage,
    };
    addCartItem(item);
    toast.success("Product added to cart!"); 
  };

  return (
    <div className="bg-pink-100 pt-[4rem] pb-[4rem] sm:pt-[10rem]">
      <Toaster /> 
      <div className="flex flex-col lg:flex-row w-full lg:w-4/5 mx-auto justify-between h-auto lg:h-[100vh]">
        {/* Image Section */}
        <ProductImageSection productImage={productImage} isRedImageVisible={isRedImageVisible} />

        {/* Product Info Section */}
        <div className="flex flex-col w-full lg:w-[48%] p-4">
          <h1 className="text-[1.5rem] lg:text-[2rem] font-bold">SUPREME JACKET</h1>

          <ColorSelector selectedColor={selectedColor} handleColorChange={handleColorChange} />

          <QuantitySelector
            basePrice={product?.basePrice || 0}
            selectedQuantity={selectedQuantity}
            handleQuantityChange={handleQuantityChange}
            calculateDiscountedPrice={calculateDiscountedPrice}
          />

          <button className="bg-black text-white py-3 rounded-lg mt-4" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductImageSection = ({ productImage, isRedImageVisible }: { productImage: string; isRedImageVisible: boolean }) => (
  <div className="relative w-full lg:w-[50%] h-[50vh] lg:h-full rounded-[8px] mb-4 lg:mb-0">
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isRedImageVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0"
    >
      {productImage && (
        <Image
          src={productImage}
          layout="fill"
          objectFit="cover"
          alt="Dynamic product"
          className="h-[40rem] w-full rounded-[8px]"
        />
      )}
    </motion.div>
  </div>
);

const ColorSelector = ({ selectedColor, handleColorChange }: { selectedColor: string; handleColorChange: (color: string) => void }) => (
  <div className="flex items-center my-4">
    <p className="text-[1rem] lg:text-[1.2rem] font-semibold">Color:</p>
    <div className="flex space-x-2">
      {["red", "yellow"].map((color) => (
        <button
          key={color}
          className={`w-8 h-8 rounded-full border-2 ${color === selectedColor ? "border-black" : "border-transparent"}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorChange(color)}
        />
      ))}
    </div>
  </div>
);

const QuantitySelector = ({
  basePrice,
  selectedQuantity,
  handleQuantityChange,
  calculateDiscountedPrice,
}: {
  basePrice: number;
  selectedQuantity: number;
  handleQuantityChange: (quantity: number) => void;
  calculateDiscountedPrice: (price: number, quantity: number) => { discountedPrice: number; discount?: string };
}) => (
  <div className="mt-6 space-y-4">
    <p className="text-[1rem] lg:text-[1.2rem] font-semibold">Quantity:</p>
    <div className="flex flex-col space-y-4">
      {[1, 2, 3].map((quantity) => {
        const { discountedPrice, discount } = calculateDiscountedPrice(basePrice, quantity);
        return (
          <div
            key={quantity}
            className={`p-4 border rounded-lg flex justify-between cursor-pointer ${
              selectedQuantity === quantity ? "border-black bg-gray-100" : "border-gray-300"
            }`}
            onClick={() => handleQuantityChange(quantity)}
          >
            {discount && <p className="font-semibold">Buy Now - Save {discount}</p>}
            {!discount && <p className="font-semibold">Standard Price</p>}
            <div>
              <p className="text-[1rem] lg:text-[1.2rem] font-bold">₱{discountedPrice?.toLocaleString()}</p>
              <p className="text-gray-400 line-through">₱{(basePrice * quantity).toLocaleString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default ProductPage;
