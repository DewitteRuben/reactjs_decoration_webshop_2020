import React from "react";
import TextInput from "../Input/Input";

const Searchbar: React.FC = () => {
  return <TextInput type="text" label="Search" name="search" id="search" icon="search" />;
};

export default Searchbar;
