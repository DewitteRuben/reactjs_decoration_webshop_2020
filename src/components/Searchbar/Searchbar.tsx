import React from "react";
import TextInput from "../Input/Input";
import { useStores } from "../../hooks/use-stores";
import _ from "lodash";
import { useHistory } from "react-router-dom";

const Searchbar: React.FC = ({ ...props }) => {
  const { itemStore } = useStores();
  const history = useHistory();

  const handleOnChange = (text: string) => {
    _.debounce(() => itemStore.fetchItemsBySearchString(text))();
  };

  const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      return history.push("/");
    }
  };

  return (
    <TextInput
      onKeyPress={handleOnEnter}
      type="text"
      label="Search"
      onChangeText={handleOnChange}
      icon="search"
      {...props}
    />
  );
};

export default Searchbar;
