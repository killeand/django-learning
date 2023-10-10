import { useState } from "react";
import { Axios } from '@/scripts/Axios';
import { useSearchParams } from "react-router-dom";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function Page() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const params = useSearchParams();

    function Login() {

    }
    console.log(params[0].get("redirect"));

    return (
        <>
            <div className="alert">Yay message</div>
            <div className="flex flex-grow items-center justify-center">
                <div className="card card-compact card-bordered bg-slate-100 shadow-xl">
                    <div className="card-body">
                        <div className="card-title">Login</div>
                        <div className="form-control w-full max-w-xs">
                            <input type="email" placeholder="Enter Email" className="input input-sm input-bordered shadow-inner w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <input type="password" placeholder="Enter Password" className="input input-sm input-bordered shadow-inner w-full max-w-xs" />
                        </div>
                        <div className="card-actions justify-center">
                            <Button>Login</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}