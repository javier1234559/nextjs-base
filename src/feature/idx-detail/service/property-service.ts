import axiosInstance from "@/axios/baseApi";
import { globalConfig } from "@/globalConfig";
import { PropertyDetail } from "../types/PropertyDetail";

export const getPropertyDetail = async (propertyId: string): Promise<PropertyDetail> => {
  const response = await axiosInstance.get(`/test_sd/Property('${propertyId}')`, {
    params: { access_token: globalConfig.ACCESS_TOKEN },
  });
  return response.data;
};
