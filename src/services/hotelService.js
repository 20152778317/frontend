import axios from '../axios';

export const getHoteles = async () => {
  const response = await axios.get('/hoteles');
  return response.data;
};

export const createHotel = async (hotelData) => {
  const response = await axios.post('/hoteles', hotelData);
  return response.data;
};
