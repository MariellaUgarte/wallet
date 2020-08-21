import React from 'react';
import { useUserStore } from './context/UserContext';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const user = useUserStore();
    return <Route {...rest} render={
        props => {
            if(user.isAuthenticated)
                return <Component {...rest} {...props}/>
            else
                return <Redirect to={{
                    pathname: '/signin',
                    state: {
                        from: props.location
                    }
                }}/>
        }
    }/>
};

export default ProtectedRoute;