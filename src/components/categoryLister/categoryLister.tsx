import React from 'react';
import { Spin } from 'antd';
import Axios from 'axios-observable';
import Constant from 'App.constant';
import { Category } from 'types/default.t';
import CategoryCard from './categoryCard/categoryCard';
import { connect } from 'react-redux';
import { setCategory, setCategoryPayload } from "store/category/category.actions";
import { getCategoriesArray } from "store/category/category.selector";
import CategoryCreator from './categoryCreator/categoryCreator';

interface CategoryListerState {
  loading: boolean;
}

interface CategoryListerProps {
  categories: Array<Category>;
  setCategory: (category: setCategoryPayload) => void;
}

export class CategoryLister extends React.Component<CategoryListerProps, CategoryListerState> {
  state = {
    loading: false,
    categories: new Array<Category>()
  }

  componentDidMount(): void {
    this.setState({loading: true});
    Axios.get<Array<Category>>(`${Constant.API_PATH}categories/`).subscribe(res => {
      this.props.setCategory({categories: res.data});
      this.setState({
        loading: false
      });
    })
  }

  render(): JSX.Element {
    return (
      <Spin spinning={this.state.loading}>
        <CategoryCreator></CategoryCreator>
        <div>
          {this.props.categories.sort((a,b) => (a.id < b.id ? 1 : -1)).map(cat => {
            return <CategoryCard category={cat} key={cat.id} ></CategoryCard>
          })}
        </div>
      </Spin>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: getCategoriesArray(state)
  }
}

export default connect(
  mapStateToProps,
  { setCategory }
)(CategoryLister);