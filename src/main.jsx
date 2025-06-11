import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './tailwind.css'
import App from './App.jsx'
import Home from "./pages/Home.jsx";
import {UserProvider} from "./contexts/UserData.jsx";
import {SidebarProvider} from "./contexts/ToggleSidebar.jsx";
import {HarasProvider} from "./contexts/ChooseHaras.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserProvider>
            <HarasProvider>
                <SidebarProvider>
                    <App/>
                </SidebarProvider>
            </HarasProvider>
        </UserProvider>
    </StrictMode>,
)
