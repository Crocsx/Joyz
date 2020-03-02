import { CategoryStoreState } from "./category.reducer";
import { Category } from "types/default.t";
import { Store } from "store/store";

export const getCateogryState = (store: Store): CategoryStoreState => store.categoryStore as CategoryStoreState;

export const getCategories = (store): Map<number, Category> =>
    getCateogryState(store) ? getCateogryState(store).categories : new Map<number, Category>();

export const getCategoriesArray = (store: Store): Array<Category> => {
    return getCateogryState(store) ? Array.from(getCateogryState(store).categories.values()) : new Array<Category>();
}