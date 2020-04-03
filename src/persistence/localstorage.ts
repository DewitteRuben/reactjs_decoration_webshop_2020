import { IShopItem } from "./../io-ts-types/index";
import { get, set } from "local-storage";

const KEYS = {
  CART: "DECO_APP_LOCAL_CART"
};

const persistCart = (shopItems: IShopItem[]) => {
  return set(KEYS.CART, shopItems);
};

const loadCart = (): IShopItem[] => {
  return get(KEYS.CART);
};

export { persistCart, loadCart };
