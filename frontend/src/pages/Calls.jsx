import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Page() {
    const [alpha, setAlpha] = useState("");

    function RunAlpha() {
        axios
    }

    return (
        <>
            <h1>API Calls</h1>
            <div className="border border-red-800 p-2 flex flex-col items-stretch">
                <div className="border-b-2 border-black pb-2 mb-2">{alpha}</div>
                <button className="btn btn-primary" onClick={()=>RunAlpha()}>Run Alpha</button>
            </div>
        </>
    );
}