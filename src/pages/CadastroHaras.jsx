import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "../contexts/UserData.jsx";
import CadastrarHaras from "../components/CadastrarHaras.jsx";

export default function CadastroHaras() {
    const [userData, updateUser, logout] = useUser();

    return (
        <div className="flex h-screen">
            <Sidebar selected="haras" userType={userData.cargo}/>
            <div id="content-wrapper" className="flex-1 flex flex-col min-h-0">
                <Topbar logout={logout} disableSearch={true} disableSelect={true} userData={userData} updateUser={updateUser}/>
                <main id="views" className="flex-1 overflow-auto bg-tertiary">
                    <CadastrarHaras/>
                </main>
            </div>
        </div>
    )
}
