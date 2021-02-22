import React from 'react';
import userService from '../../../services/users';
import { useHistory } from 'react-router-dom';

import RegisterForm from './RegisterForm';

const Register = () => {
    const history = useHistory();
    const handleSubmit = async ({name, username, password}) => {
        try {
            console.log({ name, username, password });
            await userService.registerUser({name, username, password});
            history.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <RegisterForm handleSubmit={handleSubmit} /> 
    );
};

export default Register;