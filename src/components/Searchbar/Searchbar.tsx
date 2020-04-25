import React from "react";
import TextInput from "../Input/Input";
import { useStores } from "../../hooks/use-stores";
import _ from "lodash";

const Searchbar: React.FC = ({ ...props }) => {
  const { itemStore } = useStores();

  const handleOnChange = (text: string) => {
    _.debounce(() => itemStore.fetchItemsBySearchString(text))();
  };

  return <TextInput type="text" label="Search" onChangeText={handleOnChange} icon="search" {...props} />;
};

export default Searchbar;
