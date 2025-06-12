import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import EditProfile from "../components/EditProfile.jsx";
import {useUser} from "../contexts/UserData.jsx";

export default function UserProfile() {
    const [userData, updateUser, logout] = useUser()
    const navigate = useNavigate();
    useEffect(() => {
        const TOKEN = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/loginExpirado`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro ao verificar token");
            }
        }).then((data) => {
            }
        ).catch((error) => {
            logout();
            navigate("/login")
            console.error("Erro:", error);
        })
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar userType={userData.cargo}/>
            <div id="content-wrapper" className="flex-1 flex flex-col min-h-0">
                <Topbar logout={logout} disableSearch={true} disableSelect={true} userData={userData} updateUser={updateUser}/>
                <main id="views" className="flex-1 overflow-auto bg-tertiary">
                    <EditProfile reloadUser={updateUser} userData={userData}/>
                </main>
            </div>
        </div>
    )
}
