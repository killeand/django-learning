import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Calls from '@/pages/Calls';
import Login from '@/pages/Login';
import Button from "./Button";

export default function Application() {
    const URLS = [
        { path: "/", index: true, name: "Home", component: (<p>Index Page</p>) },
        { path: "/login", index: false, name: "Login", component: (<Login />) },
        { path: "/calls", index: false, name: "API Calls", component: (<Calls />) },
        { path: "/api", index: false, name: "Api Reference", component: null },
        { path: "/errored", index: false, name: "Error", component: null },
    ];

    return (
        <BrowserRouter>
            <header className="flex">
                <nav className="flex flex-row flex-grow items-stretch join">
                    {URLS.map((item, index) => {
                        if (item.component == null)
                            return <Button key={`nav-${index}-${item.name}`} as="a" color="secondary" href={item.path} className="join-item flex-grow">{item.name}</Button>
                        
                        return <Button key={`nav-${index}-${item.name}`} as={Link} color="secondary" to={item.path} className="join-item flex-grow">{item.name}</Button>
                    })}
                </nav>
            </header>
            <main>
                <Routes>
                    {URLS.map((item, index) => {
                        let addindex = {};
                        if (item.index) addindex["index"] = null;

                        if (item.component != null)
                            return <Route key={`route-${index}-${item.name}`} {...addindex} path={item.path} element={item.component} />
                    })}
                    <Route path="/404" element={<p>What the heck are you doing?</p>} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}