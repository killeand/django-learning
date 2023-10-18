import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Modal, Card, CardContent, CardActions, Button, Typography as T } from "@mui/joy";
import { Axios } from "@/scripts/Axios";

export default function Page() {
    const nav = useNavigate();

    function Call() {
        Axios.get("/api/whoami");
    }

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
                <CardActions>
                    <Button onClick={Call}>Call</Button>
                </CardActions>
            </Card>
        </Modal>
    );
}