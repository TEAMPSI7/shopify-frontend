"use client";

import React from 'react';
import { Provider } from 'react-redux';
import  store from '@/store/store'; 
import Navbar from './common/Navbar';
import Footer from './common/Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <div className="bg-white relative h-[100vh] text-black" >
          <div className="absolute top-0 left-0 z-10 w-full">
            <div className="bg-black text-white text-center py-2">50% OFF SUMMER SALE & FREE SHIPPING</div>
            <Navbar />
            
          </div>
      {children}
      <Footer />
      </div>
    </Provider>
  );
};

export default MainLayout;