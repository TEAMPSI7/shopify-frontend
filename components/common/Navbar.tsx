"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { ShoppingCartIcon, User, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion'; 
import useAuth from '@/hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false); 
  };

  const menuVariants = {
    open: { opacity: 1, y: 0},
    closed: { opacity: 0, y: "20%" },
  };

  return (
    <div className='bg-[#F6E3FF] text-black'>
      <div className='flex justify-between items-center mx-auto w-full lg:w-4/5 py-4 px-4 lg:px-0'>
        <h1 className='font-bold text-[1.5rem]'>SUPREME TEAM</h1>

        <div className='lg:hidden'>
          <button onClick={toggleMenu}>
            {isMenuOpen ? "" : <Menu size={24} />}
          </button>
        </div>

        <motion.div
          className={`flex-col lg:flex-row flex items-center lg:gap-[3rem] absolute lg:relative top-[60px] lg:top-0 left-0 lg:left-auto w-full lg:w-auto bg-[#F6E3FF] lg:bg-transparent lg:flex`}
          animate={isMenuOpen ? "open" : "closed"}
          initial="closed"
          variants={menuVariants}
          transition={{ duration: 0.2 }}
        >
          <button className='absolute top-0 right-4' onClick={closeMenu}>
            <X size={24} />
          </button>
          <Link className='nav-item py-2 lg:py-0 px-4 lg:px-0' href={"/"} onClick={closeMenu}>HOME</Link>
          <Link className='nav-item py-2 lg:py-0 px-4 lg:px-0' href={"/products/jacket"} onClick={closeMenu}>JACKET</Link>
          <Link className='nav-item py-2 lg:py-0 px-4 lg:px-0' href={"/help"} onClick={closeMenu}>HELP</Link>
          <Link className='nav-item py-2 lg:py-0 px-4 lg:px-0' href={"/cart"} onClick={closeMenu}>CART</Link>
        </motion.div>

        <div className='hidden lg:flex gap-[2rem] items-center'>
          <Link className='cursor-pointer' href={`/account/${user ? 'profile' : 'login'}`}>
            <User />
          </Link>
          <Link className='cursor-pointer' href={"/cart"}>
            <ShoppingCartIcon />
          </Link>
        </div>
      </div>

      <div className={`lg:hidden flex justify-center gap-[2rem] py-4 ${isMenuOpen ? 'flex' : 'hidden'}`}>
        <Link className='cursor-pointer' href={"/account/login"}>
          <User />
        </Link>
        <Link className='cursor-pointer' href={"/cart"}>
          <ShoppingCartIcon />
        </Link>
      </div>
    </div>
  )
}

export default Navbar;
