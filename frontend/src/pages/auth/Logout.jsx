import { useEffect, useContext } from 'react';
import { ClearTokens } from "@/scripts/Utilities";
import UserContext from '@/components/UserContext';

import { Box, Card, CardContent, Divider, Typography as T } from '@mui/joy';
import { Lock } from '@mui/icons-material';

export default function Page() {
    const context = useContext(UserContext);

    useEffect(() => {
        context.reset();
        ClearTokens();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card color="primary" variant="outlined" size="sm" sx={{width: { md: '50%'}}}>
                <T level="title-lg" startDecorator={<Lock />}>Logged out of account</T>
                <Divider inset="none" />
                <CardContent>
                    <T>You have been logged out...</T>
                </CardContent>
            </Card>
        </Box>
    );
}