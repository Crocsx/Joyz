import React from 'react';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import './App.css';
import 'antd/dist/antd.css';
import 'styles/override.css';

import { LogoutOutlined } from '@ant-design/icons';
import BrowsingRouter from 'components/browsingRouter/browsingRouter';

import 'interceptors/axios.interceptor';

function App(): JSX.Element {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <header className="App-header">
        Course Demo
        {localStorage.getItem("auth_key") && <LogoutOutlined className="App-logout" onClick={(): void => {
          localStorage.setItem("auth_key", "");
          history.push('/login');
        }}></LogoutOutlined>}
      </header>
      <section className="App-content">
        <Router history={history}>
          <BrowsingRouter></BrowsingRouter>
        </Router>
      </section>
      <footer className="App-footer">
      </footer>
    </div>
  );
}

export default App;
