import React from "react";
import { useStores } from "../../hooks/use-stores";
import styled from "styled-components";
import RouterLink from "../Link/RouterLink/RouterLink";
import { observer } from "mobx-react";

const NewItemContainer = styled.div`
  padding: 6px;
`;

const ButtonNewItem: React.FC = observer(() => {
  const { firebaseStore } = useStores();

  if (firebaseStore.isLoggedIn) {
    return (
      <NewItemContainer>
        <RouterLink to="/new">Add a new item</RouterLink>
      </NewItemContainer>
    );
  }

  return null;
});

export default ButtonNewItem;
