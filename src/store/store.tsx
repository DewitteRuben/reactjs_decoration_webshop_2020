import React from "react";
import ItemStore from "./ItemStore";
import NavigationStore from "./NavigationStore";

export const storesContext = React.createContext({
  navStore: new NavigationStore(),
  itemStore: new ItemStore()
});

export default storesContext;
