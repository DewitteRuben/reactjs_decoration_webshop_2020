import React from "react";
import NewItemForm from "../../components/NewItemForm/NewItemForm";
import { BackgroundContainer } from "../../components/FormBuilderComponents";

const NewItem: React.FC = () => {
  return (
    <BackgroundContainer>
      <NewItemForm />
    </BackgroundContainer>
  );
};

export default NewItem;
