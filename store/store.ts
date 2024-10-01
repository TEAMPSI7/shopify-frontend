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
    
    const user: UserState = serializedUserState ? JSON.parse(serializedUserState) : { userId: null, username: null, token: null };
    const cart: CartState = serializedCartState ? JSON.parse(serializedCartState) : { items: [] };
    
    // Ensure that cart.items is always an array
    cart.items = Array.isArray(cart.items) ? cart.items : [];

    return { user, cart };
  } catch (err) {
    return { user: { userId: null, username: null, token: null }, cart: { items: [] } };
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
 
  const cartItemsCopy = JSON.parse(JSON.stringify(state.cart.items));
  window.localStorage.setItem('userCart', JSON.stringify(cartItemsCopy));
  console.log("STATE", state);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
