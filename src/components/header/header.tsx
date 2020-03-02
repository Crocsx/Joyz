import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import Constant from 'App.constant';
import Axios from 'axios-observable';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from 'store/auth/auth.actions';
import { getToken } from 'store/auth/auth.selector';

interface HeaderProps extends RouteComponentProps {
  logout: () => void;
  token: string;
}
const Header = (props: HeaderProps): JSX.Element => {
  const { history, logout, token }: HeaderProps = props;

  const requestLogout = (): void => {
    Axios.post(`${Constant.API_PATH}logout/`).subscribe(res => {
      logout();
      history.push('/login');
    })
  }

  return (
    <div>
        Course Demo
        {token !== '' && <LogoutOutlined className="App-logout" onClick={(): void => requestLogout()}></LogoutOutlined>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: getToken(state)
  }
}

export default withRouter(connect(
  mapStateToProps,
  { logout }
)(Header));