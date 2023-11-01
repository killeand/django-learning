import { useMutation } from '@tanstack/react-query';
import { CreateUsers } from '@/scripts/query/users'
import { useForm } from 'react-hook-form';
import { CreateSchema } from '@/scripts/formschema/users';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, DialogContent, DialogActions, Button, Typography as T } from "@mui/joy";
import { faker } from '@faker-js/faker';
import ManagedInput from '@/components/forms/ManagedInput';
import ManagedSwitch from '@/components/forms/ManagedSwitch';

export default function Page({ color, onClose, ...props }) {
    const users = useMutation(CreateUsers());

    const { control, handleSubmit, formState } = useForm({
        mode: "onBlur",
        shouldFocusError: true,
        resolver: yupResolver(CreateSchema)
    })

    function FormSubmit(data) {
        users.mutate(data);
        onClose();
    }

    return (
        <form onSubmit={handleSubmit(FormSubmit)}>
            <DialogContent>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'start', gap: 1}}>
                    <ManagedInput type="email" name="email" defaultValue={faker.internet.email} control={control} label="Email" />
                    <ManagedInput type="password" name="password" defaultValue="" control={control} label="Password" />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'start', gap: 1}}>
                    <ManagedInput type="text" name="first_name" defaultValue="" control={control} label="First Name" />
                    <ManagedInput type="text" name="last_name" defaultValue="" control={control} label="Last Name" />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'space-evenly', gap: 1}}>
                    <ManagedSwitch name="is_active" defaultValue={false} control={control} label="Activate User" />
                    <ManagedSwitch name="is_staff" defaultValue={false} control={control} label="Is Admin" />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button type="submit" color={color || "primary"} disabled={!formState.isValid || formState.isSubmitting}>Add User</Button>
                <Button color="neutral" onClick={onClose}>Cancel</Button>
            </DialogActions>
        </form>
    );
}