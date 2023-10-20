import { useMutation } from '@tanstack/react-query';
import { DeleteUsers } from '@/scripts/query/users'
import { useNavigate, useParams } from "react-router-dom";
import { Box, Modal, ModalClose, Card, CardContent, CardActions, Button, Typography as T } from "@mui/joy";

export default function Page() {
    const nav = useNavigate();
    const { id } = useParams();

    const users = useMutation(DeleteUsers);

    function Call() {
        users.mutate(id);
        nav("/users");
    }

    return (
        <Modal open={true} onClose={() => nav("/users")}>
            <Card color="primary" variant="outlined" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <CardContent>
                    <T>Sure?</T>
                </CardContent>
                <CardActions>
                    <Button onClick={Call}>Call</Button>
                </CardActions>
            </Card>
        </Modal>
    );
}