import { createReducer } from '@reduxjs/toolkit';
import { fetchUserData, fetchUserDataSuccess, fetchUserDataError } from '../actions';

interface UserState {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUserData, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserDataSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchUserDataError, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? null;
    });
});

export default userReducer;
