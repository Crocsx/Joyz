import React, { useState } from 'react';
import { Card, Input, Spin, Tooltip, Button } from 'antd';
import { Category } from 'types/default.t';
import { DeleteOutlined, EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import { deleteCategory, updateCategory, deleteCategoryPayload, updateCategoryPayload } from "store/category/category.actions";
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios-observable';
import Constant from 'App.constant';

interface CategoryCardProps {
  category: Category;
  deleteCategory: (payload: deleteCategoryPayload) => void;
  updateCategory: (payload: updateCategoryPayload) => void;
}

const CategoryCard = (props: CategoryCardProps): JSX.Element => {
  const { category, deleteCategory, updateCategory } = props;

  const [getLoading, setLoading] = useState(false);
  const [getEditMode, setEditMode] = useState(false);
  const [getName, setName] = useState(category.name);
  const [getDescription, setDescription] = useState(category.description);


  const deleteCard = (payload: deleteCategoryPayload): void => {
    setLoading(true);
    Axios.delete<null>(`${Constant.API_PATH}categories/${payload.id}`).subscribe(res => {
      setLoading(false);
      deleteCategory(payload);
    })
  }

  const updateCard = (payload: updateCategoryPayload): void => {
    setLoading(true);
    Axios.put<Category>(`${Constant.API_PATH}categories/${payload.id}`, {...category, ...payload.changes}).subscribe(res => {
      updateCategory({id: res.data.id, changes: res.data});
      setEditMode(false)
      setLoading(false);
    })
  }

  const cancelChanges = (): void => {
    setName(props.category.name);
    setDescription(props.category.description);
    setEditMode(false)
  }

  const getCard = (): JSX.Element => {
    return(
      <Card title={
        <div style={{display: "inline-flex", width: "100%"}}>
          <div style={{width: "90%"}} >{getName}</div>
          <div style={{width: "10%", display: 'flex', justifyContent: 'space-evenly'}}>
            <Tooltip title="Edit category">
              <EditOutlined onClick={(): void => setEditMode(true)}/>
            </Tooltip>
            <Tooltip title="Delete category">
              <DeleteOutlined onClick={(): void => deleteCard({id: category.id})}/>
            </Tooltip>
          </div>
        </div>
      }>
        {getDescription}
      </Card>
    )
  }

  const getEditableCard = (): JSX.Element => {
    return(
      <Card title={
        <div style={{display: "inline-flex", width: "100%"}}>
          <Input style={{width: "90%"}} value={getName} onChange={(e): void => setName(e.target.value)}></Input>
          <div style={{width: "10%", display: 'flex', justifyContent: 'space-evenly'}}>
              <Tooltip title="Save changes">
                <Button
                  icon={<SaveOutlined />}
                  style={{ margin: "0 15%"}}
                  disabled={getName === '' || getDescription === ''}
                  onClick={(): void => updateCard({id: category.id, changes: {name: getName, description: getDescription}})}>
                </Button>
              </Tooltip>
              <Tooltip title="Cancel changes">
                <Button
                  icon={<StopOutlined />}
                  style={{ margin: "0 15%"}}
                  onClick={(): void => cancelChanges()}>
                </Button>
              </Tooltip>
          </div>
        </div>
      }>
        <TextArea value={getDescription} onChange={(e): void => setDescription(e.target.value)}> </TextArea>
      </Card>
    )
  }

  return (
    <Spin size="small" spinning={getLoading}>
      {!getEditMode && getCard()}
      {getEditMode && getEditableCard()}
    </Spin>
  )
}

export default connect(
    null,
    { deleteCategory, updateCategory }
)(CategoryCard);