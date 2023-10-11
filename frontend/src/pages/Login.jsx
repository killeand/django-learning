import { useState } from "react";
import { Axios } from '@/scripts/Axios';
import { useSearchParams } from "react-router-dom";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function Page() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const params = useSearchParams();

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
                if (data.access) localStorage.setItem("TEST-AUTH", data.access);
                if (data.refresh) localStorage.setItem("TEST-REFRESH", data.refresh);
                if (params[0].has("redirect")) location.replace(params[0].get("redirect"));
                else location.replace("/");
            })
            .catch(({ response: error }) => {
                setError("Username/Password combination is invalid....");
            })
    }

    return (
        <>
            {(error.length > 0) && (<div className="alert alert-error w-11/12 mx-auto mt-2 bi-x-circle">{error}</div>)}
            <div className="flex flex-grow items-center justify-center">
                <div className="card card-compact card-bordered bg-slate-100 shadow-xl">
                    <div className="card-body">
                        <div className="card-title">Login</div>
                        <div className="form-control w-full max-w-xs">
                            <input type="email" placeholder="Enter Email" className="input input-sm input-bordered shadow-inner w-full max-w-xs" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <input type="password" placeholder="Enter Password" className="input input-sm input-bordered shadow-inner w-full max-w-xs" value={pass} onChange={(e)=>setPass(e.target.value)} />
                        </div>
                        <div className="card-actions justify-center">
                            <Button onClick={Login}>Login</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}