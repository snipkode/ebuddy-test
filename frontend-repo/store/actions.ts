import { createAction } from '@reduxjs/toolkit';

export const fetchUserData = createAction<object>('fetchUserData');
export const fetchUserDataSuccess = createAction<object>('fetchUserDataSuccess');
export const fetchUserDataError = createAction<string>('fetchUserDataError');
