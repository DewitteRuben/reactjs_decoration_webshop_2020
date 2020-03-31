import React from "react";
import ItemStore from "./ItemStore";
import NavigationStore from "./NavigationStore";
import { CartStore } from "./CartStore";
import { DetailStore } from "./DetailStore";
import FirebaseStore from "./FirebaseStore";

export const storesContext = React.createContext({
  navStore: new NavigationStore(),
  itemStore: new ItemStore(),
  cartStore: new CartStore(),
  detailStore: new DetailStore(),
  firebaseStore: new FirebaseStore()
});

export default storesContext;
