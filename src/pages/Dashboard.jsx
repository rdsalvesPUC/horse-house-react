import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "../contexts/UserData.jsx";

export default function Dashboard() {
    const navigate = useNavigate();
    const [harasList, setHarasList] = useState([])
    const [haras, setHaras] = useState()
    const [userData, updateUser] = useUser()
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
                if (userData.cargo === "Proprietário") {
                    updateHaras();
                }
            }
        ).catch((error) => {
            navigate("/login")
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
                setHarasList(data)
            }
        ).catch((error) => {
            //navigate("/login")
            console.error("Erro:", error);
        })
    }

    return (
        <div className="flex h-screen">
            <Sidebar userType = {userData.cargo} />
            <div id="content-wrapper" className="flex-1 flex flex-col min-h-0">
                <Topbar haras={haras} harasList={harasList} userData={userData} choseHaras={(harasID) => setHaras(harasID)} updateUser={updateUser}/>
                <main id="views" className="flex-1 overflow-auto bg-tertiary">

                </main>
            </div>
        </div>
    )
}
