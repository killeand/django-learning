import * as yup from 'yup';

export const CreateSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
    first_name: yup
        .string('Enter your First Name'),
    last_name: yup
        .string('Enter your Last Name'),
    is_active: yup
        .boolean(),
    is_staff: yup
        .boolean()
});

export const EditSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    first_name: yup
        .string('Enter your First Name'),
    last_name: yup
        .string('Enter your Last Name'),
    is_active: yup
        .boolean(),
    is_staff: yup
        .boolean()
});