'use client';

import React from 'react';
import UpdateButton from '@/components/UpdateButton';
import { Container, Box, Typography, Button } from '@mui/material';

import firebase from '@/firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import LogoutButton from '@/components/LogoutButton';

const Home = () => {
  const auth = getAuth(firebase);
  console.log(auth.currentUser);
  if(!auth.currentUser) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4">Please Login</Typography>
        <Button variant="contained" color="primary" href="/login">
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
          Welcome to the Main Page
        </Typography>
        <UpdateButton />
        <LogoutButton />
      </Box>
    </Container>
  );
};

export default Home;
