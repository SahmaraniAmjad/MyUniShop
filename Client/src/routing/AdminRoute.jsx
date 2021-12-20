import React from 'react';
import { Redirect, Route } from 'react-router';
import { getToken } from '../utils';
import { isAdmin } from './helper';

export const AdminRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      getToken() ? (
        isAdmin() ? (
          <Route {...props} component={component} />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
      ) : (
          <Redirect
            to={{ pathname: '/signin', state: { from: props.location } }}
          />
        )
    }
  />
)