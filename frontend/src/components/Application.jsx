import { BrowserRouter, Routes, Route, NavLink, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import ModalPage from "./ModalPage";
import TabbedModalPage from "./TabbedModalPage";
import Tabbed from '@/pages/tabbed/Index';
import Tab1 from '@/pages/tabbed/Tab1';
import Tab2 from '@/pages/tabbed/Tab2';
import Users from '@/pages/users/Index';
import UsersForm from '@/pages/users/Form';
import UsersDelete from '@/pages/users/Delete';
import SiteIndex from '@/pages/Index';
import Login from '@/pages/auth/Login';
import Logout from '@/pages/auth/Logout';
import FoF from '@/pages/404';

import { Home, Password, Lock, People, Settings, Shield, Error, DarkModeRounded, LightMode, LogoutRounded } from "@mui/icons-material";
import { DialogContent, DialogActions, Button, Avatar, Sheet, Box, List, ListItem, ListItemButton, ListItemContent, IconButton, Typography as T, Divider } from "@mui/joy";
import { useColorScheme } from "@mui/joy";
import { Outlet } from "react-router-dom";
    
export default function Application() {
    const context = useContext(UserContext);
    const { mode, setMode } = useColorScheme();
    const ActiveIcon = (mode === "light") ? DarkModeRounded : LightMode;

    const URLS = [
        { path: "/", index: true, name: "Home", authed: false, always: true, component: (<SiteIndex />), icon: Home, sub: [] },
        { path: "/auth/login", index: false, name: "Login", authed: false, always: false, component: (<Login />), icon: Password, sub: [] },
        { path: "/auth/logout", index: false, name: "Logout", authed: true, always: false, component: (<Logout />), icon: Lock, sub: [] },
        { path: "/users", index: false, name: "Users", authed: true, always: false, component: (<Users />), icon: People, sub: [
            { path: "add", index: false, component: (<ModalPage color="success" title="Add User" icon={People} path="/users/"><UsersForm /></ModalPage>) },
            { path: "edit/:id", index: false, component: (<ModalPage color="warning" title="Edit User" icon={Shield} path="/users/"><UsersForm /></ModalPage>) },
            { path: "delete/:id", index: false, component: (<ModalPage color="danger" title="Delete User" icon={Error} path="/users/"><UsersDelete /></ModalPage>) }
        ] },
        { path: "/api", index: false, name: "Django: API", authed: false, always: true, component: null, icon: Settings, sub: [] },
        { path: "/admin", index: false, name: "Django: Admin", authed: false, always: true, component: null, icon: Shield, sub: [] },
        { path: "/errored", index: false, name: "Error", authed: false, always: true, component: null, icon: Error, sub: [] },
        { path: "/tabbed", index: false, name: "Tabbed Page", authed: true, always: false, component: (<Tabbed />), icon: LightMode, sub: [
            { path: "set", index: false, component: (<TabbedModalPage color="danger" title="Tabbed Test" icon={LightMode} path="/tabbed/">
                <Tab1 title="Test 1" />
                <Tab2 title="Test 2" />
            </TabbedModalPage>) },
        ] },
    ];

    function NavItem({ icon, title, active }) {
        let isActive = (active) ? { selected: true } : null;
        let NavIcon = icon;

        return (
            <ListItemButton color="primary" {...isActive}>
                <NavIcon />
                <ListItemContent sx={{display: 'flex', alignItems: 'center'}}>
                    <T level="title-sm" sx={{marginBottom:'-0.3rem'}}>{title}</T>
                </ListItemContent>
            </ListItemButton>
        );
    }

    return (
        <BrowserRouter>
            <Sheet component="header" color="neutral" variant="soft" sx={{width:'16%', top:0, p:2, flexShrink:0, display:'flex', flexDirection:'column', gap:2, borderRight:'1px solid',borderColor:'divider'}}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <T level="title-lg" sx={{ flexGrow: 1 }}>STSM</T>
                    <IconButton size="sm" color={(mode==="light")?"primary":"neutral"}  onClick={()=>setMode((mode==="light")?"dark":"light")}>
                        <ActiveIcon />
                    </IconButton>
                </Box>
                <Box component="nav" sx={{ minHeight: 0, overflow: 'hidden auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <List size="sm" sx={{gap:1,'--List-nestedInsetStart':'30px','--ListItem-radius':(theme) => theme.vars.radius.sm}}>
                        {URLS.map((item, index) => {
                            let comp = (item.component == null) ? "a" : NavLink;
                            let path = (item.component == null) ? { href: item.path } : { to: item.path };

                            if (item.always || (context.user && item.authed) || (!context.user && !item.authed))
                                return (
                                    <ListItem key={`nav-${index}-${item.name}`}>
                                        {(comp === "a") && (
                                            <a {...path} style={{ textDecoration: 'none', flex: 1}}>
                                                <NavItem icon={item.icon} title={item.name} />
                                            </a>
                                        )}
                                        {(comp !== "a") && (
                                            <NavLink {...path} style={{ textDecoration: 'none', flex: 1}}>
                                                {({ isActive }) => <NavItem icon={item.icon} title={item.name} active={isActive} />}
                                            </NavLink>
                                        )}
                                    </ListItem>
                                );
                        })}
                    </List>
                </Box>
                {(context.user) && (
                    <>
                        <Divider />
                        <Box sx={{display:'flex',gap:1,alignItems:'center'}}>
                            <Avatar variant="outlined" size="sm">{context.user.fn.substr(0,1) + context.user.ln.substr(0,1)}</Avatar>
                            <Box sx={{flexGrow:1}}>
                                <T level="title-sm" sx={{ textOverflow: 'ellipsis' }}>{context.user.fn + " " + context.user.ln}</T>
                                <T level="body-xs">{context.user.email}</T>
                            </Box>
                            <IconButton variant="plain" size="sm" color="primary" component={Link} to="/auth/logout">
                                <LogoutRounded />
                            </IconButton>
                        </Box>
                    </>
                )}
            </Sheet>
            <Sheet component="main" sx={{flexGrow:1}}>
                <Routes>
                    {URLS.map((item, index) => {
                        let addindex = {};
                        if (item.index) addindex["index"] = null;

                        if (item.component != null)
                            return (
                                <Route key={`route-${index}-${item.name}`} {...addindex} path={item.path} element={item.component}>
                                    {(item.sub.length > 0) && item.sub.map((subitem, index2) => {
                                        let addindex2 = {};
                                        if (subitem.index) addindex2["index"] = null;

                                        return <Route key={`subroute-${index2}-${item.name}`} {...addindex} path={subitem.path} element={subitem.component} />
                                    })}
                                </Route>
                            )
                    })}
                    <Route path="/404" element={<FoF />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </Sheet>
        </BrowserRouter>
    );
}