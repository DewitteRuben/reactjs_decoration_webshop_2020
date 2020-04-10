import { INewShopItem, INewUser } from "./../io-ts-types/index";
import { ICategoryQuery } from "../store/ItemStore";
import _ from "lodash";
const baseURL = process.env["REACT_APP_BASE_URL"] || "http://localhost:3000/api";

export interface IParams {
  key: string;
  value?: string;
}

const getAuthorizationOptions = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const request = (
  endpoint: string,
  method: "GET" | "POST" | "PUT" = "GET",
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
    body: method === "POST" || method === "PUT" ? JSON.stringify(data) : undefined,
    ...(method === "POST" || method === "PUT" ? mergedOptions : options)
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
  return request("shopitem", "POST", [], item, getAuthorizationOptions(token));
};

const addUser = (user: Partial<INewUser>, token: string) => {
  return request("user", "POST", [], user, getAuthorizationOptions(token));
};

const updateUser = (user: Partial<INewUser>, token: string) => {
  return request("user", "PUT", [], user, getAuthorizationOptions(token));
};

const getUserByToken = (token: string) => {
  return request("user", "GET", [], undefined, getAuthorizationOptions(token));
};

const getUserById = (token: string, userId: string) => {
  const filter: IParams = { key: "id", value: userId };
  return request("user", "GET", [filter], undefined, getAuthorizationOptions(token));
};

const getPartialUserById = (userId: string) => {
  const filter: IParams = { key: "id", value: userId };
  return request("user", "GET", [filter]);
};

export {
  getItemByCategory,
  getItemsWithFilters,
  getItemById,
  addItem,
  addUser,
  getUserByToken,
  getUserById,
  updateUser,
  getPartialUserById
};
