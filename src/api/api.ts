import { INewShopItem } from "./../io-ts-types/index";
import { ICategoryQuery } from "../store/ItemStore";
import _ from "lodash";
const baseURL = process.env["REACT_APP_BASE_URL"] || "http://localhost:3000/api";

export interface IParams {
  key: string;
  value?: string;
}

const request = (
  endpoint: string,
  method: "GET" | "POST" = "GET",
  params: IParams[] = [],
  data: object = {},
  options: RequestInit = {}
) => {
  const parsedParams = params
    .filter(param => param.value)
    .map(param => `${param.key}=${param.value}`)
    .join("&");

  const mergedOptions = _.merge(
    {
      headers: {
        "Content-Type": "application/json"
      }
    },
    options
  );

  return fetch(`${baseURL}/${endpoint}${params?.length ? `?${parsedParams}` : ""}`, {
    method,
    body: method === "POST" ? JSON.stringify(data) : undefined,
    ...(method === "POST" ? mergedOptions : options)
  });
};

const getItemByCategory = (query: ICategoryQuery) => {
  const filters: IParams[] = Object.keys(query).map((key: string) => ({ value: query[key], key }));
  return request("shopitem", "GET", filters);
};

const getItemsWithFilters = (filters: IParams[]) => {
  return request("shopitem", "GET", filters);
};

const getItemById = (id: string) => {
  const filter: IParams = { key: "id", value: id };
  return request("shopitem", "GET", [filter]);
};

const addItem = (item: INewShopItem, token: string) => {
  return request("shopitem", "POST", [], item, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export { getItemByCategory, getItemsWithFilters, getItemById, addItem };
