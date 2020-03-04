import { LOGIN, loginPayload, LOGOUT } from "./auth.actions";

export interface AuthStoreState {
    token: string;
}

const initialState: AuthStoreState = {
  token: ''
};

export default function(state = initialState, action): AuthStoreState {
  switch (action.type) {
    case LOGIN: {
      const { token } = action.payload as loginPayload;
      localStorage.setItem('token',token);
      return {
        ...state,
        token
      };
    }
    case LOGOUT: {
      localStorage.removeItem('token');
      return {
        ...state,
        token: ''
      };
    }
    default:
      return state;
  }
}
