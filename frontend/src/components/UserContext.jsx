import { createContext, useState, useEffect } from "react";
import _ from 'lodash';
import { TokensExist } from "@/scripts/Utilities";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState({ loggedin: false, name: "" });
    const [storageEvent, setStorageEvent] = useState(null);

    useEffect(() => {
        if (TokensExist()) {
            user["loggedin"] = true;
            setUser({ ...user });
        }

        if (storageEvent != null) {
            setStorageEvent(addEventListener('storage', (e) => {

            }));
        }

        return () => setStorageEvent(null);
    }, []);

    const isSet = () => _.has(userDetails, "loggedin");

    return (
        <UserContext.Provider value={{user,setUser,isSet}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;