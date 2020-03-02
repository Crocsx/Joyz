import { createStore } from "redux";
import rootReducer from "./reducers";
import { CategoryStoreState } from "./category/category.reducer";
import { AuthStoreState } from "./auth/auth.reducer";

export interface RootState {
    categoryStore: CategoryStoreState;
    authStore: AuthStoreState;
}

export default createStore(
    rootReducer
);