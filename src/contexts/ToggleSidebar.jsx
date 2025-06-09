import {createContext, useCallback, useContext, useState} from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = useCallback(() => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    }, []);
    return (
        <SidebarContext.Provider value={[ isOpen, toggleSidebar ]}>
            {children}
        </SidebarContext.Provider>
    );
}

export function ToggleSidebar() {
    return useContext(SidebarContext);
}