import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {store} from '@/store/store';
import theme from '@/theme/theme';

import React, { useEffect } from 'react';

import { AppProps } from 'next/app';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "@/store/authSlice";
import {firebaseApp} from '@/firebase/firebaseConfig';


const auth = getAuth(firebaseApp);

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthListener />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
