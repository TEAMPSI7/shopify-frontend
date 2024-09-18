"use client"
import React from 'react'
import useAuth from '@/hooks/useAuth';

const Page = () => {
    const { user, logout } = useAuth();
    return (
    <div className='flex flex-col gap-[1rem] p-[10rem]'>
        <h1 className='text-[2rem] font-bold'>Profile</h1>    
        <div>
            <h2 className='text-[1.5rem] font-bold'>Name</h2>
            <p className='text-[1.2rem]'>{user}</p>
        </div>
        <button onClick={logout} className='bg-black text-white p-[1rem] rounded-[0.5rem]'>Logout</button>
    </div>
    )
}

export default Page
