import { User } from './../../models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
    user: User | null,
    isAdmin: boolean,
    isAuthenticated: boolean,
    errors: string[],
    loading: boolean
}

const initalState: State = {
    user: null,
    isAdmin: false,
    isAuthenticated: false,
    errors: null,
    loading: false
}

export function authReducer(state: State = initalState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN_START:
            return {
                ...state,
                errors: null,
                loading: true,
                isAuthenticated: false,
            };
        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                errors: [...action.payload],
                loading: false,
                isAuthenticated: false,
            };
        case AuthActions.LOGIN_SUCCESS:
            const user = new User(
                action.payload.firstName,
                action.payload.lastName,
                action.payload.email,
                action.payload.isAdmin,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );

            return {
                ...state,
                user: user,
                isAdmin: user.isAdmin,
                isAuthenticated: true,
                errors: null,
                loading: false
            };

        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
                isAdmin: false,
                isAuthenticated: false,
            };
        case AuthActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case AuthActions.SET_ADMIN:
            return {
                ...state,
                isAdmin: action.payload
            };
        default:
            return state;
    }
}