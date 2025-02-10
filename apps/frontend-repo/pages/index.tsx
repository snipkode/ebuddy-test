'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, Button } from '@mui/material';
import UpdateButton from '@/components/UpdateButton';
import LogoutButton from '@/components/LogoutButton';
import { fetchUser, selectUser } from '@/store/userSlice';
import { AppDispatch } from '@/store/store';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUser()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4">Checking authentication...</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4">Please Login</Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/login')}>
          Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="100vh" 
        bgcolor="#f5f5f5" 
        p={4} 
        borderRadius={2} 
        boxShadow={3}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome, {user.displayName || 'User'}!
        </Typography>
        <UpdateButton />
        <LogoutButton />
      </Box>
    </Container>
  );
};

export default Home;
