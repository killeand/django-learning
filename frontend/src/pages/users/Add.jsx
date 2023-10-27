import { useMutation } from '@tanstack/react-query';
import { CreateUsers } from '@/scripts/query/users'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import * as yup from 'yup';
import { useForm, useController, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Modal, ModalClose, Card, CardContent, CardActions, FormControl, FormLabel, Input, Switch, Button, Typography as T, FormHelperText } from "@mui/joy";
import { faker } from '@faker-js/faker';
import _ from 'lodash';

export default function Page() {
    const DoSomethingCool = () => {
        console.info("Uuuugh.... NO! Too embarassing!");
        nav("/users");
    }

    const SubmitForm = (data) => {
        users.mutate(data);
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
    const { control, handleSubmit } = useForm({
        mode: "onBlur",
        shouldFocusError: true,
        resolver: yupResolver(users_schema)
    });

    function MyInput({ type, label, ...controllerProps }) {
        const { field, fieldState } = useController(controllerProps);
        
        return (
            <FormControl error={!_.isNil(fieldState.error)}>
                <FormLabel>{label}</FormLabel>
                <Input type={type || "text"} {...field} />
                <FormHelperText>
                    <T level="body-xs">{fieldState.error?.message}</T>
                </FormHelperText>
            </FormControl>
        );
    }

    function MySwitch({ label, ...controllerProps }) {
        const { field } = useController(controllerProps);

        return (
            <FormControl>
                <FormLabel>{label}</FormLabel>
                <Switch {...field} />
            </FormControl>
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
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'start', gap: 1}}>
                        <MyInput type="email" name="email" defaultValue={faker.internet.email} control={control} label="Email" />
                        <MyInput type="password" name="password" defaultValue="light2256" control={control} label="Password" />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'start', gap: 1}}>
                        <MyInput type="text" name="first_name" defaultValue="" control={control} label="First Name" />
                        <MyInput type="text" name="last_name" defaultValue="" control={control} label="Last Name" />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'space-evenly', gap: 1}}>
                        <MySwitch name="is_active" defaultValue={false} control={control} label="Activate User" />
                        <MySwitch name="is_staff" defaultValue={false} control={control} label="Is Admin" />
                    </Box>
                </CardContent>
                <CardActions>
                    <Button type="submit" >Submit</Button>
                </CardActions>
            </Card>
        </Modal>
    );
}