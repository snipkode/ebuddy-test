import firebaseApp from '@/firebase/firebaseConfig';
import { Button } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import React from 'react'

export default function LogoutButton() {
    const auth = getAuth(firebaseApp);
    const handleLogout = async () => {
      try {
        await signOut(auth);
        window.location.href = '/login';
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Sign Out
    </Button>
  )
}
