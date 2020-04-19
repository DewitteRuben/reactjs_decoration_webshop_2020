import React from "react";
import styled from "styled-components";
import IconWithLabel from "../IconWithLabel/IconWithLabel";
import IconLink from "../IconLink/IconLink";
import { useStores } from "../../hooks/use-stores";
import Skeleton from "react-loading-skeleton";
import { observer } from "mobx-react";

const UserInfoCardContainer = styled.div`
  padding: 15px;
  min-width: 150px;
  max-height: 96px;

  border-radius: 20px;
  border: 1px solid ${props => props.theme.border};

  display: flex;
  justify-content: space-around;
`;

interface IItemDetailActionProps {
  userId: string;
}

const ItemDetailAction: React.FC<IItemDetailActionProps> = observer(({ userId }) => {
  const { firebaseStore } = useStores();
  const loaded = firebaseStore.authStatus.loaded;
  const isLoggedIn = firebaseStore.isLoggedIn;
  const user = firebaseStore.currentUser;

  if ((loaded && !isLoggedIn) || user?.userId !== userId) {
    return null;
  }

  return (
    <UserInfoCardContainer>
      {loaded ? (
        <>
          <IconLink>
            <IconWithLabel name="edit">Edit</IconWithLabel>
          </IconLink>
          <IconLink>
            <IconWithLabel name="delete">Delete</IconWithLabel>
          </IconLink>
        </>
      ) : (
        <>
          <Skeleton height={28} width={60} />
          <Skeleton height={28} width={60} />
        </>
      )}
    </UserInfoCardContainer>
  );
});

export default ItemDetailAction;
