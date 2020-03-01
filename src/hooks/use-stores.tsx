import React from "react";
import { storesContext } from "../store/store";

export const useStores = () => React.useContext(storesContext);