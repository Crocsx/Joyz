import React from 'react';
import {
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom'

const PrivateRoute = (props: RouteProps): JSX.Element => {
  const authKey = localStorage.getItem("auth_key");
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