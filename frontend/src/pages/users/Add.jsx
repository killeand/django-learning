import { useMutation } from '@tanstack/react-query';
import { CreateUsers } from '@/scripts/query/users'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Box, Modal, Card, CardContent, CardActions, Button, Typography as T } from "@mui/joy";
import { faker } from '@faker-js/faker';

export default function Page() {
    const [open, setOpen] = useState(true);
    const nav = useNavigate();

    const users = useMutation(CreateUsers);

    function Call() {
        users.mutate({
            email: faker.internet.email(),
            password: 'light2256',
            first_name: 'Jay',
            last_name: 'Jo',
            is_active: true,
            is_staff: false
        });
        setOpen(false);
    }

    return (
        <Modal open={open} onClose={()=>nav("/users")}>
            <Card color="primary" variant="outlined" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <CardContent>
                    <T>Stuff?</T>
                </CardContent>
                <CardActions>
                    <Button onClick={Call}>Call</Button>
                </CardActions>
            </Card>
        </Modal>
    );
}