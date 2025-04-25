import axios from '../axios';

export const registerUser = async (userData) => {
  const response = await axios.post('/register', userData);
  return response.data;
};
