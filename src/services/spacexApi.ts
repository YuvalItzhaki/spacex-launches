import axios from "axios";
import { Launch, Rocket } from "../types/spacex";

const BASE_URL = "https://api.spacexdata.com/v4";

export const getLaunches = async (): Promise<Launch[]> => {
  const response = await axios.get<Launch[]>(`${BASE_URL}/launches`);
  return response.data;
};

export const getRocket = async (rocketId: string): Promise<Rocket> => {
  const response = await axios.get<Rocket>(`${BASE_URL}/rockets/${rocketId}`);
  return response.data;
};
