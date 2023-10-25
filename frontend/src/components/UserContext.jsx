import { createContext, useState, useEffect } from "react";
import _ from 'lodash';
import jwtdecode from 'jwt-decode';
import { GetRefreshToken, TokensExist } from "@/scripts/TokenManager";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const reset = () => setUser(null);
    //const set = (key, value) => setUser({...user, [key]: value});

    useEffect(() => {
        if (TokensExist()) {
            let token = jwtdecode(GetRefreshToken());
            setUser({
                id: token.user_id,
                email: token.sub.email,
                fn: token.sub.fn,
                ln: token.sub.ln,
                staff: token.sub.staff,
                active: token.sub.active
            });
        }

        return reset;
    }, []);

    return (
        <UserContext.Provider value={{user,setUser,reset}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;