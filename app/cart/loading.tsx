import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen pt-16 bg-[#F6E3FF]">
      <div className="flex flex-col gap-8 p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl border">
        <h1 className="text-3xl font-bold text-center">Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex gap-4 p-4 bg-white rounded-lg shadow-md">
                <Skeleton className="w-24 h-24 rounded-lg" /> 
                <div className="flex-grow flex flex-col justify-between">
                  <Skeleton className="h-6 w-3/4" /> 
                  <Skeleton className="h-4 w-1/2" /> 
                  <Skeleton className="h-8 w-1/4" /> 
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-4">
              <Skeleton className="h-6 w-full" /> 
              <Skeleton className="h-6 w-full" /> 
              <Skeleton className="h-12 w-full" /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
