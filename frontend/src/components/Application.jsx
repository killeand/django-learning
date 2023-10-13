import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import Calls from '@/pages/Calls';
import SiteIndex from '@/pages/Index';
import Login from '@/pages/auth/Login';
import Logout from '@/pages/auth/Logout';

import { Home, Password, Lock, Phone, Settings, Shield, Error, DarkModeRounded, LightMode } from "@mui/icons-material";
import { Sheet, Box, List, ListItem, ListItemButton, ListItemContent, Typography as T, IconButton } from "@mui/joy";
import { useColorScheme } from "@mui/joy";

export default function Application() {
    const context = useContext(UserContext);
    const { mode, setMode } = useColorScheme();
    const ActiveIcon = (mode === "light") ? DarkModeRounded : LightMode;

    const URLS = [
        { path: "/", index: true, name: "Home", authed: false, always: true, component: (<SiteIndex />), icon: Home },
        { path: "/login", index: false, name: "Login", authed: false, always: false, component: (<Login />), icon: Password },
        { path: "/logout", index: false, name: "Logout", authed: true, always: false, component: (<Logout />), icon: Lock },
        { path: "/calls", index: false, name: "API Calls", authed: true, always: false, component: (<Calls />), icon: Phone },
        { path: "/api", index: false, name: "Django: API", authed: false, always: true, component: null, icon: Settings },
        { path: "/admin", index: false, name: "Django: Admin", authed: false, always: true, component: null, icon: Shield },
        { path: "/errored", index: false, name: "Error", authed: false, always: true, component: null, icon: Error },
    ];

    return (
        <BrowserRouter>
            <Sheet component="header" sx={{width:'16%', top:0, p:2, flexShrink:0, display:'flex', flexDirection:'column', gap:2, borderRight:'1px solid',borderColor:'divider'}}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <T level="title-lg" sx={{ flexGrow: 1 }}>STSM</T>
                    <IconButton size="sm" color={(mode==="light")?"primary":"neutral"}  onClick={()=>setMode((mode==="light")?"dark":"light")}>
                        <ActiveIcon />
                    </IconButton>
                </Box>
                <Box component="nav" sx={{ minHeight: 0, overflow: 'hidden auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <List size="sm" sx={{gap:1,'--List-nestedInsetStart':'30px','--ListItem-radius':(theme) => theme.vars.radius.sm}}>
                        {URLS.map((item, index) => {
                            let comp = (item.component == null) ? "a" : Link;
                            let path = (item.component == null) ? { href: item.path } : { to: item.path };

                            if (item.always || (context.user.loggedin && item.authed) || (!context.user.loggedin && !item.authed))
                                return (
                                    <ListItem key={`nav-${index}-${item.name}`} component={comp} {...path} sx={{'&:hover':{textDecoration:'none'}}}>
                                        <ListItemButton>
                                            <item.icon />
                                            <ListItemContent>
                                                <T level="title-sm">{item.name}</T>
                                            </ListItemContent>
                                        </ListItemButton>
                                    </ListItem>
                                );
                        })}
                    </List>
                </Box>
            </Sheet>
            <Sheet component="main" sx={{flexGrow:1}}>
                <Routes>
                    {URLS.map((item, index) => {
                        let addindex = {};
                        if (item.index) addindex["index"] = null;

                        if (item.component != null)
                            return <Route key={`route-${index}-${item.name}`} {...addindex} path={item.path} element={item.component} />
                    })}
                    <Route path="/404" element={<div></div>} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </Sheet>
        </BrowserRouter>
    );
}