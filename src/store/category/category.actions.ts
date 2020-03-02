import { Category } from "types/default.t";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

export interface addCategoryPayload {
    category: Category;
}
export const addCategory = (payload: addCategoryPayload) => ({
    type: ADD_CATEGORY,
    payload
});

export interface setCategoryPayload {
    categories: Array<Category>;
}
export const setCategory = (payload: setCategoryPayload) => ({
    type: SET_CATEGORIES,
    payload
});

export interface deleteCategoryPayload {
    id: number;
}
export const deleteCategory = (payload: deleteCategoryPayload) => ({
    type: DELETE_CATEGORY,
    payload
});

export interface updateCategoryPayload {
    id: number;
    changes: Partial<Category>;
}
export const updateCategory = (payload: updateCategoryPayload) => ({
    type: UPDATE_CATEGORY,
    payload
});