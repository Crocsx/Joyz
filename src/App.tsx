import React from 'react';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import './App.css';
import 'antd/dist/antd.css';
import 'styles/override.css';

import BrowsingRouter from 'components/browsingRouter/browsingRouter';

import 'interceptors/axios.interceptor';
import Header from 'components/header/header';

function App(): JSX.Element {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <section className="App">
        <Router history={history}>
          <header className="App-header">
            <Header></Header>
          </header>
          <section className="App-content">
            <BrowsingRouter></BrowsingRouter>
          </section>
          <footer className="App-footer">
          </footer>
        </Router>
      </section>
    </div>
  );
}

export default App;
