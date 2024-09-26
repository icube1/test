import React, { createContext, useContext } from "react";
import { createStore } from "../models/OrgsModel";

const StoreContext = createContext(createStore());

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StoreContext.Provider value={createStore()}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);