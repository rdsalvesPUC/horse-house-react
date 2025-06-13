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
import CadastroHaras from "./pages/CadastroHaras.jsx";
import CadastroCavalos from "./pages/CadastroCavalos.jsx";
import Simulador from "./pages/Simulador.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/registro" element={<CadastroProprietario/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/dashboard/*" element={<Dashboard/>}/>
                    <Route path="/user-profile" element={<UserProfile/>}/>
                    <Route path="/cavalos" element={<Cavalos/>}/>
                    <Route path="/simulador" element={<Simulador/>}/>
                </Route>
                <Route element={<ProtectedRoutes cargos={["Proprietário"]} />}>
                    <Route path="/haras" element={<Haras/>}/>
                    <Route path="/cadastrar-haras" element={<CadastroHaras/>}/>
                </Route>
                <Route element={<ProtectedRoutes cargos={["Proprietário", "Gerente"]} />}>
                    <Route path="/usuarios" element={<Usuarios/>}/>
                    <Route path="/cadastrar-usuario" element={<CadastroUsuario/>}/>
                    <Route path="/cadastrar-cavalo" element={<CadastroCavalos/>}/>
                </Route>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </Router>
    );
}