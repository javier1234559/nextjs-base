import axios from "axios";

import { globalConfig } from "@/globalConfig";

export const axiosInstance = axios.create({
  baseURL: globalConfig.API_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${globalConfig.ACCESS_TOKEN}`,
  },
});

export const axiosMapInstance = axios.create({
  baseURL: globalConfig.MAP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${globalConfig.MAPBOX_TOKEN}`,
  },
});


export default axiosInstance;
