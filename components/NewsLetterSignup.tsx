"use client"
import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here (e.g., API call)
    console.log("Email submitted:", email);
  };

  return (
    <div className="bg-white py-[8rem] px-8 flex justify-between items-center w-4/5 mx-auto rounded-lg">
      {/* Left side: Text */}
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">NEWSLETTER SIGNUP</h1>
        <p className="text-md">
          Receive exclusive discounts and be the first to know about new offers and deals.
        </p>
      </div>

      {/* Right side: Input field and button */}
      <form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 border-[1px] border-black rounded-md focus:outline-none w-[300px]"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300"
        >
          SIGN-UP
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
