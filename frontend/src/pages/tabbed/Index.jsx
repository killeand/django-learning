import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button,} from '@mui/joy';

export default function Page() {
    const nav = useNavigate();

    return (
        <>
            <Box sx={{ p: 2 }}>
                <Button onClick={() => nav("/tabbed/set")}>Open Modal</Button>
            </Box>
            <Outlet />
        </>
    );
}