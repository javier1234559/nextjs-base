import { axiosMapInstance } from "@/axios/baseApi";
import { globalConfig } from "@/globalConfig";

export const getMapCompleteAddress = async (address: string) => {
    const response = await axiosMapInstance.get(`/${address}.json`, {
        params: {
            access_token: globalConfig.MAPBOX_TOKEN,
            autocomplete: true,
        },
    });
    return response.data;
};