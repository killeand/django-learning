import { useEffect, useState } from 'react';
import { Axios } from '@/scripts/Axios';

export default function Page() {
    const [alpha, setAlpha] = useState("");

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
            <div className="border border-red-800 p-2 flex flex-col items-stretch">
                <h1>Login</h1>
                <div>Credentials: {(TokenExists() ? "Set" : "Unset")}</div>
                <div className="grid grid-cols-8">
                    
                </div>
            </div>
            <div className="border border-red-800 p-2 flex flex-col items-stretch">
                <div className="border-b-2 border-black pb-2 mb-2"><pre>{JSON.stringify(alpha, null, '\t')}</pre></div>
                <button className="btn btn-primary" onClick={() => RunGet("/api", setAlpha, setAlpha)}>GET /api</button>
                <button className="btn btn-primary" onClick={()=>RunGet("/api/users", setAlpha, setAlpha)}>GET /api/users</button>
            </div>
        </>
    );
}