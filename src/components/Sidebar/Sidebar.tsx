import { rem } from "polished";
import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: ${rem(290)};
  grid-area: aside;
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <p>Sample</p>
    </SidebarContainer>
  );
};

export default Sidebar;
