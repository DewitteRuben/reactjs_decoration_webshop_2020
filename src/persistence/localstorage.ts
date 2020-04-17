import { IShopItem } from "./../io-ts-types/index";
import { get, set } from "local-storage";

const KEYS = {
  CART: "DECO_APP_LOCAL_CART",
  WISHLIST: "DECO_APP_LOCAL_WISHLIST"
};

const persistCart = (shopItems: IShopItem[]) => {
  return set(KEYS.CART, shopItems);
};

const loadCart = (): IShopItem[] => {
  return get(KEYS.CART);
};

const loadWishlist = (): IShopItem[] => {
  return get(KEYS.WISHLIST);
};

const persistWishlist = (shopItems: IShopItem[]) => {
  set(KEYS.WISHLIST, shopItems);
};

export { persistCart, loadCart, loadWishlist, persistWishlist };
