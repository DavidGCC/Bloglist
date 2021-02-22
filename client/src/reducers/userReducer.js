import loginService from '../services/login';
import blogService from '../services/blogs';
import { createSuccessMessage, createErrorMessage } from './notificationReducer';
import { addDays } from 'date-fns';

const initialUser = null;

export const initializeUser = () => {
    const user = window.localStorage.getItem('CU');
    if (user) {
        if (user.expiryDate <= new Date()) {
            window.localStorage.removeItem('CU');
            return null;
        }
        return {
            type: 'SET',
            user: JSON.parse(user)
        };
    } else {
        return {
            type: 'UNSET'
        };
    }
};

export const loginAction = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login(username, password);
            dispatch({
                type: 'LOGIN',
                user
            });
            dispatch(createSuccessMessage(`${user.name} Successfully Logged In`));
        } catch (err) {
            dispatch(createErrorMessage('Wrong Username or Password.'));
        }
    };
};

export const logoutAction = (name) => {
    return dispatch => {
        dispatch(createSuccessMessage(`${name} Successfully Logged Out.`));
        dispatch({
            type: 'LOGOUT'
        });
    };
};

const userReducer = (state = initialUser, action) => {
    switch (action.type) {
    case 'LOGIN':
        const expiryDate = addDays(new Date(), 3);
        const userWithExpiry = { ...action.user, expiryDate };
        window.localStorage.setItem('CU', JSON.stringify(userWithExpiry));
        blogService.setToken(action.user.token);
        return action.user;
    case 'SET':
        blogService.setToken(action.user.token);
        return action.user;
    case 'LOGOUT':
        window.localStorage.removeItem('CU');
        return null;
    default:
        return state;
    }
};
export default userReducer;