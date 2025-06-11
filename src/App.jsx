import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import CadastroProprietario from './pages/CadastroProprietario.jsx';
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Haras from "./pages/Haras.jsx";
import Usuarios from "./pages/Usuarios.jsx";
import Cavalos from "./pages/Cavalos.jsx";
import {SidebarProvider} from "./contexts/ToggleSidebar.jsx";
import CadastroUsuario from "./pages/CadastroUsuario.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/registro" element={<CadastroProprietario/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard/*" element={<Dashboard/>}/>
                <Route path="/user-profile" element={<UserProfile/>}/>
                <Route path="/haras" element={<Haras/>}/>
                <Route path="/usuarios" element={<Usuarios/>}/>
                <Route path="/cavalos" element={<Cavalos/>}/>
                <Route path="/cadastrar-usuario" element={<CadastroUsuario/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </Router>
    );
}