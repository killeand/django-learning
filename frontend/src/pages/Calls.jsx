import { useEffect, useState } from 'react';
import { Axios } from '@/scripts/Axios';
import { TokensExist, ClearTokens } from '@/scripts/Utilities';

export default function Page() {
    const [output, setOutput] = useState("");
    const [creds, setCreds] = useState(false);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    useEffect(() => {
        setCreds(TokensExist());
    }, []);

    function RunGet(url, setter, errsetter) {
        Axios.get(url)
            .then(({ data }) => {
                setter(data);
            })
            .catch(({ response: error }) => {
                if (error.config.url === "/api/token/refresh")
                    alert("What what?!");
                else
                    errsetter(error.data);
            });
    }

    function Login() {
        Axios.post("/api/token", {email:email,password:pass})
            .then(({ data }) => {
                if (data.access) localStorage.setItem("TEST-AUTH", data.access);
                if (data.refresh) localStorage.setItem("TEST-REFRESH", data.refresh);

                setCreds(TokensExist());
                setOutput({ login: "Successful" });
            })
            .catch(({ response: error }) => {
                setOutput(error.data);
            })
    }

    function Logout() {
        ClearTokens();
        setCreds(TokensExist());
    }

    return (
        <>
            <h1>API Calls</h1>
            <div className="flex flex-col space-y-2">
                {output && (
                    <div className="alert alert-info"><pre>{JSON.stringify(output, null, '\t')}</pre></div>
                )}
                {/* <Accordian color="warning" title="Login" titleElements={(<Label title="Credentials" value={(creds ? "Set" : "Unset")} />)}>
                    <Text title="Email" placeholder="Please enter an email address..." value={email} onChange={(retval) => setEmail(retval)} />
                    <Text password title="Password" placeholder="Please enter a password..." value={pass} onChange={(retval) => setPass(retval)} />
                    <Button onClick={Login}>Login</Button>
                    <Button onClick={Logout}>Logout</Button>
                </Accordian>
                <Accordian color="warning" title="GET">
                    <Button onClick={() => RunGet("/api", setOutput, setOutput)}>GET /api</Button>
                    <Button onClick={() => RunGet("/api/users", setOutput, setOutput)}>GET /api/users</Button>
                </Accordian> */}
            </div>
        </>
    );
}