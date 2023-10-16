import { useState, useContext } from "react";
import { Axios } from '@/scripts/Axios';
import { useSearchParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "@/components/UserContext";
import { useColorScheme } from "@mui/joy";

import { Box, Card, CardActions, CardContent, Divider, FormControl, FormLabel, Checkbox, Input, Button, Alert, Typography as T } from '@mui/joy';
import { Password } from "@mui/icons-material";

export default function Page() {
    const context = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [loginType, setLoginType] = useState(false);
    const params = useSearchParams();
    const { mode } = useColorScheme();

    function Login() {
        setError("");

        let newerr = "";
        if (email === "") newerr += "Email is empty... ";
        if (pass === "") newerr += "Password is empty... ";
        if (newerr.length > 0) {
            setError(newerr);
            return;
        }

        Axios.post("/api/token", {email:email,password:pass})
            .then(({ data }) => {
                let storageType = (loginType) ? localStorage : sessionStorage;
                if (data.access) storageType.setItem("TEST-AUTH", data.access);
                if (data.refresh) storageType.setItem("TEST-REFRESH", data.refresh);

                context.set("loggedin", true);

                if (params[0].has("redirect")) location.replace(params[0].get("redirect"));
                else location.replace("/");
            })
            .catch(({ response: error }) => {
                //setError("Username/Password combination is invalid....");
                toast.error("Username/Password combination is invalid...", {theme:mode});
            })
    }

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ToastContainer />
            <Card color="primary" variant="outlined" size="sm" sx={{width: { md: '50%'}}}>
                {(error.length > 0) && (<Alert color="danger" variant="solid">{error}</Alert>)}
                <T level="title-lg" startDecorator={<Password />}>Login to account</T>
                <Divider inset="none" />
                <CardContent>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} />
                    </FormControl>
                    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '0.5rem' }}>
                        <Checkbox label="Remember Me" value={loginType} onChange={(e) => setLoginType(e.target.checked)} sx={{flex:1}} />
                        <Link to="/auth/forget">Forget Password</Link>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button color="primary" onClick={Login}>Login</Button>
                </CardActions>
            </Card>
        </Box>
    )
}