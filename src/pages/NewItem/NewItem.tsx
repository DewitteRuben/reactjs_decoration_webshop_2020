import React from "react";
import styled from "styled-components";
import NewItemForm from "../../components/NewItemForm/NewItemForm";

const BackgroundContainer = styled.div`
  padding-top: 25px;
  background-color: ${props => props.theme.gray};
  min-height: 100%;
`;

const NewItem: React.FC = () => {
  return (
    <BackgroundContainer>
      <NewItemForm />
    </BackgroundContainer>
  );
};

export default NewItem;
