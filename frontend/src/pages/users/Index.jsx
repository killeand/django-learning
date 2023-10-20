import { useQuery } from '@tanstack/react-query';
import { ListUsers } from '@/scripts/query/users';
import { Outlet, useNavigate } from 'react-router-dom';

import { Sheet, Box, Divider, Table, ButtonGroup, Button, IconButton, CircularProgress, Typography as T } from '@mui/joy';
import { CheckCircle, Add, Edit, Delete } from '@mui/icons-material';

/* ID, Email, First Name, Last Name, isActive, isStaff */

export default function Page() {
    const nav = useNavigate();

    let users = useQuery(ListUsers);

    function RenderUsers() {
        if (users.isPending)
            return (
                    <tr>
                        <td colSpan="5">
                            <T startDecorator={<CircularProgress size="sm" />}>Loading Data...</T>
                        </td>
                    </tr>
            );
        
        if (users.data.length <= 0)
            return (<tr><td colSpan="5"><T>No data present...</T></td></tr>);
        
        return users.data.map((user, index) => {
            
            return (
                <tr key={`userdata-${user.id}`}>
                    <td>{(user.is_active) && <CheckCircle color="success" />}</td>
                    <td><T level="sm">{user.email}</T></td>
                    <td><T level="sm">{user.first_name + " " + user.last_name}</T></td>
                    <td>{(user.is_staff) && <CheckCircle color="danger" />}</td>
                    <td>
                        <ButtonGroup variant="outlined" color="primary" aria-label="button group">
                            <Button color="warning" variant="soft" startDecorator={<Edit />} onClick={()=>nav("/users/edit/" + user.id)}>Edit</Button>
                            <Button color="danger" variant="soft" startDecorator={<Delete />} onClick={()=>nav("/users/delete/" + user.id)}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });
    }

    return (
        <>
            <Box sx={{ p: 2 }}>
                <Box sx={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                    <T level="h1" sx={{ flexGrow: 1 }}>Manage Users</T>
                    <Button color="success" variant="solid" startDecorator={<Add />} onClick={()=>nav("/users/add")}>Add User</Button>
                </Box>
                <Divider inline="none" />
                <Sheet variant="outlined" sx={{
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
                    marginTop: '0.5rem'
                }}>
                    <Table stickyHeader hoverRow stripe="odd" sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px'
                    }}>
                        <thead>
                            <tr>
                                <th style={{ width: '5%', p: '12px 6px'}}>Active</th>
                                <th style={{ width: '35%', p: '12px 6px'}}>Email</th>
                                <th style={{ width: '35%', p: '12px 6px'}}>Name</th>
                                <th style={{ width: '5%', p: '12px 6px'}}>Staff</th>
                                <th style={{ width: '20%', p: '12px 6px'}}>Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RenderUsers()}
                        </tbody>
                    </Table>
                </Sheet>
            </Box>
            <Outlet />
        </>
    );
}