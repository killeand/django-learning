import { useEffect } from 'react';
import { Axios } from '@/scripts/Axios';
import { Outlet } from 'react-router-dom';

import { Sheet, Box, Divider, Table, Typography as T } from '@mui/joy';

/* ID, Email, First Name, Last Name, isActive, isStaff */

const TestData = [
    
];

export default function Page() {
    return (
        <>
            <Box sx={{p:2}}>
                <T level="h1">Manage Users</T>
                <Divider inline="none" />
                <Sheet variant="outlined" sx={{width: '100%',borderRadius: 'sm',flexShrink: 1,overflow: 'auto',minHeight: 0,}}>
                    <Table stickyHeader hoverRow sx={{ '--TableCell-headBackground': 'var(--joy-palette-background-level1)', '--Table-headerUnderlineThickness': '1px', '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)', '--TableCell-paddingY': '4px', '--TableCell-paddingX': '8px' }}>
                        <thead>
                            <tr>
                                <th>Active</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Staff</th>
                                <th>Tools</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </Table>
                </Sheet>
            </Box>
            <Outlet />
        </>
    );
}