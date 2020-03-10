import React from "react";
import styled from "styled-components";
import Priceslider from "../Priceslider/Priceslider";
import Icon from "../Icon/Icon";

const SidebarContainer = styled.div`
  grid-area: aside;
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Priceslider onChangeValue={(range: number[]) => console.log(range)} />
    </SidebarContainer>
  );
};

export default Sidebar;
