import React from 'react';
import {
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { getToken } from 'store/auth/auth.selector';

const PrivateRoute = (props: RouteProps): JSX.Element => {
  const authKey = useSelector((state: RootState) => getToken(state));
  const {component: Component, ...rest}: any = props;
  return (
    <Route
      {...rest}
      render={(props): JSX.Element =>
        (!authKey)
        ? <Redirect to="/login" />
        : <Component {...props}/>}
    />
  )
}

export default PrivateRoute;