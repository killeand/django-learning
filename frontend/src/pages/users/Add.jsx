import { useMutation } from '@tanstack/react-query';
import { CreateUsers } from '@/scripts/query/users'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Modal, ModalClose, Card, CardContent, CardActions, FormControl, FormLabel, Input, Switch, Button, Typography as T } from "@mui/joy";
import { faker } from '@faker-js/faker';

export default function Page() {
    const DoSomethingCool = () => {
        console.info("Uuuugh.... NO! Too embarassing!");
        nav("/users");
    }

    const nav = useNavigate();
    const users = useMutation(CreateUsers(DoSomethingCool));
    const users_schema = yup.object({
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
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            is_active: false,
            is_staff: false
        },
        validationSchema: users_schema,
        validateOnBlur: true,
        onSubmit: (values) => console.log("FORM SUBMIT", values)
    })
    

    // function Call() {
    //     users.mutate({
    //         email: faker.internet.email(),
    //         password: 'light2256',
    //         first_name: 'Jay',
    //         last_name: 'Jo',
    //         is_active: true,
    //         is_staff: false
    //     });
    //     setOpen(false);
    //     nav("/users");
    // }

    return (
        <Modal open={true} onClose={()=>nav("/users")}>
            <Card color="primary" variant="outlined" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <form onSubmit={formik.handleSubmit}>
                    <CardContent>
                        <ModalClose />
                        <T level="title-lg">Add User</T>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={(formik.touched.email && Boolean(formik.errors.email))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={(formik.touched.password && Boolean(formik.errors.password))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                name="first_name"
                                type="text"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={(formik.touched.first_name && Boolean(formik.errors.first_name))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                name="last_name"
                                type="text"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={(formik.touched.last_name && Boolean(formik.errors.last_name))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Activate User</FormLabel>
                            <Switch
                                name="is_active"
                                checked={formik.values.is_active}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={(formik.touched.is_active && Boolean(formik.errors.is_active))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Is Admin</FormLabel>
                            <Switch
                                name="is_staff"
                                checked={formik.values.is_staff}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={(formik.touched.is_staff && Boolean(formik.errors.is_staff))}
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button>Create User</Button>
                    </CardActions>
                </form>
            </Card>
        </Modal>
    );
}