"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

type PricingOption = {
  price: number;
  originalPrice: number;
  discount: string;
};

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState('red')
  const [selectedStorage, setSelectedStorage] = useState('64GB')
  const [selectedOption, setSelectedOption] = useState('1') 
  const [isRedImageVisible, setIsRedImageVisible] = useState(true)

  const pricing: Record<string, PricingOption> = {
    1: { price: 5500, originalPrice: 11000, discount: '50%' },
    2: { price: 4950, originalPrice: 22000, discount: '10%' },
    3: { price: 4400, originalPrice: 33000, discount: '20%' },
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setIsRedImageVisible(color === 'red');
  };

  return (
    <div className="bg-pink-100 p-4 sm:p-8">
      <div className='flex flex-col lg:flex-row w-full lg:w-4/5 mx-auto justify-between h-auto lg:h-[100vh]'>
        
        {/* Image Section */}
        <div className='relative w-full lg:w-[50%] h-[50vh] lg:h-full rounded-[8px] mb-4 lg:mb-0'>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isRedImageVisible ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className='absolute inset-0'
          >
            <Image
              src="/image/supreme_red.jpg" 
              layout="fill"
              objectFit="cover"
              alt="supreme_red"
              className="rounded-[8px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isRedImageVisible ? 0 : 1 }}
            transition={{ duration: 0.8 }}
            className='absolute inset-0'
          >
            <Image
              src="/image/supreme_yellow.jpg" 
              layout="fill"
              objectFit="cover"
              alt="supreme_yellow"
              className="rounded-[8px]"
            />
          </motion.div>
        </div>

        {/* Product Info Section */}
        <div className='flex flex-col w-full lg:w-[48%] p-4'>
          <h1 className='text-[1.5rem] lg:text-[2rem] font-bold'>SUPREME JACKET</h1>
          
          {/* Color selection */}
          <div className='flex items-center space-x-4 my-4'>
            <p className='text-[1rem] lg:text-[1.2rem] font-semibold'>Color:</p>
            <div className='flex space-x-2'>
              {['red', 'yellow'].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${color === selectedColor ? 'border-black' : 'border-transparent'}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>

          {/* Pricing options */}
          <div className='my-4'>
            {['1', '2', '3'].map((option) => (
              <div
                key={option}
                className={`flex items-center justify-between p-4 rounded-lg border my-2 ${option === selectedOption ? 'border-black' : 'border-gray-300'}`}
                onClick={() => setSelectedOption(option)}
              >
                <div className='flex items-center space-x-4'>
                  <input type='radio' checked={option === selectedOption} onChange={() => setSelectedOption(option)} />
                  <p className='text-[1rem] lg:text-[1.2rem] font-semibold'>
                    Buy {option} {option === '1' ? 'Standard' : `Save ${pricing[option].discount}`}
                  </p>
                </div>
                <div>
                  <p className='text-[1rem] lg:text-[1.2rem] font-bold'>₱{pricing[option].price.toLocaleString()} / EACH</p>
                  {option === '1' && <p className='text-gray-400 line-through'>₱{pricing[option].originalPrice.toLocaleString()}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Add to cart button */}
          <button className='bg-black text-white py-3 rounded-lg mt-4'>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage;