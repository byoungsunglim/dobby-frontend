import { Route, Redirect } from 'react-router-dom';
import React from 'react';

function AuthRoute({ authenticated, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          render ? render(props) : <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default AuthRoute;