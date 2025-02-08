import { createAction } from '@reduxjs/toolkit';

export const fetchUserData = createAction<object>('fetchUserData');
export const fetchUserDataSuccess = createAction<string>('fetchUserDataSuccess');
export const fetchUserDataError = createAction<string>('fetchUserDataError');
