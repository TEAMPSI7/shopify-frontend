import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';


export interface CartItem {
  id: string; 
  productId: string; 
  name: string;
  quantity: number;
  price: number;
  productImage: {
    data: any;
  };
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      console.log("STATE", current(state)); 
      console.log("ACTION", action.payload); 
    
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      console.log("EXISTING ITEM", existingItem)
      if (existingItem) {
       
        const updatedItems = state.items.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity } 
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    },
    
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateItem: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload
        };
      }
    },
    clearCart: (state) => {
      return initialState;
    },
  },
});

export const { addItem, removeItem, updateItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
