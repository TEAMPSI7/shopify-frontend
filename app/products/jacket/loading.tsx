import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="bg-pink-100 pt-[4rem] pb-[4rem] sm:pt-[10rem]">
      <div className="flex flex-col lg:flex-row w-full lg:w-4/5 mx-auto justify-between h-auto lg:h-[100vh]">
      
        <div className="relative w-full lg:w-[50%] h-[50vh] lg:h-full rounded-[8px] mb-4 lg:mb-0">
          <Skeleton className="absolute inset-0 h-full w-full" />
        </div>

        <div className="flex flex-col w-full lg:w-[48%] p-4 space-y-4">
          <Skeleton className="h-8 w-3/4" /> 
          <Skeleton className="h-6 w-1/2" /> 
          <Skeleton className="h-6 w-1/2" /> 
          <Skeleton className="h-12 w-full" /> 
        </div>
      </div>
    </div>
  );
};

export default Loading;
