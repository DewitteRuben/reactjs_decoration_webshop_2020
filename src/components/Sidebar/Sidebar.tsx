import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  grid-area: aside;
`;

const Sidebar: React.FC = () => {
  return <SidebarContainer><p>Sidebar</p></SidebarContainer>;
};

export default Sidebar;
