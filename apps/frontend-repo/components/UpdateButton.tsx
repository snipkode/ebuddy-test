import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, CircularProgress, Box } from '@mui/material';
import { fetchUserData } from '@/store/userSlice'; // Use fetchUserData from Redux
import { selectUserData, selectLoading, selectError } from '@/store/userSlice';
import { AppDispatch } from '@/store/store'; 

const UpdateButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);
  const userData = useSelector(selectUserData);
  const error = useSelector(selectError);

  const handleClick = () => {
    dispatch(fetchUserData());
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Button variant="contained" color="primary" onClick={handleClick} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Fetch User Data'}
      </Button>
      {loading && <Typography mt={2}>Loading...</Typography>}
      {userData && (
        <Box mt={2} width="100%">
          <Typography variant="h6">User Data:</Typography>
          {Array.isArray(userData) ? userData.map((item, index) => (
            <Box key={index} p={2} bgcolor="#fff" borderRadius={1} boxShadow={1} mt={1}>
              {JSON.stringify(item, null, 2)}
            </Box>
          )) : (
            <Box p={2} bgcolor="#fff" borderRadius={1} boxShadow={1} mt={1}>
              {JSON.stringify(userData, null, 2)}
            </Box>
          )}
        </Box>
      )}
      {error && <Typography color="error" mt={2}>{error}</Typography>}
    </Box>
  );
};

export default UpdateButton;
