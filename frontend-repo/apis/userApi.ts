import axios from 'axios';

const API_URL = 'http://localhost:5001/data/us-central1/api';

export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
