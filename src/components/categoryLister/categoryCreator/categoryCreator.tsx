import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { Category } from 'types/default.t';
import { connect } from 'react-redux';
import { addCategory, addCategoryPayload } from "store/category/category.actions";
import Axios from 'axios-observable';
import Constant from 'App.constant';

interface CategoryCreatorProps {
  addCategory: (category: addCategoryPayload) => void;
}

const CategoryCreator = (props: CategoryCreatorProps): JSX.Element => {
  const [getLoading, setLoading] = useState(false);
  const [getCategoryName, setCategoryName] = useState('');
  const [getCategoryDescription, setCategoryDescription] = useState('');
  const { addCategory } = props;

  const requestAddCategory = (): void => {
    setLoading(true);
    Axios.post<Category>(`${Constant.API_PATH}categories/`, {name: getCategoryName, description: getCategoryDescription}).subscribe(res => {
      setCategoryName('');
      setCategoryDescription('');
      setLoading(false);
      addCategory({category: res.data});
    })
  }

  return (
    <Spin spinning={getLoading}>
      <p>Create New Category :</p>
      <Form colon={false} onFinish={(): void => requestAddCategory()}>
        <Form.Item
          name={['name']}
          rules={[{ required: true, message: 'Please insert a name' }]}
          label=' '
          labelCol={{span: 1}}
          wrapperCol={{span: 23}}
          hasFeedback>
          <Input
            onChange={(e): void => setCategoryName(e.target.value)}
            type='text'
            placeholder={'name'}
          />
        </Form.Item>
        <Form.Item
          name={['description']}
          rules={[{ required: true, message: 'Please insert a description' }]}
          label=' '
          labelCol={{span: 1}}
          wrapperCol={{span: 23}}
          hasFeedback>
          <Input
            onChange={(e): void => setCategoryDescription(e.target.value)}
            type='text'
            placeholder={'description'}
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{float: "right"}}
            type='primary'
            htmlType='submit'
            disabled={getCategoryName === '' || getCategoryDescription === ''}>
              Create
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default connect(
  null,
  { addCategory }
)(CategoryCreator);