import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <SidebarContext.Provider value={[ isOpen, setIsOpen ]}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useOpenSidebar() {
    return useContext(SidebarContext);
}