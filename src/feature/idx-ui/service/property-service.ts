import axiosInstance from "@/axios/baseApi";
import { globalConfig } from "@/globalConfig";
import { Filter, FilterExpr } from "../types/ODataOperators";

export interface PropertyParams {
  /** How many results to return (limit per request). Example: $top=20 */
  $top?: number;

  /** How many results to skip (for pagination). Example: $skip=40 */
  $skip?: number;

  /** Sort results. Example: $orderby="ListPrice desc" */
  $orderby?: string;

  /** Which fields to include. Example: $select="ListingKey,City,ListPrice" */
  $select?: string;

  /** Include related data. Example: $expand="Media($top=5)" */
  $expand?: string;

  /** Return total count of matching results. Example: $count=true */
  $count?: boolean;

  /** Fields to exclude. Example: $unselect="Photos,OpenHouse" */
  $unselect?: string;

  /** Custom filter object. Will be converted to $filter string. */
  $filter?: string;

  /** Quick filter for city. Example: City eq 'Austin' */
  City?: FilterExpr;

  /** Quick filter for listing price. Example: ListPrice gt 500000 */
  ListPrice?: FilterExpr;

  /** Quick filter for bedrooms. Example: BedroomsTotal ge 3 */
  BedroomsTotal?: FilterExpr;

  /** Quick filter for property type. Example: PropertyType eq 'Residential' */
  PropertyType?: FilterExpr;
}


export const getProperties = async (params: PropertyParams) => {
  const response = await axiosInstance.get("/test_sd/Property", {
    params: {
      access_token: globalConfig.ACCESS_TOKEN,
      ...params,
    },
  });
  return response.data;
};

// Example usage:
/*
getProperties({
  $top: 10, // return 10 results
  $skip: 20, // skip first 20 results (page 3 if page size = 10)
  $orderby: "ListPrice desc", // sort by price high → low
  $select: "ListingKey,City,ListPrice,BedroomsTotal", // pick specific fields
  $count: true, // also return total count
  City: { field: "City", op: "eq", value: "Austin" }, // filter by city
  ListPrice: { field: "ListPrice", op: "gt", value: 500000 }, // price > 500k
  BedroomsTotal: { field: "BedroomsTotal", op: "ge", value: 3 } // at least 3 beds
}).then(data => {
  console.log(data);
});
*/
