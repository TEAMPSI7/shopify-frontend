"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { setUser } from '@/store/userSlice';
import { usePathname } from 'next/navigation';
import { clearCart } from '@/store/cartSlice';
const useAuth = () => {
  const user = useSelector((state: RootState) => state.user); 
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user.userId && pathname !== '/account/register' && pathname !== '/products/jacket' && pathname !== '/') {
      router.push('/account/login');
    }
  }, [user, router, pathname]);

  const login = (userId: string, username: string, token: string) => {
    dispatch(setUser({ userId, username, token }));
    window.localStorage.setItem('loggedShopifyUser', JSON.stringify({ userId, username, token }));
  };

  const logout = () => {
    dispatch(setUser({ userId: null, username: null, token: null }));
    dispatch(clearCart())
    window.localStorage.removeItem('loggedShopifyUser');
    window.localStorage.removeItem('userCart');
    router.push('/account/login');
  };

  return { user, login, logout };
};

export default useAuth;