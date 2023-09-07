import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Calls from '@/pages/Calls';

export default function Application() {
    return (
        <BrowserRouter>
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/calls">API Calls</Link>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route index path="/" element={<p>Index page</p>} />
                    <Route path="/calls" element={<Calls />} />
                    <Route path="/404" element={<p>What the heck are you doing?</p>} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}