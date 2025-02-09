import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, CircularProgress, Box } from '@mui/material';
import { fetchUserData } from '@/apis/userApi';
import { fetchUserData as fetchUserDataAction, fetchUserDataSuccess, fetchUserDataError } from '@/store/actions';
import { useRouter } from 'next/router';

const UpdateButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, data, error } = useSelector((state: { user: { loading: boolean; data: any; error: string } }) => state.user);

  const handleClick = async () => {
    dispatch(fetchUserDataAction({}));
    try {
      const data = await fetchUserData();
      dispatch(fetchUserDataSuccess(data));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'User not authenticated') {
          router.push('/login');
        } else {
          dispatch(fetchUserDataError(error.message));
        }
      } else {
        dispatch(fetchUserDataError('An unknown error occurred'));
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Button variant="contained" color="primary" onClick={handleClick} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Fetch User Data'}
      </Button>
      {loading && <Typography mt={2}>Loading...</Typography>}
      {data && (
        <Box mt={2} width="100%">
          <Typography variant="h6">User Data:</Typography>
          {Array.isArray(data) ? data.map((item, index) => (
            <Box key={index} p={2} bgcolor="#fff" borderRadius={1} boxShadow={1} mt={1}>
              {JSON.stringify(item, null, 2)}
            </Box>
          )) : (
            <Box p={2} bgcolor="#fff" borderRadius={1} boxShadow={1} mt={1}>
              {JSON.stringify(data, null, 2)}
            </Box>
          )}
        </Box>
      )}
      {error && <Typography color="error" mt={2}>{error}</Typography>}
    </Box>
  );
};

export default UpdateButton;
