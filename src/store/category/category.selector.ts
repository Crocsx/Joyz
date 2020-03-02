import { CategoryStoreState } from "./category.reducer";
import { Category } from "types/default.t";
import { RootState } from "store/store";

export const getCategoryState = (store: RootState): CategoryStoreState => store.categoryStore as CategoryStoreState;

export const getCategories = (store): Map<number, Category> =>
    getCategoryState(store) ? getCategoryState(store).categories : new Map<number, Category>();

export const getCategoriesArray = (store: RootState): Array<Category> => {
    return getCategoryState(store) ? Array.from(getCategoryState(store).categories.values()) : new Array<Category>();
}