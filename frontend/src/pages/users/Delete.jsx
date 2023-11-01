import { useMutation } from '@tanstack/react-query';
import { DeleteUsers, RetrieveUser } from '@/scripts/query/users'
import { useParams } from "react-router-dom";
import { DialogContent, DialogActions, Button, Typography as T } from "@mui/joy";

export default function Page({ color, onClose, ...props }) {
    const { id } = useParams();
    const userData = RetrieveUser(id)[0];
    const users = useMutation(DeleteUsers());

    function PerformDelete() {
        users.mutate(id);
        onClose();
    }

    return (
        <>
            <DialogContent>
                <T level="body-md">Are you sure you wish the delete the user: {userData.email} ({userData.id})</T>
            </DialogContent>
            <DialogActions>
                <Button color={color} onClick={PerformDelete}>Delete User</Button>
                <Button color="neutral" onClick={onClose}>Cancel</Button>
            </DialogActions>
        </>
    );
}