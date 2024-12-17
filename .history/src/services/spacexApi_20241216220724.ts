// src/utils/api.js
import axios from 'axios';

const BASE_URL = 'https://api.spacexdata.com/v4';

export const getLaunches = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/launches`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch launches.');
  }
};

export const getLaunchById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/launches/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch launch details.');
  }
};
