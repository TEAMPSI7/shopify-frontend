import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: string | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: string | null; token: string | null }>) => {
      console.log('ACTION', action.payload);
      console.log('STATE BEFORE UPDATE', state);

      // Instead of mutating, return a new state object
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
