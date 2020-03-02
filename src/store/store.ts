import { createStore } from "redux";
import rootReducer from "./reducers";
import { CategoryStoreState } from "./category/category.reducer";

export interface Store {
    categoryStore: CategoryStoreState;
}

export default createStore(
    rootReducer
);