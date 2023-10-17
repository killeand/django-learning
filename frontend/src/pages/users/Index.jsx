import { useEffect, useState } from 'react';
import { Axios } from '@/scripts/Axios';
import { Outlet, useNavigate } from 'react-router-dom';
import { ulid } from 'ulidx';
import { v1 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

import { Sheet, Box, Divider, Table, ButtonGroup, Button, IconButton, Typography as T } from '@mui/joy';
import { CheckCircle, Add, Edit, Delete } from '@mui/icons-material';

/* ID, Email, First Name, Last Name, isActive, isStaff */

export default function Page() {
    const [users, setUsers] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        let newUsers = [];

        for (let i = 0; i < 100; i++) {
            let fn = faker.person.firstName();
            let ln = faker.person.lastName();

            newUsers.push({ id: ulid(), email: fn.toLowerCase()[0] + ln.toLowerCase() + "@" + faker.internet.domainName(), firstname: fn, lastname: ln, isactive: faker.datatype.boolean(), isstaff: faker.datatype.boolean() });
        }

        setUsers(newUsers);

        return () => setUsers([]);
    }, []);

    function RenderUsers() {
        if (users.length <= 0)
            return (<tr><td colSpan="5"><T>No data present...</T></td></tr>);
        
        return users.map((user, index) => {
            return (
                <tr key={`userdata-${index}-${ulid()}`}>
                    <td>{(user.isactive) && <CheckCircle color="success" />}</td>
                    <td><T level="sm">{user.email}</T></td>
                    <td><T level="sm">{user.firstname + " " + user.lastname}</T></td>
                    <td>{(user.isstaff) && <CheckCircle color="danger" />}</td>
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