import React from "react";
import ItemList from "../ItemList/ItemList";
import { useStores } from "../../hooks/use-stores";
import { autorun } from "mobx";
import { useObserver } from "mobx-react";

interface IUserFeedProps {
  userId: string;
}

const UserFeed: React.FC<IUserFeedProps> = ({ userId }) => {
  const { itemStore } = useStores();
  const isLoading = itemStore.status.state === "pending";

  React.useEffect(() => {
    return autorun(() => {
      itemStore.fetchItemsByUserId(userId);
    });
  }, [itemStore, userId]);

  return useObserver(() => <ItemList items={itemStore.getItems()} loading={isLoading} amount={itemStore.amount} />);
};

export default UserFeed;
