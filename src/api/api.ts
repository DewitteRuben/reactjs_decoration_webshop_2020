import { INewShopItem, INewUser, IShopItem } from "./../io-ts-types/index";
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
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
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

const updateWishlistCount = (shopItemId: string, decr?: boolean) => {
  const filters: IParams[] = [
    { key: "id", value: shopItemId },
    { key: "type", value: decr ? "decr" : "incr" }
  ];

  return request("shopitem", "PUT", filters);
};

const updateItemById = (token: string, id: string, updates: Partial<IShopItem>) => {
  const filters: IParams[] = [{ key: "id", value: id }];
  return request("shopitem", "PUT", filters, updates, getAuthorizationOptions(token));
};

const deleteItemById = (token: string, id: string) => {
  const filters: IParams[] = [{ key: "id", value: id }];
  return request("shopitem", "DELETE", filters, undefined, getAuthorizationOptions(token));
};

const isValidURL = async (url: string) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(resp => resolve(resp.ok))
      .catch(err => resolve(false));
  });
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
  getPartialUserById,
  updateWishlistCount,
  updateItemById,
  deleteItemById,
  isValidURL
};
