import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Row, Card, Alert} from 'antd';
import Axios from 'axios-observable';
import Constant from 'App.constant';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import styles from './login.module.css'
import { AntdAlert, AlertType } from 'types/default.t';

const Login = (props: RouteComponentProps): JSX.Element => {
  const authKey = localStorage.getItem("auth_key");
  const [getUsername, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getAlert, setAlert] = useState({
    message: '',
    type: AlertType.WARNING,
    display: false
  } as AntdAlert);

  const { history }: RouteComponentProps = props;

  const requestLogin = (): void => {
    Axios.post(`${Constant.API_PATH}login/`, null, {
      auth: {
        username: getUsername,
        password: getPassword
      }
    }).subscribe((res: AxiosResponse<{user_id: string; token: string; email: string }>) => {
      localStorage.setItem('auth_key', res.data.token);
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
      {authKey && <Redirect to={"/"}></Redirect>}
      {
        <Row justify='center' align='middle' style={{ height: '100vh' }}>
          <Row justify='center'>
            <Card title={"Login"} className={styles['Login-form']}>
              {getAlert.display && <Alert message={getAlert.message} type={getAlert.type}></Alert>}
              <Form colon={false} onFinish={(): void => requestLogin()}>
                <Form.Item label=' ' labelCol={{span: 1}} wrapperCol={{span: 23}} hasFeedback>
                  <Input
                    onChange={(e): void => setUsername(e.target.value)}
                    type='text'
                    placeholder={'username'}
                  />
                </Form.Item>
                <Form.Item label=' ' labelCol={{span: 1}} wrapperCol={{span: 23}} hasFeedback>
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

export default withRouter(Login);