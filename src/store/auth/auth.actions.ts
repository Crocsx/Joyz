export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface loginPayload {
    token: string;
}

export const login = (payload: loginPayload) => ({
    type: LOGIN,
    payload
});

export const logout = () => ({
    type: LOGOUT
});