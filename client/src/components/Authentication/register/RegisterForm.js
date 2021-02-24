import React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Container, FormHelperText } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const validationSchema = yup.object().shape({
    name: yup.
        string()
        .required('name is required'),
    username: yup
        .string()
        .required('username is required'),
    password: yup
        .string()
        .required('password is required'),
    confirmPassword: yup
        .string()
        .required('confirm password is required')
        .oneOf([yup.ref('password'), null], 'passowrds do not match')
});

const initialValues = {
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
};

const RegisterForm = ({ handleSubmit }) => {
    const history = useHistory();
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
            validateOnBlur
        >
            {
                ({ handleSubmit, errors, touched, values, handleChange, setFieldTouched }) => {
                    return (
                        <Container maxWidth="sm">
                            <FormHelperText error={Boolean(history.location.state?.message)}>{history.location.state?.message}</FormHelperText>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Nickname*"
                                type="text"
                                placeholder="Nickname"
                                value={values.name}
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                onBlur={() => setFieldTouched('name')}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                id="username"
                                name="username"
                                label="Username*"
                                type="text"
                                placeholder="Username"
                                value={values.username}
                                onChange={handleChange}
                                error={touched.username && Boolean(errors.username)}
                                helperText={touched.username && errors.username}
                                onBlur={() => setFieldTouched('username')}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password*"
                                type="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                onBlur={() => setFieldTouched('password')}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password*"
                                type="password"
                                placeholder="Confirm Password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                                onBlur={() => setFieldTouched('confirmPassword')}
                                variant="outlined"
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} fullWidth>Sign Up</Button>
                        </Container>
                    );
                }
            }
        </Formik>
    );
};

export default RegisterForm;