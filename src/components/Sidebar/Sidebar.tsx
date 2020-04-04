import React from "react";
import styled from "styled-components";
import Priceslider from "../Priceslider/Priceslider";

const SidebarContainer = styled.div`
  grid-area: aside;
  padding-right: 60px;
  grid-row-start: 2;
`;

const SidebarBlock = styled.div``;

const SidebarBlockTitle = styled.h3`
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarBlock>
        <SidebarBlockTitle>Price</SidebarBlockTitle>
        <Priceslider />
      </SidebarBlock>
    </SidebarContainer>
  );
};

export default Sidebar;
