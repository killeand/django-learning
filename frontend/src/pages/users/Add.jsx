import { useNavigate } from "react-router-dom";
import { Box, Modal, Card, CardContent, CardActions, Button, Typography as T } from "@mui/joy";

export default function Page() {
    const nav = useNavigate();

    return (
        <Modal open={true} onClose={()=>nav("/users")}>
            <Card color="primary" variant="outlined" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <CardContent>
                    <T>Stuff?</T>
                </CardContent>
            </Card>
        </Modal>
    );
}