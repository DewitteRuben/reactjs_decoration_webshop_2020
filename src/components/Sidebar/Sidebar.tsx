import React from "react";
import styled from "styled-components";
import Priceslider from "../Priceslider/Priceslider";
import Typography from "../Typography/Typography";
import Skeleton from "react-loading-skeleton";
import { useStores } from "../../hooks/use-stores";
import { observer } from "mobx-react";
import { Spacer } from "../Layout";

const SidebarContainer = styled.div`
  grid-area: aside;
  padding-right: 60px;
  grid-row-start: 2;
  box-sizing: border-box;
  min-width: 285px;
`;

const SidebarBlock = styled.div``;

const SidebarBlockTitle = styled.h3`
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
`;

const Sidebar: React.FC = observer(() => {
  const { itemStore } = useStores();

  return (
    <SidebarContainer>
      <SidebarBlock>
        <SidebarBlockTitle>General</SidebarBlockTitle>
        <Typography>{`Item${itemStore.amount === 0 || itemStore.amount > 1 ? "s" : ""}: ${itemStore.amount}`}</Typography>
      </SidebarBlock>
      <Spacer />
      {itemStore.minPrice && itemStore.maxPrice && (
        <SidebarBlock>
          <SidebarBlockTitle>Price</SidebarBlockTitle>
          <Priceslider />
        </SidebarBlock>
      )}
    </SidebarContainer>
  );
});

export default Sidebar;
