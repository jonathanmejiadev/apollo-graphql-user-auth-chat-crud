import * as yup from 'yup';

const username = yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(20, 'Username must be at most 20 characters')
    .matches(/^\w+$/, 'Username can only contain alphanumeric characters');

const email = yup
    .string()
    .required('Email is required')
    .email('Invalid email');

const password = yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(10, 'Password must be at most 20 characters');

export const UserRegistrationValidation = yup.object().shape({
    username,
    email,
    password
});

export const UserLoginValidation = yup.object().shape({
    username,
    password
});
