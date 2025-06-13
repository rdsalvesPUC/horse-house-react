import {Navigate, Outlet} from "react-router-dom";
import {useUser} from "../contexts/UserData.jsx";
export default function ProtectedRoutes({ children, cargos }) {
    const [userData, updateUser, logout] = useUser();
    if (!userData.cargo) {
        return <Navigate to="/login" replace />;
    }
    if (cargos && !cargos.includes(userData.cargo)) {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet/>
}