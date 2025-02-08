import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { fetchUserData } from '@/apis/userApi';
import { fetchUserData as fetchUserDataAction, fetchUserDataSuccess, fetchUserDataError } from '@/store/actions';

const UpdateButton = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: { user: { loading: boolean; data: any; error: string } }) => state.user);

  const handleClick = async () => {
    dispatch(fetchUserDataAction({}));
    try {
      const data = await fetchUserData();
      dispatch(fetchUserDataSuccess(data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchUserDataError('something went wrong'));
      } else {
        dispatch(fetchUserDataError('An unknown error occurred'));
      }
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Fetch User Data
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {data && (
        <Typography>
          {Array.isArray(data) ? data.map((item, index) => (
            <div key={index}>{JSON.stringify(item)}</div>
          )) : JSON.stringify(data)}
        </Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default UpdateButton;
