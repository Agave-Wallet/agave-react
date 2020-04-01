import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        <Route {...rest} render={props => (
            rest.isAuthed ?
                <Component {...rest} />
            : <Redirect to={rest.to} />
        )} />
    );
};

export default PrivateRoute;