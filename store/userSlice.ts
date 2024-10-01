import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userId: string | null;
  username: string | null;
  token: string | null;
}

const initialState: UserState = {
  userId: null,
  username: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userId: string | null; username: string | null; token: string | null }>) => {
      console.log('ACTION', action.payload);
      console.log('STATE BEFORE UPDATE', state);

      // Instead of mutating, return a new state object
      return {
        userId: action.payload.userId,
        username: action.payload.username,
        token: action.payload.token,
      };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
