import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ListUsuarios from "../components/ListUsuarios.jsx";
import {useUser} from "../contexts/UserData.jsx";

export default function Usuarios() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [harasList, setHarasList] = useState([])
    const [haras, setHaras] = useState("")
    const [userData, updateUser] = useUser();
    useEffect(() => {
        const TOKEN = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/requerProprietario`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
                if (data.login) {
                    localStorage.removeItem('token');
                    navigate("/login")
                } else if (data.error) {
                    navigate("/dashboard")
                    throw new Error("Erro ao verificar token");
                }
                updateHaras();
            }
        ).catch((error) => {
            console.error("Erro:", error);
        })
    }, []);

    async function updateHaras() {
        const TOKEN = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/getAllHaras`, {
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
        }).then(async (data) => {
                setHarasList(await data)
            }
        ).catch((error) => {
            navigate("/login")
            console.error("Erro:", error);
        })
    }

    return (
        <div className="flex h-screen">
            <Sidebar selected="usuarios" userType={userData.cargo}/>
            <div id="content-wrapper" className="flex-1 flex flex-col min-h-0">
                <Topbar search={search} onSearch={(value) => setSearch(value)} harasList={harasList} userData={userData}
                        choseHaras={(harasID) => setHaras(harasID)} haras = {haras} updateUser={updateUser}/>
                <main id="views" className="flex-1 overflow-auto bg-tertiary">
                    <ListUsuarios search={search} updateHaras={updateHaras} haras={haras}/>
                </main>
            </div>
        </div>
    )
}
