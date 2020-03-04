import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Row, Card, Alert} from 'antd';
import Axios from 'axios-observable';
import Constant from 'App.constant';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import styles from './login.module.css'
import { AntdAlert, AlertType } from 'types/default.t';
import { login, loginPayload } from 'store/auth/auth.actions';
import { connect } from 'react-redux';
import { getToken } from 'store/auth/auth.selector';

interface LoginProps extends RouteComponentProps{
  token: string;
  login: (payload: loginPayload) => void;
}


const Login = (props: LoginProps): JSX.Element => {
  const [getUsername, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getAlert, setAlert] = useState({
    message: '',
    type: AlertType.WARNING,
    display: false
  } as AntdAlert);

  const { history, token, login }: LoginProps = props;

  const requestLogin = (): void => {
    Axios.post(`${Constant.API_PATH}login/`, null, {
      auth: {
        username: getUsername,
        password: getPassword
      }
    }).subscribe((res: AxiosResponse<{user_id: string; token: string; email: string }>) => {
      login({token: res.data.token});
      history.push('/');
    }, (err: AxiosResponse<{detail: string}>) => {
      setAlert({
        message: err.data.detail,
        type: AlertType.ERROR,
        display: true
      })
    })
  }

  return (
    <div>
      {token !== '' && <Redirect to={"/"}></Redirect>}
      {
        <Row justify='center' align='middle' style={{ height: '100%' }}>
          <Row justify='center'>
            <Card title={"Login"} className={styles['Login-form']}>
              {getAlert.display && <Alert message={getAlert.message} type={getAlert.type}></Alert>}
              <Form colon={false} onFinish={(): void => requestLogin()}>
                <Form.Item
                  name={['username']}
                  rules={[{ required: true, message: 'Please insert a username' }]}
                  label=' '
                  labelCol={{span: 1}}
                  wrapperCol={{span: 23}}
                  hasFeedback>
                  <Input
                    onChange={(e): void => setUsername(e.target.value)}
                    type='text'
                    placeholder={'username'}
                  />
                </Form.Item>
                <Form.Item
                  name={['password']}
                  rules={[{ required: true, message: 'Please insert a password' }]}
                  label=' '
                  labelCol={{span: 1}}
                  wrapperCol={{span: 23}}
                  hasFeedback>
                  <Input
                    onChange={(e): void => setPassword(e.target.value)}
                    type='password'
                    placeholder={'password'}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    disabled={getUsername === '' || getPassword === ''}>
                      Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Row>
        </Row>
      }
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
  { login }
)(Login));