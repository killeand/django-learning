import { useEffect, useState } from 'react';
import { Axios } from '@/scripts/Axios';
import Text from '@/components/Text';
import Accordian from '@/components/Accordian';
import Label from '@/components/Label';
import Button from '@/components/Button';

export default function Page() {
    const [output, setOutput] = useState("");
    const [creds, setCreds] = useState(false);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    useEffect(() => {
        let authtoken = localStorage.getItem("TEST-AUTH");
        let reftoken = localStorage.getItem("TEST-REFRESH");

        setCreds(authtoken != null && reftoken != null);
    }, []);

    function RunGet(url, setter, errsetter) {
        Axios.get(url)
            .then(({ data }) => {
                setter(data);
            })
            .catch(({response:error}) => {
                errsetter(error.data);
            });
    }

    function Login() {
        Axios.post("/api/token", {email:email,password:pass})
            .then(({ data }) => {
                if (data.access) localStorage.setItem("TEST-AUTH", data.access);
                if (data.refresh) localStorage.setItem("TEST-REFRESH", data.refresh);

                let authtoken = localStorage.getItem("TEST-AUTH");
                let reftoken = localStorage.getItem("TEST-REFRESH");

                setCreds(authtoken != null && reftoken != null);
                setOutput({ login: "Successful" });
            })
            .catch(({ response: error }) => {
                setOutput(error.data);
            })
    }

    return (
        <>
            <h1>API Calls</h1>
            <div className="flex flex-col space-y-2">
                {output && (
                    <div className="alert alert-info"><pre>{JSON.stringify(output, null, '\t')}</pre></div>
                )}
                <Accordian color="warning" title="Login" titleElements={(<Label title="Credentials" value={(creds ? "Set" : "Unset")} />)}>
                    <Text title="Email" placeholder="Please enter an email address..." value={email} onChange={(retval) => setEmail(retval)} />
                    <Text password title="Password" placeholder="Please enter a password..." value={pass} onChange={(retval) => setPass(retval)} />
                    <Button onClick={Login}>Login</Button>
                </Accordian>
                <Accordian color="warning" title="GET">
                    <Button onClick={() => RunGet("/api", setOutput, setOutput)}>GET /api</Button>
                    <Button onClick={() => RunGet("/api/users", setOutput, setOutput)}>GET /api/users</Button>
                </Accordian>
            </div>
        </>
    );
}