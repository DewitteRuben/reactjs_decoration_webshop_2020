import React from "react";
import NavigationStore from "./NavigationStore";


export const storesContext = React.createContext({
  navStore: new NavigationStore()
});

export default storesContext;
