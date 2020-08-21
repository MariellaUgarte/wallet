import React, {useReducer, useEffect, useState, createContext, useContext} from 'react';
import { setUser } from '../actions/authActions';
import authReducer from '../reducers/authReducer';

const DispatchUser = createContext(null);
const StoreUser = createContext(null);

const UserContext = ({children}) => {

    const [ userState, dispatch ] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    });

    useEffect(() => {
        if(localStorage.token)
            dispatch(setUser(localStorage.token || ""));
    }, []);

    return (
        <DispatchUser.Provider value={dispatch}>
            <StoreUser.Provider value={userState}>            
                { children }
            </StoreUser.Provider>
        </DispatchUser.Provider>
    );
};

export default UserContext;
export const useUserDispatch = () => useContext(DispatchUser);
export const useUserStore = () => useContext(StoreUser);