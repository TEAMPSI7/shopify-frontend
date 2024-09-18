"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { ShoppingCartIcon, User, Menu, X } from 'lucide-react';
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

  return (
    <div className='bg-[#F6E3FF] text-black'>
      <div className='flex justify-between items-center mx-auto w-full lg:w-4/5 py-4 px-4 lg:px-0'>
        <h1 className='font-bold text-[1.5rem]'>SUPREME TEAM</h1>

        <div className='lg:hidden'>
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`flex-col lg:flex-row flex items-center lg:gap-[3rem] absolute lg:relative top-[60px] lg:top-0 left-0 lg:left-auto w-full lg:w-auto bg-[#F6E3FF] lg:bg-transparent lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
          <Link className='nav-item py-2 lg:py-0 px-4 lg:px-0' href={"/"} onClick={closeMenu}>HOME</Link>
          <Link className='nav-item py-2 lg:py-0 px-4 lg:px-0' href={"/products/jacket"} onClick={closeMenu}>JACKET</Link>
          <Link className='nav-item py-2 lg:py-0 px-4 lg:px-0' href={"/help"} onClick={closeMenu}>HELP</Link>
        </div>

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
