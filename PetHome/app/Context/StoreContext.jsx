import React, { createContext } from "react";
import Store from "./Store";

export const StoreContext = createContext({});

const store = new Store()

export const StoreProvider = ({ children }) => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};
