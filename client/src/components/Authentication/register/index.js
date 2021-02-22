import React from 'react';
import userService from '../../../services/users';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import RegisterForm from './RegisterForm';
import { createSuccessMessage } from '../../../reducers/notificationReducer';

const Register = () => {
    const history = useHistory();
    const dispath = useDispatch(createSuccessMessage);
    const handleSubmit = async ({name, username, password}) => {
        try {
            await userService.registerUser({name, username, password});
            history.push('/');
            dispath(createSuccessMessage(`${name} Successfully Joined Listablog`));
        } catch (error) {
            history.push({
                pathname: '/',
                state: { message: 'couldn\'t register user. try again later' }
            });
            console.error(error);
        }
    };

    return (
        <RegisterForm handleSubmit={handleSubmit} /> 
    );
};

export default Register;