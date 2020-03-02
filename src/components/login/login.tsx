import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button} from 'antd';
import Axios from 'axios-observable';
import Constant from 'App.constant';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AxiosResponse } from 'axios';

const Login = (props: RouteComponentProps): JSX.Element => {
  const authKey = localStorage.getItem("auth_key");
  const [getUsername, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");
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
    })
  }

  return (
    <div>
        {authKey && <Redirect to={"/"}></Redirect>}
        {
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
        }
    </div>
  )
}

export default withRouter(Login);