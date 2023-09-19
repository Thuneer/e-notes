import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  email: string | null | undefined;
  auth: boolean;
};

const initialState: UserState = {
  email: '',
  auth: false,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.auth = action.payload.auth;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
