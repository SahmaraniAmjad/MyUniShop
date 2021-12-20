import React from 'react';
import { Redirect, Route } from 'react-router';
import { getToken } from '../utils';

export const PrivateRoute = ({component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      getToken() ? (
        <Route {...props} component={component} />
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        />
      )
    }
  />
)