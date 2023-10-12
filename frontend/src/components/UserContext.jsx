import { createContext, useState, useEffect } from "react";
import _ from 'lodash';
import { TokensExist } from "@/scripts/Utilities";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState({ loggedin: false, name: "" });

    const reset = () => setUser({ loggedin: false, name: "" });
    const set = (key, value) => setUser({...user, [key]: value});

    useEffect(() => {
        if (TokensExist()) {
            set("loggedin", true);
        }

        return reset;
    }, []);

    return (
        <UserContext.Provider value={{user,set}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;