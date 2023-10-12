import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";
import Calls from '@/pages/Calls';
import Login from '@/pages/Login';
import Logout from '@/pages/Logout';

import HomeIcon from '@mui/icons-material/Home';
import { Sheet, Box, List, ListItem, ListItemButton, ListItemContent, Typography as T } from "@mui/joy";

export default function Application() {
    const context = useContext(UserContext);

    const URLS = [
        { path: "/", index: true, name: "Home", authed: false, always: true, component: (<p>Index Page</p>) },
        { path: "/login", index: false, name: "Login", authed: false, always: false, component: (<Login />) },
        { path: "/logout", index: false, name: "Logout", authed: true, always: false, component: (<Logout />) },
        { path: "/calls", index: false, name: "API Calls", authed: true, always: false, component: (<Calls />) },
        { path: "/api", index: false, name: "Django: API", authed: false, always: true, component: null },
        { path: "/admin", index: false, name: "Django: Admin", authed: false, always: true, component: null },
        { path: "/errored", index: false, name: "Error", authed: false, always: true, component: null },
    ];

    return (
        <BrowserRouter>
            <Sheet component="header" sx={{height:'100dvh', width:'16%', top:0, p:2, flexShrink:0, display:'flex', flexDirection:'column', gap:2, borderRight:'1px solid',borderColor:'divider'}}>
                <Box component="nav" sx={{minHeight:0,overflow:'hidden auto',flexGrow:1,display:'flex',flexDirection:'column'}}>
                    <List size="sm" sx={{gap:1,'--List-nestedInsetStart':'30px','--ListItem-radius':(theme) => theme.vars.radius.sm}}>
                        {URLS.map((item, index) => {
                            let comp = (item.component == null) ? "a" : Link;
                            let path = (item.component == null) ? { href: item.path } : { to: item.path };

                            if (item.always || (context.user.loggedin && item.authed) || (!context.user.loggedin && !item.authed))
                                return (
                                    <ListItem key={`nav-${index}-${item.name}`} component={comp} {...path} sx={{'&:hover':{textDecoration:'none'}}}>
                                        <ListItemButton>
                                            <HomeIcon />
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
            <main>
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
            </main>
        </BrowserRouter>
    );
}