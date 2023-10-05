import { useEffect, useState } from 'react';
import { Axios } from '@/scripts/Axios';
import Text from '@/components/Text';

export default function Page() {
    const [output, setOutput] = useState("");

    function RunGet(url, setter, errsetter) {
        Axios.get(url)
            .then(({ data }) => {
                setter(data);
            })
            .catch(({response:error}) => {
                errsetter(error.data);
            });
    }

    function TokenExists() {
        let authtoken = localStorage.getItem("TEST-AUTH");
        let reftoken = localStorage.getItem("TEST-REFRESH");

        return (authtoken != null && reftoken != null);
    }

    return (
        <>
            <h1>API Calls</h1>
            <div className="flex flex-col space-y-2">
                {output && (
                    <div className="alert alert-info"><pre>{JSON.stringify(output, null, '\t')}</pre></div>
                )}
                <div className="border border-red-800 p-2 flex flex-col items-stretch">
                    <h2>Login</h2>
                    <div>Credentials: {(TokenExists() ? "Set" : "Unset")}</div>
                    <Text title="Username" />
                </div>
                <div className="border border-red-800 p-2 flex flex-col items-stretch">
                    <h2>GET</h2>
                    <div className="flex flex-col join join-vertical">
                        <button className="btn btn-primary join-item" onClick={() => RunGet("/api", setOutput, setOutput)}>GET /api</button>
                        <button className="btn btn-primary join-item" onClick={() => RunGet("/api/users", setOutput, setOutput)}>GET /api/users</button>
                    </div>
                </div>
            </div>
        </>
    );
}