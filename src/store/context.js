import { createContext, useState } from "react";

const AppContext = createContext()

export function AppProvider({children}){
    // const [token, setToken] = useState()

    return(
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext