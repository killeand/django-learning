import { DialogContent, DialogActions, Button, Typography as T } from "@mui/joy";

export default function Page({ color, onClose, ...props }) {
    function PerformDelete() {
        alert("HI!");
        onClose();
    }

    return (
        <>
            <DialogContent>
                <T level="body-md">Please don't click on the button. It is super nervous and might do something silly.</T>
            </DialogContent>
            <DialogActions>
                <Button color={color} onClick={PerformDelete}>Delete User</Button>
                <Button color="neutral" onClick={onClose}>Cancel</Button>
            </DialogActions>
        </>
    );
}