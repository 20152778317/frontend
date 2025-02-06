import axios from '../axios';

export const createRoom = async (roomData) => {
  const response = await axios.post('/habitaciones', roomData);
  return response.data;
};
