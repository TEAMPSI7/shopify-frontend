import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './userSlice';
import cartReducer, { CartState } from './cartSlice';

interface AppState {
  user: UserState;
  cart: CartState;
}

const loadState = (): AppState => {
  try {
    const serializedUserState = window.localStorage.getItem('loggedShopifyUser');
    const serializedCartState = window.localStorage.getItem('userCart');
    
    const user: UserState = serializedUserState ? JSON.parse(serializedUserState) : { user: null };   
    const cart: CartState = serializedCartState ? JSON.parse(serializedCartState) : { items: [] };    

    return { user, cart };
  } catch (err) {
    return { user: { user: null, token: null }, cart: { items: [] } };   
  }
};

const preloadedState: AppState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  preloadedState,
});


store.subscribe(() => {
  const state = store.getState();
  window.localStorage.setItem('userCart', JSON.stringify(state.cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
