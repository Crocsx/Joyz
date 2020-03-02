import { RootState } from "store/store";
import { AuthStoreState } from "./auth.reducer";

export const getAuthState = (store: RootState): AuthStoreState => store.authStore as AuthStoreState;

export const getToken = (store): string => {
    return getAuthState(store) ? getAuthState(store).token : '';
}

