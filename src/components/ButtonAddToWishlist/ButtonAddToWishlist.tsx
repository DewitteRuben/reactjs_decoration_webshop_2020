import React from "react";
import { useStores } from "../../hooks/use-stores";
import { IShopItem } from "../../io-ts-types";
import { WishlistStore } from "../../store/WishlistStore";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon";
import { useObserver } from "mobx-react";

const handleToggleFavorite = (wishlistStore: WishlistStore) => (item: IShopItem) => (state: boolean) => {
  wishlistStore.toggleItem(item);
};

interface IButtonAddToWishlistProps {
  item: IShopItem;
}

const ButtonAddToWishlist: React.FC<IButtonAddToWishlistProps> = ({ item }) => {
  const { wishlistStore } = useStores();
  const hasItem = wishlistStore.hasItem(item.id);

  return useObserver(() => <FavoriteIcon active={hasItem} onFavorite={handleToggleFavorite(wishlistStore)(item)} />);
};

export default ButtonAddToWishlist;
