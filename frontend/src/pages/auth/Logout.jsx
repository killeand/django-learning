import { useEffect, useContext } from 'react';
import { ClearTokens } from "@/scripts/Utilities";
import UserContext from '@/components/UserContext';

export default function Page() {
    const context = useContext(UserContext);

    useEffect(() => {
        context.set("loggedin", false);
        ClearTokens();
    }, []);

    return (
        <div className="flex flex-grow items-center justify-center">
            <div className="card card-compact card-bordered bg-slate-100 shadow-xl">
                <div className="card-body">
                    <div className="card-title">Logout</div>
                    <p>You have been logged out...</p>
                </div>
            </div>
        </div>
    );
}