import React from "react";
import ItemStore from "./ItemStore";
import NavigationStore from "./NavigationStore";
import { CartStore } from "./CartStore";
import { DetailStore } from "./DetailStore";

export const storesContext = React.createContext({
  navStore: new NavigationStore(),
  itemStore: new ItemStore(),
  cartStore: new CartStore(),
  detailStore: new DetailStore()
});

export default storesContext;
