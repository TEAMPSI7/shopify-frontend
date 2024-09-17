"use client"
import Button from '@/components/common/Button';
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';
import authService from '@/services/api/authService'; 
import useAuth from '@/hooks/useAuth';

const Page = () => {
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { login, user } = useAuth();

  useEffect(() => {
    if (emailRef.current) {
      setEmailFocus(emailRef.current.value !== '');
    }
    if (passwordRef.current) {
      setPasswordFocus(passwordRef.current.value !== '');
    }

    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email:', emailRef.current?.value);
    console.log('Password:', passwordRef.current?.value);
    setError(null);
    
    try {
      const username = emailRef.current?.value || '';
      const password = passwordRef.current?.value || '';
      const user = await authService.login({ username, password });
      console.log(user);
      login(user.username.toString(), user.token.toString());
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center py-[10rem] bg-[#F6E3FF]'>
      <div className='flex flex-col gap-[1rem] bg-white p-[2rem] rounded-[1rem] border-[1px] border-black text-center'>
        <h1 className='text-[2rem] font-bold'>Login</h1>
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
            <p>I forgot my password</p>
            <p>Remember me?</p>
          </div>
          <button className="text-white bg-black py-[1rem] px-[2rem] rounded-[8px] mt-6" type="submit">Login</button>
        </form>
        <hr className='border-black w-full mt-6' />
        <div className='flex flex-col gap-[0.5rem] items-center'>
            <p className='text-gray-500'>NEW TO SUPREME TEAM?</p>
            <Button text='CREATE ACCOUNT' linkString="/account/register"/>
        </div>
      </div>
    </div>
  )
}

export default Page
