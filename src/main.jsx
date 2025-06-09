import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './tailwind.css'
import App from './App.jsx'
import Home from "./pages/Home.jsx";
import {UserProvider} from "./contexts/UserData.jsx";
import {SidebarProvider} from "./contexts/ToggleSidebar.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserProvider>
            <SidebarProvider>
                <App/>
            </SidebarProvider>
        </UserProvider>
    </StrictMode>,
)
