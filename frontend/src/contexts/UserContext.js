import { createContext } from "react";

export const UserContext = createContext({
    'loggedIn': false,
    'userInfo': {},
    'userRole': null
});