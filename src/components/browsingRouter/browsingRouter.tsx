import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter
} from 'react-router-dom'



import PrivateRoute from 'components/privateRoute/privateRoute';
import CategoryLister from 'components/categoryLister/categoryLister';
import Login from 'components/login/login';


const BrowsingRouter = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={CategoryLister} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default BrowsingRouter;