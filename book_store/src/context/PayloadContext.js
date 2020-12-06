import {createContext} from 'react';

const noop = () => {};

export const PayloadContext = createContext({
    token: null,
    userId: null,
    userType: null,
    isLoggedIn: false,
    login: noop,
    logout: noop
});

