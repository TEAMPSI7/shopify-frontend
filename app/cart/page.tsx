import React from 'react'

const Page = () => {
  return (
    <div className='flex justify-center items-center h-screen pt-[5rem] bg-[#F6E3FF]'>
        <div className='flex flex-col gap-[1rem] bg-white p-[2rem] rounded-[1rem] border-[1px] border-black text-center'>
            <h1 className='text-[2rem] font-bold'>Cart</h1>
            <p className='text-gray-500 pb-4'>No items in your cart</p>
        </div>
    </div>
  )
}

export default Page
