import { useMutation } from '@tanstack/react-query';
import { CreateUsers } from '@/scripts/query/users'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, ModalClose, Card, CardContent, CardActions, FormControl, FormLabel, Input, Switch, Button, Typography as T, FormHelperText } from "@mui/joy";
import { faker } from '@faker-js/faker';

export default function Page() {
    const DoSomethingCool = () => {
        console.info("Uuuugh.... NO! Too embarassing!");
        nav("/users");
    }

    const SubmitForm = (...props) => {
        console.info("DATA!", props);
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
    const { control, handleSubmit } = useForm({ resolver: yupResolver(users_schema) });

    function MyInput({ type, name, label, control }) {
        return (
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { errors } }) => (
                    <FormControl>
                        <FormLabel>{label}</FormLabel>
                        <Input type={type || "text"} {...field} />
                        <FormHelperText>
                            <T level="body-xs">{errors?.message}</T>
                        </FormHelperText>
                    </FormControl>
                )}
            />
        );
    }

    return (
        <Modal open={true} onClose={()=>nav("/users")}>
            <Card component="form" onSubmit={handleSubmit(SubmitForm)} color="primary" variant="outlined" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <CardContent>
                    <ModalClose />
                    <T level="title-lg">Add User</T>
                    <MyInput type="email" name="email" control={control} label="Email" />
                    {/* <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={(formik.touched.email && Boolean(formik.errors.email))}
                        />
                    </FormControl> */}
                    {/* <FormControl>
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
                            onChange={(e) => formik.setFieldValue("is_active", e.target.checked)}
                            onBlur={formik.handleBlur}
                            error={(formik.touched.is_active && Boolean(formik.errors.is_active))}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Is Admin</FormLabel>
                        <Switch
                            name="is_staff"
                            checked={formik.values.is_staff}
                            onChange={(e) => formik.setFieldValue("is_staff", e.target.checked)}
                            onBlur={formik.handleBlur}
                            error={(formik.touched.is_staff && Boolean(formik.errors.is_staff))}
                        />
                    </FormControl> */}
                </CardContent>
                <CardActions>
                    <Button type="submit" >Submit</Button>
                </CardActions>
            </Card>
        </Modal>
    );
}