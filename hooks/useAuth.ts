"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { setUser } from '@/store/userSlice';
import { usePathname } from 'next/navigation';

const useAuth = () => {
  const user = useSelector((state: RootState) => state.user.user); 
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  // HANDLES REDIRECTION IF USER IS NOT LOGGED IN
  useEffect(() => {
    if (!user && pathname !== '/account/register' && pathname !== '/products/jacket' && pathname !== '/') {
      router.push('/account/login');
    }
  }, [user, router, pathname]);

  const login = (username: string, token: string) => {
    console.log("USER", typeof username);
    dispatch(setUser({ user: username, token }));
    window.localStorage.setItem('loggedShopifyUser', JSON.stringify({ user: username, token }));
  };

  const logout = () => {
    dispatch(setUser({ user: null, token: null }));
    window.localStorage.removeItem('loggedShopifyUser');
    router.push('/account/login');
  };

  return { user, login, logout };
};

export default useAuth;