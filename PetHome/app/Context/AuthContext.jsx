import React, { createContext, useContext } from "react";
import Store from "./Store";

export const AuthContext = createContext({});

const store = new Store()

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={store}>
            {children}
        </AuthContext.Provider>
    );
};
