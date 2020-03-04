import { Category } from "types/default.t";
import { ADD_CATEGORY, addCategoryPayload, setCategoryPayload, SET_CATEGORIES, DELETE_CATEGORY, UPDATE_CATEGORY, deleteCategoryPayload, updateCategoryPayload } from "./category.actions";

export interface CategoryStoreState {
    categories: Map<number, Category>;
}

const initialState: CategoryStoreState = {
    categories: new Map<number, Category>(),
};

export default function(state = initialState, action): CategoryStoreState {
  switch (action.type) {
    case ADD_CATEGORY: {
      const { category } = action.payload as addCategoryPayload;
      state.categories.set(category.id, category);
      return {
        ...state
      };
    }
    case SET_CATEGORIES: {
      const { categories } = action.payload as setCategoryPayload;
      const categoryMap = new Map<number, Category>();
      categories.forEach(c => categoryMap.set(c.id, c));
      return {
          ...state,
        categories: categoryMap
      }
    }
    case DELETE_CATEGORY: {
        const { id } = action.payload as deleteCategoryPayload;
        state.categories.delete(id);
        return {
          ...state
        };
    }
    case UPDATE_CATEGORY: {
        const { id, changes } = action.payload as updateCategoryPayload;
        const current = state.categories.get(id);
        if(current){
            state.categories.set(id, {
                ...current,
                ...changes
            })
        }
        return {
          ...state
        };
    }
    default:
      return state;
  }
}
