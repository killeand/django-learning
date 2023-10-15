import { Box, Divider, Typography as T } from '@mui/joy';

export default function Page() {
    return (
        <Box sx={{p:2}}>
            <T level="h1">Error 404</T>
            <Divider inset="none" />
            <T level="body-md">We could not find the content you had requested...</T>
        </Box>
    );
}