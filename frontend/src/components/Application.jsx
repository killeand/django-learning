import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Calls from '@/pages/Calls';

export default function Application() {
    const URLS = [
        { path: "/", index: true, name: "Home", component: (<p>Index Page</p>) },
        { path: "/calls", index: false, name: "API Calls", component: (<Calls />) },
        { path: "/api", index: false, name: "Api Reference", component: null },
        { path: "/errored", index: false, name: "Error", component: null },
    ];

    return (
        <BrowserRouter>
            <header>
                <nav>
                    {URLS.map((item, index) => {
                        if (item.component == null)
                            return <a key={`nav-${index}-${item.name}`} href={item.path}>{item.name}</a>
                        
                        return <Link key={`nav-${index}-${item.name}`} to={item.path}>{item.name}</Link>
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