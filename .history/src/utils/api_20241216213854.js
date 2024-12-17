import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.spacexdata.com/v4',
});

export const getLaunches = async () => {
  const response = await api.get('/launches');
  return response.data;
};

export default api;
