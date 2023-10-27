import { useMutation } from '@tanstack/react-query';
import { DeleteUsers, RetrieveUser } from '@/scripts/query/users'
import { useNavigate, useParams } from "react-router-dom";
import { Modal, ModalDialog, ModalClose, DialogContent, DialogActions, Button, Typography as T, Divider } from "@mui/joy";

export default function Page() {
    const nav = useNavigate();
    const { id } = useParams();
    const userData = RetrieveUser(id)[0];
    const users = useMutation(DeleteUsers());

    function PerformDelete() {
        users.mutate(id);
        nav("/users");
    }

    return (
        <Modal open={true} onClose={() => nav("/users")}>
            <ModalDialog color="primary" variant="outlined" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <DialogContent>
                    <ModalClose />
                    <T level="title-lg">Delete User</T>
                    <Divider />
                    <T level="body-md">Are you sure you wish the delete the user: {userData.email} ({userData.id})</T>
                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={PerformDelete}>Delete User</Button>
                    <Button color="neutral" onClick={() => nav("/users")}>Cancel</Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}