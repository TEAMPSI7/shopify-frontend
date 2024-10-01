"use client"
import Button from '@/components/common/Button';
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import authService from '@/services/api/authService';
import useAuth from '@/hooks/useAuth';

const Page = () => {
  const { user } = useAuth();
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [fullNameFocus, setFullNameFocus] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (emailRef.current) {
      setEmailFocus(emailRef.current.value !== '');
    }
    if (fullNameRef.current) {
      setFullNameFocus(fullNameRef.current.value !== '');
    }
    if (passwordRef.current) {
      setPasswordFocus(passwordRef.current.value !== '');
    }

  }, [user]); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email:', emailRef.current?.value);
    console.log('Full Name:', fullNameRef.current?.value);
    console.log('Password:', passwordRef.current?.value);
    setError(null);
    try {
      const user = await authService.register({ username: emailRef.current?.value, name: fullNameRef.current?.value, password: passwordRef.current?.value });
      console.log('Registered user:', user);
      router.push('/account/login');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen pt-[5rem] bg-[#F6E3FF]'>
      <div className='flex flex-col gap-[1rem] bg-white p-[2rem] rounded-[1rem] border-[1px] border-black text-center'>
        <h1 className='text-[2rem] font-bold'>CREATE ACCOUNT</h1>
        <p className='text-gray-500 pb-4'>View your order history, address book, and more.</p>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500">{error}</div>}
          <div className='flex flex-col gap-[0.5rem] relative'>
            <label
              htmlFor="email"
              className={`absolute left-3 transition-all duration-300 ${
                emailFocus ? '-translate-y-6 text-sm text-red-500' : 'translate-y-2 text-gray-500'
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(emailRef.current?.value !== '')}
              required
              className="border border-black px-4 py-2 rounded-[8px]"
            />
          </div>
          <div className='flex flex-col gap-[0.5rem] relative mt-8'>
            <label
              htmlFor="fullName"
              className={`absolute left-3 transition-all duration-300 ${
                fullNameFocus ? '-translate-y-6 text-sm text-red-500' : 'translate-y-2 text-gray-500'
              }`}
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              ref={fullNameRef}
              onFocus={() => setFullNameFocus(true)}
              onBlur={() => setFullNameFocus(fullNameRef.current?.value !== '')}
              required
              className="border border-black px-4 py-2 rounded-[8px]"
            />
          </div>
          <div className='flex flex-col gap-[0.5rem] relative mt-8'>
            <label
              htmlFor="password"
              className={`absolute left-3 transition-all duration-300 ${
                passwordFocus ? '-translate-y-6 text-sm text-red-500' : 'translate-y-2 text-gray-500'
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(passwordRef.current?.value !== '')}
              required
              className="border border-black px-4 py-2 rounded-[8px]"
            />
          </div>
          <div className='flex justify-between mt-4'>
            <p>Password must be at least 5 characters.</p>
          </div>
          <button className="text-white  justify-end bg-black py-[1rem] px-[2rem] rounded-[8px] mt-6" type="submit">CREATE ACCOUNT</button>
        </form>
      </div>
    </div>
  )
}

export default Page
