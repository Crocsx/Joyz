import categoryStore from "./category/category.reducer";
import authStore from "./auth/auth.reducer";
import { combineReducers } from "redux";

export default combineReducers({ categoryStore, authStore });