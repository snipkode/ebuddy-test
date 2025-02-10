import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import {signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {auth} from '@/firebase/firebaseConfig';
import { fetchUser } from '@/store/userSlice';
import { AppDispatch } from '@/store/store';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useRouter();

  const handleLogin = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(fetchUser()); // Fetch user data after login
      navigate.back() // Redirect properly using React Router
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        autoComplete="email"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        autoComplete="current-password"
      />
      {error && <Typography color="error" mt={2}>{error}</Typography>}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogin} 
        fullWidth
        disabled={!email || !password} // Disable if fields are empty
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
