import {createContext, useContext, useState} from "react";

const HarasContext = createContext();

export function HarasProvider({ children }) {
    const [haras, setHaras] = useState("")

    return (
        <HarasContext.Provider value={[ haras, setHaras ]}>
            {children}
        </HarasContext.Provider>
    );
}

export function chooseHaras() {
    return useContext(HarasContext);
}